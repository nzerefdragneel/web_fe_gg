import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "./services/auth.service";
import { Routes, Route, Link } from "react-router-dom";

import Login from "./components/login.component";
import Home from "./components/home.component";
import Lading from "./components/lading.component"
import Signup from './components/signup.component'
class App extends Component {
    render() {
        return (
            <div className="w-full m-0 pt-3">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path='/lading' element={<Lading/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                </Routes>
            </div>
        )
    }

}

export default App;
