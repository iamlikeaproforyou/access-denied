import React from 'react'

const Login = () => {
  const redirectToGoogle = async () => {
    await fetch('/auth/google')
    window.location.href = '/'
  }
  const redirectToGithub = async () => {
    try {
      await fetch('/auth/github')
      window.location.href = '/'
    }
    catch(err) {
      console.log(err)
    }
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