import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "./services/auth.service";
import userService from "./services/user.service";
import AuthVerify from "./common/authVerify";
import { Routes, BrowserRouter, Navigate, Route, Link } from "react-router-dom";

import { SidesMenu } from "./components/sidebar.component";
import LoginScreen from "./screen/loginScreen";
import Home from "./components/home.component";
import Lading from "./components/lading.component";
import Signup from "./components/signup.component";
import EditUser from "./components/edituser.component";
import Profile from "./components/profile.component";
import SimpleFooter from "./components/footer.component";
import ForgotPassword from "./components/forgotPassword.component";
import StudentJoinInClass from "./components/studentjoininclass.component";
import ResetPassword from "./components/resetPassword.component";
import Invitation from "./components/invitation.component";
import Bus from "./common/bus";
import { ClassDetail } from "./components/class/classdetail.component";
import CreateClass, {
  ClassCreate,
} from "./components/class/createClass.component";
import { SidesMenuAdmin } from "./components/adminside/sidemenuadmin.component";
import AdminHome from "./components/adminside/adminhome.component";
import ClassManager from "./components/adminside/classmanager.component";
import ManagerUser from "./components/adminside/manageruser.component";
import EditUserManager from "./components/adminside/edituser.component";
import CreateGrade from "./components/class/createGrade.component";
import { DetailAssignment } from "./components/class/detailAssignments.component";
import UpdateGrade from "./components/class/updateGrade.component";
import {ClassDetailManager} from "./components/adminside/classdetail.component";
class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
      roles: "",
      status: true,
    };
  }

  async componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user !== null) {
      userService
        .getRoles(user.id)
        .then((response) => {
          console.log(response.data);
          this.setState({
            currentUser: user,
            roles: response.data.roles,
          });
        })
        .catch((error) => {
          console.log(error);
        });

      userService
        .GetStatus(user.id)
        .then((response) => {
          console.log(response.data);
          this.setState({
            status: response.data.status,
          });
        })
        .catch((error) => {
          console.log(error);
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
      roles: "",
    });
  }

  render() {
    const currentUser = this.state.currentUser;
    const roles = this.state.roles;
    const status = this.state.status;

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
        {status===false&&<div className="flex flex-row justify-center text-lg text-red-500">Your account is blocked</div>}
        {status===true&&<div>
        <div className="min-h-screen flex">
          <div className="flex-none w-64">
            {roles!=='admin' && currentUser && <SidesMenu />}
            {roles==='admin' && currentUser && <SidesMenuAdmin /> }
          </div>
          <div className="flex-1 flex flex-col">
            <div className="flex-1 p-4">
              {/* admin routes */}
              {roles==='admin'&& currentUser&&
              <Routes>
                {/* <Route path="/home" element={<AdminHome />} /> */}
                <Route path="/classmanager" element={<ClassManager />} />
                <Route
                  path="/edituser"
                  element={
                    currentUser ? <EditUser /> : <Navigate replace to="/" />
                  }
                />
                <Route path="/manageuser" element={<ManagerUser />} />
                <Route path="/user/detail" element={<EditUserManager/>}/>
                <Route path="/profile" element={<Profile />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/classes/detail" element={<ClassDetailManager />} />

                {/* <Route path="/class/create-class" element={<CreateClass />} />
                <Route path="/invitation" element={<Invitation />} />
                <Route path="/updateStudentId" element={<StudentJoinInClass />} /> */}
                    </Routes>
                  )}
                  {roles !== "admin" && currentUser && (
                    <Routes>
                      <Route
                        exact
                        path="/"
                        element={
                          currentUser ? (
                            <Navigate replace to="/home" />
                          ) : (
                            <Lading />
                          )
                        }
                      />
                      <Route path="/home" element={<Home />} />
                      <Route
                        path="/edituser"
                        element={
                          currentUser ? (
                            <EditUser />
                          ) : (
                            <Navigate replace to="/" />
                          )
                        }
                      />
                      <Route path="/profile" element={<Profile />} />
                      <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                      />
                      <Route
                        path="/reset-password"
                        element={<ResetPassword />}
                      />
                      <Route path="/class/detail" element={<ClassDetail />} />
                      <Route
                        path="/class/create-class"
                        element={<CreateClass />}
                      />
                      <Route path="/invitation" element={<Invitation />} />
                      <Route
                        path="/updateStudentId"
                        element={<StudentJoinInClass />}
                      />
                      <Route
                        path="/class/assignments"
                        element={<DetailAssignment />}
                      />
                      <Route
                        path="/class/grade/update"
                        element={<UpdateGrade />}
                      />
                      <Route
                        path="/class/grade/create"
                        element={<CreateGrade />}
                      />
                    </Routes>
                  )}

                  {/* student routes */}
                  <Routes>
                    <Route path="/login" element={<LoginScreen />} />
                    <Route path="/signup" element={<Signup />} />
                  </Routes>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="col-md-12 flex flex-col h-48 w-full">
          <SimpleFooter></SimpleFooter>
        </div>
        <AuthVerify logOut={this.logOut} />
      </div>
    );
  }
}

export default App;
