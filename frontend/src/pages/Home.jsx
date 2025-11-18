import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div style={{ padding: 16 }}>
      <h1>Welcome to E-Learn</h1>
      <p><Link to="/courses">Browse courses</Link></p>
    </div>
  )
}
