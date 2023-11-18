import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "./services/auth.service";
import { Routes, Route, Link } from "react-router-dom";

import LoginScreen from "./screen/loginScreen";
import Home from "./components/home.component";
import Lading from "./components/lading.component";
import Signup from './components/signup.component'
import EditUser from "./components/edituser.component";
import Profile from "./components/profile.component";
class App extends Component {
  render() {
    return (
      <div className="w-full mt-3 bg-slate-50">
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<LoginScreen/>} />
      <Route path="/edituser" element={<EditUser/>} />
      <Route path="/lading" element={<Lading/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </div>
    )
  }
  
}

export default App;
