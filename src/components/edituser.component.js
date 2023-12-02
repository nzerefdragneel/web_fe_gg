
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import React, { Component } from "react";
import UserService from "../services/user.service";
import {Navigate, Link } from "react-router-dom";
import authService from '../services/auth.service';
export default class EditUser extends Component {
  constructor(props) {
    super(props);
    this.handleEdituser = this.handleEdituser.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    var user=authService.getCurrentUser();
    this.state = {
      userId:user.id,
      username: user.username,
      email:user.email,
      password: "",
      successful: false,
      message: ""
    };
  }
  
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  handleEdituser(e) {
    e.preventDefault();
    this.setState({
      message: "",
      successful: false
    });

    UserService.EditUser(
      this.state.userId,
      this.state.username,
      this.state.email,
      this.state.password
    ).then(
      response => {

        localStorage.removeItem("user");
        localStorage.setItem("user",  JSON.stringify(response.data));
        this.setState({
          message: response.data.message,
          successful: true,
        });
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          successful: false,
          message: resMessage
        });
      }
    );
  }
  
  render(){
    const user=authService.getCurrentUser();

    if (user==null){
      return(
          <Navigate replace to="/" />
      )
    }
  return (
    <div className=' px-5 py-2 my-5 mx-16'>
    <div className="flex flex-col  w-full">
            <div className='pt-3 pb-4 px-32 flex flex-row justify-between'>
                <div className='flex flex-row text-lg'>
                  <h2>Edit Profile</h2>
                </div>
            </div>
        </div>
    <form  onSubmit={this.handleEdituser}
            ref={c => {
              this.form = c;
            }}> 
      {!this.state.successful && (
        <>
      <div className="flex flex-col  w-full ">
        <div className="border-b border-gray-900/10">
          <h1 className="text-base font-semibold leading-7 text-gray-900">Edit your Profile</h1>
      

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 ">
           
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="username"
                  readOnly="true"
                  autoComplete="username"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                  placeholder="username"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  placeholder="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            
            <div className="col-span-full collapse">
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </button>
              </div>
            </div>

            <div className="col-span-full collapse">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
       

      <div className="mt-6 flex items-center justify-end gap-x-6">
      <Link to={"/"} className=" text-gray-900 hover:none">
        <button  className="rounded-md text-gray-900 bg-gray-100 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
         
            Cancel
         
        </button>
        </Link>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
      </>
       )}
        {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
    </form>
    </div>
  )
};
}
