import React from 'react'
import { Link } from 'react-router-dom'
import './profile.css'
const Navbar = () => {
  return (
    <div className="navbar">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/get">Get users</Link></li>
                    <li><Link to="/add">Add Users</Link></li>
                </ul>
              
            </div>

  )
}

export default Navbar