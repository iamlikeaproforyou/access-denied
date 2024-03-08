import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const redirectToGoogle = () => {
    window.location.href = '/auth/google'
  }
  const redirectToGithub = () => {
    window.location.href = '/auth/github'
  }
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      email,
      password
    }
    fetch('/api/login' , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    }).then(() => {
      window.location.href = '/'
    })
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
          <form className='form' onSubmit={handleSubmit}>
            <input type="text" placeholder='Enter email' name='username' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder='Enter password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login