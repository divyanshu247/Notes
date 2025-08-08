import React,{useState} from"react";
import axios from"axios";
import {useNavigate} from "react-router-dom";
import'./Register.css';
const Register=()=> {
    const navigate=useNavigate();
    const[formData,setFormData]=useState({
        name:"",
        email:"",
        password:"",
    });
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    };

const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
        const response = await axios.post("http://localhost:8000/api/auth/register",formData);
        localStorage.setItem("token",response.data.token);
        navigate("/");
    }
    catch(error){
        console.log("Registration failed:",error.response?.data?.message);
        
    }
};

return (
    <>
        <div className="background"></div>
        <div className="register-container">

      <form className="register-form" onSubmit={handleSubmit}>
       < h2>Register</h2>
        <input 
          type="text" 
          name="name" 
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required />
          <br/>
          <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required/>
          <br/>
          <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required/>
          <br/>
          <button type="submit">Register</button>
          </form>
          </div>
          </>
);
};
export default Register;