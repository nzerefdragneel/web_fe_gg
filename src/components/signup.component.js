import React, { useRef, useState } from 'react'
import { withRouter } from '../common/with-router'

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";


const required = value => {
    if (!value) {
        return (
            <div className="text-error-color text-base" role="alert">
                This field is required!
            </div>
        );
    }
};

const vemail = value => {
    if (!isEmail(value)) {
        return (
            <div className="text-error-color text-base" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vusername = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="text-error-color text-base" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="text-error-color text-base" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};



function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
function Signup() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const fref = useRef(null)
    const [message, setMessage] = useState('')
    const [isSubmit, setIsSubmit] = useState(false)
    const [isSuccess, setSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleRegister = (e) => {
        e.preventDefault();

        fref.current.validateAll();

        AuthService.register(
            username,
            email,
            password,
        ).then(
            (response) => {
                setSuccess(true)
                setMessage(response.data.message)
                setIsSubmit(true)
                setIsLoading(false)
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage.toString())
                setIsSubmit(true)
                setSuccess(false)
                setIsLoading(false)
            }

        );
    }

    return (
        <div className="col-md-12">
            <div className="">
                <div className='grid grid-cols-1 md:grid-cols-2  justify-items-center content-around place-items-center px-4 -ml-4'>
                    <div className='flex flex-col flex-wrap'>
                        <div className='mr-4 ml-4'>
                            <div className='text-4xl text-dark-green font-bold mt-3'>
                                Classroom
                            </div>
                            <div className='text-xl mt-3'>
                                Where teaching and learning come together
                            </div>
                            <div className='text-base mt-3 text-neutral-600'>
                                Classroom helps educators create engaging learning experiences they can personalize, manage, and measure. Classroom is a Workspace for Education, which empowers your institution with simple, safer, collaborative tools.
                            </div>
                        </div>
                    </div>
                    <div className='bg-gray-50 m-3 p-5 shadow-lg'>
                        <div className='text-4xl font-bold text-center mb-3'>
                            Sign Up
                        </div>
                        <div className='text-base text-neutral-600 mb-6'>
                            Create an account to unlock exclusive features.
                        </div>
                        <Form
                            onSubmit={
                                handleRegister
                            }
                            ref={fref}
                        >
                            <div>
                                <div className="form-group">
                                    <label htmlFor="username" className='font-semibold mb-2'>Username</label>
                                    <Input
                                        type="text"
                                        className="form-control p-3 rounded required"
                                        name="username"
                                        placeholder='Enter your Username'
                                        onChange={(e) => {
                                            setUsername(e.target.value)
                                        }}
                                        validations={[required, vusername]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email" className='font-semibold mb-2 mt-2'>Email</label>
                                    <Input
                                        type="text"
                                        className="form-control p-3 rounded"
                                        name="email"
                                        placeholder='Enter your Email'
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                        }}
                                        validations={[required, vemail]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password" className='font-semibold mb-2 mt-2'>Password</label>
                                    <Input
                                        type="password"
                                        className="form-control p-3 rounded"
                                        name="password"
                                        placeholder='Enter your Password'
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                        }}
                                        validations={[required, vpassword]}
                                    />
                                </div>
                                <div className="form-group">
                                    <button className="w-full py-2.5 text-white bg-dark-green rounded-lg text-sm mt-3"
                                        onClick={() => {setIsLoading(true)}}
                                    >
                                        {
                                            isLoading && <span className="spinner-border spinner-border-sm mr-1"></span>
                                        }
                                        Sign Up                                        
                                    </button>
                                </div>
                            </div>
                        </Form>
                        {isSubmit && !isSuccess &&
                            <div className="text-error-color text-base">
                                {message}
                            </div>
                        }
                        {isSubmit && isSuccess &&
                            <div className="alert alert-success text-base">
                                {message}
                            </div>
                        }
                    </div>
                </div>

            </div></div>
    )
}

export default withRouter(Signup)