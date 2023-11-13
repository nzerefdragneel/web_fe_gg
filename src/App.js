import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "./services/auth.service";
import { Routes, Route, Link } from "react-router-dom";

import Login from "./components/login.component";
import Home from "./components/home.component";
import Lading from "./components/lading.component"
class App extends Component {
    render() {
        return (
            <div className="container m-0 pt-3">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path='/lading' element={<Lading/>}/>
                </Routes>
            </div>
        )
    }

}

export default App;
