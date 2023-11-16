import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "./services/auth.service";
import { Routes, Route, Link } from "react-router-dom";

import Login from "./components/login.component";
import Home from "./components/home.component";
import EditUser from "./components/edituser.component";
import Profile from "./components/profile.component";
class App extends Component {
  render() {
    return (
      <div className="container mt-3 bg-slate-50">
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/edituser" element={<EditUser/>} />
      <Route path="/lading" element={<Login/>} />
      <Route path="/profile" element={<Profile/>} />
      </Routes>
    </div>
    )
  }
  
}

export default App;
