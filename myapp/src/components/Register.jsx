import React from 'react';
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "../styles/Register.css"
import {useState} from "react";
function Register(){
  const [user,setuser]=useState({username:"",email:"",password:""});
  function handleChange(e){
    setuser({...user,[e.target.name]:e.target.value})
  }
  const navigate=useNavigate();
  async function handleSubmit(e){
    e.preventDefault();
    if(user.username===""|| user.email===""||user.password===""){
      return toast.error("everey field should be filled");
    }
    try {
      const response = await axios.post("http://127.0.0.1:8000/registration", user); // Use Axios to make the POST request

      if (response.data.error) {
        return toast.error(response.data.error);
      }

      navigate('/Verification');
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
    }
   }
  return(
    <div className='register-container'>
        <form  method="post" onSubmit={handleSubmit}>
           <label htmlFor='username'>Username:</label>
           <input type="text" placeholder='enter name' id='username' name='username' onChange={handleChange}></input>
           <label htmlFor="email">Email:</label>
           <input type='text' placeholder='enter email' id='email' name='email' onChange={handleChange}></input>
           <label htmlFor='password'>password:</label>
           <input type='password' placeholder='enter password' id="password" name='password' onChange={handleChange}></input>
           <button type='submit' >Register</button>
        </form>
    </div>
  );
}
export default Register;
