import React from 'react'
import { Link } from 'react-router-dom'
import useUserData from '../hooks/requestUserData';
const Navbar = () => {
  const profile = useUserData();
  const handleLogout = async () => {
    try {
      await fetch('/auth/logout')
      window.location.href = '/'
    }
    catch(err) {
      console.log(err);
    }
  }
  console.log(profile)
  return (
    <div className='navigation'>
        <h1><Link to="/" className='logo-text'>Access-Denied</Link></h1>
        <ul className='list'>
            {profile.id? <li><img src={profile.photo} alt="" className='profile-photo'/></li>: <li></li>}
            <li><Link to="/" className='list-item'>Blog</Link></li>
            {profile.id ? 
              <li><Link className='list-item login-btn' onClick={() => {handleLogout()}}>Logout</Link></li>
              :
              <li><Link to="/auth" className='list-item login-btn'>Login</Link></li>
            }
            
        </ul>
    </div>
  )
}

export default Navbar