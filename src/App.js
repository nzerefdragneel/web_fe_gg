import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "./services/auth.service";
import { Routes, Route, Link } from "react-router-dom";

import LoginScreen from "./screen/loginScreen";
import Home from "./components/home.component";
import Lading from "./components/lading.component";
class App extends Component {
  render() {
    return (
      <div className="max-w-6xl my-48 mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/lading" element={<Lading />} />
        </Routes>
      </div>
    );
  }
}

export default App;
