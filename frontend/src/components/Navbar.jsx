import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <navbar className='navigation'>
        <h1><Link to="/" className='logo-text'>Access-Denied</Link></h1>
        <ul className='list'>
            <li><Link to="/" className='list-item'>Blog</Link></li>
            <li><Link to="/auth" className='list-item login-btn'>Login</Link></li>
        </ul>
    </navbar>
  )
}

export default Navbar