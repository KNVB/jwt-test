import Express from 'express';
import http from 'http';
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from 'url';

const accessTokenSecret = '這三件事';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let isValidUser = async (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                reject(err)
            }
            resolve(user)
        });
    });
}
//==============================================================================================
let app = new Express();
app.use(Express.json());
app.all("/*", async (req, res, next) => {
    if (req.path.startsWith("/api") && (req.path !== "/api/login")) {
        let authHeader = req.headers['authorization'];
        if (authHeader) {
            let token = req.headers['authorization'].split(' ')[1];
            try {
                let user = await isValidUser(token);
                req.user = user;
                req.accessToken = jwt.sign({ username: user.username }, accessTokenSecret, { expiresIn: '1h' });
            } catch (err) {
                return res.sendStatus(403);
            }
        } else {
            return res.sendStatus(403);
        }
    }
    next();
});
app.get('/api/greeting', (req, res) => {
    let user = req.user;
    res.send(
        JSON.stringify(
            { 
                greeting: `Hello ${user.username}!`,
                accessToken: req.accessToken
            }
        )
    );
});
app.post('/api/login', (req, res) => {
    // Read username and password from request body
    const { loginName, adminPwd } = req.body;
    if ((loginName === 'admin') && (adminPwd === 'password')) {
        console.log("Admin. login success.");
        const accessToken = jwt.sign({ username: loginName }, accessTokenSecret, { expiresIn: '1h' });
        res.json({
            accessToken
        });
    } else {
        res.status(401).send();
    }
});
app.use(Express.static(path.resolve(__dirname, '../build')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});
let httpServer = http.createServer(app);
httpServer.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
);
