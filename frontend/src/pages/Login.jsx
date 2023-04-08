import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../context/Auth/AuthContext'
import "./Login.css"

const Login = () => {
	const { user, loginUser } = useContext(AuthContext)

	return (
		<>
			{user ?
				<Navigate to="/landing-page" />
				:
				<div className="ml-96" id="loginform">
					<form onSubmit={loginUser}>
						<br />
						Enter Username: <input type="text" name="username" className='border' autoComplete="on" />
						<br />
						Password: <input type="password" name="password" id="input"  className='border  mr-3 mt-8 mb-8' autoComplete="on" />
						<br />
						<input type="submit" className='border-2  border-black p-2 bg-green-700 text-white hover:bg-green-dark cursor-pointer ' />
					</form>
				</div>
			}
		</>
	)
}

export default Login
