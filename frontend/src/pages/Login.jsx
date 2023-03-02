import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../context/Auth/AuthContext'

const Login = () => {
	const { user, loginUser } = useContext(AuthContext)

	return (
		<>
			{user ?
				<Navigate to="/" />
				:
				<div>
					<form onSubmit={loginUser}>
						Enter Username: <input type="text" name="username" className='border' autoComplete="on" />
						Password: <input type="password" name="password" className='border mr-3' autoComplete="on" />
						<input type="submit" className='border-2 border-black p bg-green-700 text-white hover:bg-green-dark cursor-pointer ' />
					</form>
				</div>
			}
		</>
	)
}

export default Login
