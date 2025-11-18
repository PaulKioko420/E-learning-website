import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const nav = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      nav('/');
    } catch (err) {
      alert(err?.response?.data?.message || 'Register failed');
    }
  };
  return (
    <div style={{ padding: 16 }}>
      <h2>Register</h2>
      <form onSubmit={submit}>
        <div><input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} /></div>
        <div><input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /></div>
        <div><input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
