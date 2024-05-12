import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "../styles/Verification.css";

export default function Verification() {
  const navigate = useNavigate();
  const [userotp, setUserotp] = useState(""); 

  async function handleVerification(e) {
    e.preventDefault();
    if (userotp === "") {
      return toast.error("Please enter the OTP...");
    }
    try {
      const response = await axios.post("http://127.0.0.1:8000/Verification", { otp: userotp }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.error) {
        return toast.error(response.data.error);
      }

      navigate('/Homepage');
    } catch (error) {
      console.error("Error during OTP verification:", error);
      toast.error("An error occurred during OTP verification. Please try again later.");
    }
  }

  return (
    <div className='Verification-container'>
      <h2>OTP verification</h2>
      <form onSubmit={handleVerification}>
        <input
          type='text'
          name="otp"
          value={userotp}
          onChange={(e) => setUserotp(e.target.value)} 
          placeholder='Enter OTP...'
        />
        <button type='submit'>Verify</button>
      </form>
    </div>
  );
}
