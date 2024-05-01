import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../context/Auth/AuthContext'
import "./Login.css"

const Login = () => {
	const { user, loginUser } = useContext(AuthContext)

	return (
		<div>
			{user ?
				<Navigate to="/landing-page" />
				:
				<div className="ml-96 " id="loginform">
					<form onSubmit={loginUser}>
						{/* <br />
						Enter Username: <input type="text" name="username" className='border' autoComplete="on" />
						<br />
						Password: <input type="password" name="password" id="input"  className='border  mr-3 mt-8 mb-8' autoComplete="on" />
						<br />
						<input type="submit" className='border-2  border-black p-2 bg-green-700 text-white hover:bg-green-dark cursor-pointer ' /> */}


						
						<div className="bg-grey-lighter mt-12 pr-96" id='login1' >
                            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 rounded " > 
                                <div className="bg-black px-6 py-8 rounded shadow-md text-black w-full" >
                                    <h1 className="text-white mb-8 text-3xl text-center">Login</h1>
                                    <input
                                        type="text"
                                        className="block border border-grey-light w-full p-3 rounded mb-4"
                                        name="username"
                                        autoComplete="on"
                                        placeholder="User Name" />

                                    

                                    <input
                                        type="password"
                                        className="block border border-grey-light w-full p-3 mr-3 mt-8 mb-8  rounded mb-4"
                                        name="password"
										id="input"
                                        autoComplete="on"
                                        placeholder="Password" />
                                    
									<input type="submit" className='border-2 w-full  text-center py-3 rounded bg-green-700 text-white   border-black p-2 bg-green-700 text-white hover:bg-green-dark cursor-pointer ' />


									
                                       
                                    
                                </div>

                               
                            </div>
                        </div>






























					</form>
				</div>
			}
		</div>
	)
}

export default Login
