import React from 'react'
import "../styles/Register.css"
import { useNavigate } from 'react-router-dom'

export default function Homepage() {
  const navigate=useNavigate();
const logout = () => {
  navigate('/'); 
};
  return (
    <div className='register-container'>
      <h1>Welcome to Home page</h1>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
