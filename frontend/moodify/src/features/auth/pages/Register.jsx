import React from "react";
import "../pages/Register.scss"
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

     const navigate = useNavigate();
     const {loading , handleRegister} = useAuth()

   async function handleSubmit(e){
    e.preventDefault()
    await handleRegister({email,password,username})
    navigate("/")

 }
  return (
    <main className="registerpage">
      <div className="register-container">
        <h1>Create Account</h1>
        <p>Register to continue</p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullname">Full Name</label>
            <input
              type="text"
              id="fullname"
              placeholder="Enter your full name"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Create a password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Create Account</button>
        </form>
      </div>
    </main>
  );
};

export default Register;

