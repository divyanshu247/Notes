import React ,{useState}from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import"./Login.css";
const Login=()=>{
const navigate=useNavigate();
const [formData,setFormData]=useState({
    email:"",
    password:""
});
 const handleChange=(e)=>{
 setFormData({...formData,[e.target.name]:e.target.value});
 };
 const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
        const response=await axios.post("http://localhost:8000/api/auth/login",formData);
        localStorage.setItem('user',JSON.stringify(response.data.user));
        localStorage.setItem('token',response.data.token);
        navigate("/");
    }
    catch(error){
        console.log("Login failed:",error.response?.data?.message||error.message);
        
    }
 };
 return(
     <div className="login-page">
      <div className="rotating-icon">
        {/* SVG gear icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#ffffff22"
          viewBox="0 0 24 24"
          width="200"
          height="200"
        >
          <path d="M12 15.5A3.5 3.5 0 1 1 15.5 12 3.5 3.5 0 0 1 12 15.5zm9.94-3.88l-1.51-1.3a7.9 7.9 0 0 0 .1-1.44 7.9 7.9 0 0 0-.1-1.44l1.5-1.3a.5.5 0 0 0 .1-.64l-2-3.46a.5.5 0 0 0-.6-.22l-1.78.72a7.8 7.8 0 0 0-2.5-1.44L14.3 1.6a.5.5 0 0 0-.5-.4h-4a.5.5 0 0 0-.5.4l-.3 1.88a7.8 7.8 0 0 0-2.5 1.44L4.7 2.64a.5.5 0 0 0-.6.22l-2 3.46a.5.5 0 0 0 .1.64l1.5 1.3a7.9 7.9 0 0 0 0 2.88l-1.5 1.3a.5.5 0 0 0-.1.64l2 3.46a.5.5 0 0 0 .6.22l1.78-.72a7.8 7.8 0 0 0 2.5 1.44l.3 1.88a.5.5 0 0 0 .5.4h4a.5.5 0 0 0 .5-.4l.3-1.88a7.8 7.8 0 0 0 2.5-1.44l1.78.72a.5.5 0 0 0 .6-.22l2-3.46a.5.5 0 0 0-.1-.64z" />
        </svg>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>

<h2> Login</h2>
   
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />

<input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />

        <button type="submit">Login</button>
      </form>
    
    </div>
 );
};
export default Login;