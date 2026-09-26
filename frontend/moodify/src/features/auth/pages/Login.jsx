import React from 'react'
import { useState } from 'react'
import "../pages/login.scss"
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const Login = () => {

    const {loading,handleLogin}= useAuth()
    const navigate = useNavigate()


 const [email, setEmail] = useState("")
 const [password, setPassword] = useState("")


 async function handleSubmit(e){
    e.preventDefault()
    await handleLogin({email,password})
    navigate("/")

 }

  return (
    <main className="loginpage">
        <div className="formcontainer">
            <h1>Login</h1>
            <form className='form' onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} id="email" name="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password"  value={password} onChange={(e)=>setPassword(e.target.value)} id="password" name="password" required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    </main>
  )
}

export default Login