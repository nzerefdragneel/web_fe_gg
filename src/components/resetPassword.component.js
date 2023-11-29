import React, { useRef, useState } from "react";
import { withRouter } from "../common/with-router";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="text-error-color text-base" role="alert">
        This field is required!
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="text-error-color text-base" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const token = window.location.pathname.split("/")[2];
const email = localStorage.getItem("forgetEmail");

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const fref = useRef(null);
  const [message, setMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const handleForm = (e) => {
    e.preventDefault();

    fref.current.validateAll();

    if (password !== confirmPassword) {
      setMessage("Password doesn't match");
      setIsSubmit(true);
      return;
    }

    AuthService.resetPassword(email, token, password).then(
      (response) => {
        setSuccess(true);
        setMessage(response.data.message);
        setIsSubmit(true);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
        setIsSubmit(true);
      }
    );
  };

  return (
    <div className="col-md-12">
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2  justify-items-center content-around place-items-center ">
          <div className="flex flex-col flex-wrap">
            <div className="mr-4 ml-4">
              <div className="text-4xl text-dark-green font-bold mt-3">
                Classroom
              </div>
              <div className="text-xl mt-3">
                Where teaching and learning come together
              </div>
              <div className="text-base mt-3 text-neutral-600">
                Classroom helps educators create engaging learning experiences
                they can personalize, manage, and measure. Classroom is a
                Workspace for Education, which empowers your institution with
                simple, safer, collaborative tools.
              </div>
            </div>
          </div>
          <div className="bg-gray-50 m-3 p-5">
            <div className="text-4xl font-bold text-center mb-3">
              Reset Password
            </div>
            <Form onSubmit={handleForm} ref={fref}>
              <div>
                <div className="form-group">
                  <label htmlFor="password" className="font-semibold mb-2 mt-2">
                    New Password
                  </label>
                  <Input
                    type="password"
                    className="form-control p-3 rounded"
                    name="password"
                    placeholder="Enter your Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor="confirm-password"
                    className="font-semibold mb-2 mt-2"
                  >
                    Confirm your Password
                  </label>
                  <Input
                    type="password"
                    className="form-control p-3 rounded"
                    name="confirm-password"
                    placeholder="Confirm your Password"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
                  <button className="w-full py-2.5 text-white bg-dark-green rounded-lg text-sm mt-3">
                    Sign Up
                  </button>
                </div>
              </div>
            </Form>
            {isSubmit && !isSuccess && (
              <div className="text-error-color text-base">{message}</div>
            )}
            {isSubmit && isSuccess && (
              <div className="alert alert-success text-base">{message}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(ResetPassword);
