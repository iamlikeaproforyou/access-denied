import React from 'react'

const Login = () => {
  const redirectToGoogle = () => {
    window.open("https://localhost:8000/auth/google" , "_self") 
  }
  const redirectToGithub = () => {
    window.open("https://localhost:8000/auth/github" , "_self")
  }
  return (
    <div className="login">
      <div className="login-container">
        <div className="methods">
          <button onClick={redirectToGithub}>GITHUB</button>
          <button onClick={redirectToGoogle}>GOOGLE</button>
          <button>FACEBOOK</button>
        </div>
        <div >
          <form action="" className='form'>
            <input type="text" placeholder='Enter email' name='username'/>
            <input type="text" placeholder='Enter password' name='password'/>
            <button>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login