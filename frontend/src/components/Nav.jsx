import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Nav(){
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const handleLogout = () => { logout(); nav('/'); };
  return (
    <nav style={{ padding: 12, borderBottom: '1px solid #ddd' }}>
      <Link to="/">Home</Link> | <Link to="/courses">Courses</Link>
      <span style={{ float: 'right' }}>
        {user ? (
          <>
            <Link to="/profile">{user.name}</Link> | <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
          </>
        )}
      </span>
    </nav>
  )
}
