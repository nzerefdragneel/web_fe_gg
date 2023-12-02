import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "./services/auth.service";
import AuthVerify from "./common/authVerify";
import { Routes, BrowserRouter, Navigate, Route, Link } from "react-router-dom";

import {SidesMenu} from "./components/sidebar.component";
import LoginScreen from "./screen/loginScreen";
import Home from "./components/home.component";
import Lading from "./components/lading.component";
import Signup from "./components/signup.component";
import EditUser from "./components/edituser.component";
import Profile from "./components/profile.component";
import SimpleFooter from "./components/footer.component";
import ForgotPassword from "./components/forgotPassword.component";
import ResetPassword from "./components/resetPassword.component";
import Bus from "./common/bus";
class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    console.log("home",user)
    if (user!==null) {
      
      this.setState({
        currentUser: user,
      });
    }

    Bus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    Bus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser } = this.state;
    
    return (
      <div className="">
        <div className="pt-3 pb-4 px-32 flex flex-row flex-wrap justify-between border-b mb-2">
          <div className="flex flex-row flex-wrap text-lg items-center">
            <img
              src="./assets/logo.png"
              className="w-10 h-10 mr-2"
              alt="logo"
            />
            <a href="/" className="nav-link">
              <div className="px-6 py-2.5 mr-2 rounded-lg hover:bg-medium-green hover:cursor-pointer hover:ease-linear duration-300">
                Home
              </div>
            </a>
          </div>
          {currentUser ? (
            <div className="flex flex-row gap-2 text-lg">
              <a href="/profile" className="nav-link">
                <div className="px-6 py-2.5 rounded-lg hover:bg-medium-green hover:cursor-pointer hover:ease-linear duration-300">
                  Profile
                </div>
              </a>
              <a href="/login" className="nav-link" onClick={this.logOut}>
                <div className="px-6 py-2.5 rounded-lg hover:bg-medium-green hover:cursor-pointer hover:ease-linear duration-300">
                  LogOut
                </div>
              </a>
            </div>
          ) : (
            <div className="flex flex-row gap-2 text-lg">
              <Link to={"/signup"} className="nav-link">
                <div className="px-6 py-2.5 rounded-lg hover:bg-medium-green hover:cursor-pointer hover:ease-linear duration-300">
                  Sign up
                </div>
              </Link>
              <Link to={"/login"} className="nav-link">
                <div className="px-6 py-2.5 rounded-lg hover:bg-medium-green hover:cursor-pointer hover:ease-linear duration-300">
                  Log in
                </div>
              </Link>
            </div>
          )}
        </div>
        <div className="min-h-screen flex">

        <div className="flex-none w-64 h-14">
        {currentUser && <SidesMenu />}
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-4">
            <Routes>
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                exact
                path="/"
                element={
                  currentUser ? <Navigate replace to="/home" /> : <Lading />
                }
              />
              <Route path="/home" element={<Home />} />
              <Route
                path="/edituser"
                element={
                  currentUser ? <EditUser /> : <Navigate replace to="/" />
                }
              />
              <Route path="/profile" element={<Profile />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
            </Routes>
          </div>
        </div>
        </div>
        <div className="col-md-12 flex flex-col h-48 w-full">
          <SimpleFooter></SimpleFooter>
        </div>
        <AuthVerify logOut={this.logOut} />
      </div>
      
    );
  }
}

export default App;
