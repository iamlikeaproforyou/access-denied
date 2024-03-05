import React from 'react'
const Login = () => {
  const redirectToGoogle = () => {
    window.location.href = '/auth/google'
  }
  const redirectToGithub = () => {
    window.location.href = '/auth/github'
  }
  return (
    <div className="login">
      <div className="login-container">
        <div className="methods">
          <button onClick={() => {redirectToGithub()}}>GITHUB</button>
          <button onClick={() => {redirectToGoogle()}}>GOOGLE</button>
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