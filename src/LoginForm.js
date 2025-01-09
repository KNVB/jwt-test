import React from 'react';
import FetchAPI from './FetchAPI';
import { useNavigate } from 'react-router-dom';
function LoginForm() {
	let navigate = useNavigate();
	let login = async (e) => {
		let theForm = e.target;
		e.preventDefault();

		if (theForm.reportValidity()) {
			let data = {};
			data.loginName = theForm.loginName.value;
			data.adminPwd = theForm.adminPwd.value;
			let fetchAPI = new FetchAPI();
			try {
				let loginResult = await fetchAPI.login(data);
				sessionStorage.setItem("accessToken", loginResult.accessToken);
				navigate("/admin");
			}
			catch (error) {
				console.log(error)
				switch (error.status) {
					case 401:
						alert("Invalid user name or password");
						break;
					default:
						alert("Something wrong when login the system,error code=" + error.message);
						break;
				}
			}
		}

	}
	return (
		<div className="d-flex align-items-center justify-content-center w-100">
			<form onSubmit={login}>
				<table border="0">
					<thead>
						<tr>
							<td colSpan="2" className="text-center">Login page</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Login Name:</td>
							<td><input type="text" name="loginName" required /></td>
						</tr>
						<tr>
							<td>Password:</td>
							<td><input type="password" name="adminPwd" required /></td>
						</tr>
					</tbody>
					<tfoot>
						<tr>
							<td colSpan="2" className="text-center">
								<input type="submit" value="login" />
							</td>
						</tr>
					</tfoot>
				</table>
			</form>
		</div>
	)
}
export default LoginForm;