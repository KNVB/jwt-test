import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FetchAPI from './FetchAPI';

export default function AdminPlatForm() {
    let navigate = useNavigate();
    let [greeting, setGreeting] = useState();
    const decode = token => decodeURIComponent(atob(token.split('.')[1].replace('-', '+').replace('_', '/')).split('').map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join(''));
    let getName = async () => {
        let fetchAPI = new FetchAPI();
        let data = await fetchAPI.greeting(sessionStorage.getItem("accessToken"));
        console.log(decode(data.accessToken));
        setGreeting(data.greeting);
    }
    useEffect(() => {
        getName();
    }, [])
    function logout() {
        sessionStorage.clear();
        navigate("/");
    }
    return (
        <div>
            <div> This is Admin Platform</div>
            {(greeting)
                ? <div>{greeting}</div>
                : ""
            }
            <button onClick={logout}>Logout</button>
        </div>
    )
}