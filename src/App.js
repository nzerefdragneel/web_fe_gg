import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "./services/auth.service";
import { Routes,BrowserRouter,Navigate , Route, Link } from "react-router-dom";

import LoginScreen from "./screen/loginScreen";
import Home from "./components/home.component";
import Lading from "./components/lading.component";
import Signup from './components/signup.component'
import EditUser from "./components/edituser.component";
import Profile from "./components/profile.component";
import {SimpleFooter} from "./components/footer.component";
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

    if (user) {
      this.setState({
        currentUser: user
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
      <div className="w-full mt-3 bg-slate-50">
         <div className='pt-3 pb-4 px-32 flex flex-row flex-wrap justify-between border-b mb-2'>
                <div className='flex flex-row flex-wrap text-lg items-center'>
                    <img src='./assets/logo.png' className='w-10 h-10 mr-2' alt='logo' />
                    <div className='px-6 py-2.5 mr-2 rounded-lg hover:bg-medium-green hover:cursor-pointer hover:ease-linear duration-300'>
                        Home
                    </div>
                    <div className='px-6 py-2.5 mr-2 rounded-lg hover:bg-medium-green hover:cursor-pointer hover:ease-linear duration-300'>
                        About Us
                    </div>
                    <div className='px-6 py-2.5 mr-2 rounded-lg hover:bg-medium-green hover:cursor-pointer hover:ease-linear duration-300'>
                        Contact
                    </div>
                </div>
                {currentUser ? (
                <div className='flex flex-row gap-2 text-lg'>
                    <Link to={"/Profile"}>
                    <div className='px-6 py-2.5 rounded-lg hover:bg-medium-green hover:cursor-pointer hover:ease-linear duration-300'>
                        Profile
                    </div>
                    </Link>
                </div>
                ):(
                  <div className='flex flex-row gap-2 text-lg'>
                    <Link to={"/signup"}>
                    <div className='px-6 py-2.5 rounded-lg hover:bg-medium-green hover:cursor-pointer hover:ease-linear duration-300'>
                        Sign up
                    </div>
                    </Link>
                    <Link to={"/login"}>
                    <div className='px-6 py-2.5 rounded-lg hover:bg-medium-green hover:cursor-pointer hover:ease-linear duration-300'>
                        Log in
                    </div>
                    </Link>
                </div>
                )}
            </div>
            
            <div className="container mt-3">
            <Routes>
                <Route exact path="/" element={currentUser?<Navigate replace to="/home" />:<Lading/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/login" element={<LoginScreen/>} />
                <Route path="/edituser" element={<EditUser/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/signup" element={<Signup/>}/>
             
            </Routes>
          </div>
          <SimpleFooter></SimpleFooter>
    </div>
    )
  }
  
}

export default App;
