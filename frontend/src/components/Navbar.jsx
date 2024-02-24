import React from 'react'
import { Link } from 'react-router-dom'
import useUserData from '../hooks/requestUserData';
import handleLogout from '../hooks/requestData'
const Navbar = () => {
  const profile = useUserData();
  const handleLogout = () => {
    window.location.href = 'https://localhost:8000/auth/logout' 
  }
  return (
    <div className='navigation'>
        <h1><Link to="/" className='logo-text'>Access-Denied</Link></h1>
        <ul className='list'>
            <li><Link to="/" className='list-item'>Blog</Link></li>
            {profile.id ? 
              <li><button className='list-item login-btn' onClick={handleLogout}>Logout</button></li>
              :
              <li><Link to="/auth" className='list-item login-btn'>Login</Link></li>
            }
            
        </ul>
    </div>
  )
}

export default Navbar