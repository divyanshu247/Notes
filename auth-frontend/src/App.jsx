import React from "react";
import { Routes,Route } from "react-router-dom";
import Register from "./components/Register";
import Login from"./components/Login";
import Home from"./components/Home";
import Notes from"./components/Notes";
import Pyq from"./components/Pyq";
import Upload from"./components/Upload";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
const App=()=>{
  return(
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/upload" element={<ProtectedRoute><Upload/></ProtectedRoute>}/>
      <Route path="/notes" element={<Notes/>} />
      <Route path="/pyq" element={<Pyq/>}/>
    </Routes>
    <Footer/>
    </>
  );
};
export default App;