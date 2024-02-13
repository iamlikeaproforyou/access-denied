import React from 'react'

const Navbar = () => {
  return (
    <navbar className='navigation'>
        <h1 className='logo-text'>Access-Denied</h1>
        <ul className='list'>
            <li className='list-item'>Home</li>
            <li className='list-item'>Blog</li>
            <li className='list-item login'>Login</li>
        </ul>
    </navbar>
  )
}

export default Navbar