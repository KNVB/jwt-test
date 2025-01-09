import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPlatForm from './AdminPlatForm';
import AdminGateKeeper from './AdminGateKeeper';
import './App.css';
import LoginForm from './LoginForm';

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/admin" element={<AdminGateKeeper />}>
					<Route index element={<AdminPlatForm />}/>
				</Route>
				<Route path='/' element={<LoginForm />} />
			</Routes>
		</Router>
	)
}
