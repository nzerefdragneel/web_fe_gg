import React, { useRef, useState } from 'react'
import { withRouter } from '../common/with-router'
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/solid'
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


function Signup() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const fref = useRef(null)
    const [message, setMessage] = useState('')
    const [isSubmit, setIsSubmit] = useState(false)

    const handleRegister = (e) => {

        e.preventDefault();

        fref.current.validateAll();

        AuthService.register(
            username,
            email,
            password,
        ).then(
            response => {
                setMessage(response.data.message)
                setIsSubmit(true)
            },
            error => {
                setMessage(error.data.message)
                setIsSubmit(true)
            }

        );
    }

    return (
        <div className="flex flex-col h-48 w-full">
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
                <div className='flex flex-row gap-2 text-lg'>
                    <div className='px-6 py-2.5 rounded-lg hover:bg-medium-green hover:cursor-pointer hover:ease-linear duration-300'>
                        Sign up
                    </div>
                    <div className='px-6 py-2.5 rounded-lg hover:bg-medium-green hover:cursor-pointer hover:ease-linear duration-300'>
                        Log in
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center content-around place-items-center px-5 py-2 my-5 mx-16'>
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
                <div className='bg-gray-50 m-3 p-5'>
                    <div className='text-4xl font-bold text-center mb-3'>
                        Sign Up
                    </div>
                    <div className='text-base text-neutral-600 mb-6'>
                        Create an account to unlock exclusive features.
                    </div>
                    <Form
                        onSubmit={handleRegister}
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
                                <button className="w-full py-2.5 text-white bg-dark-green rounded-lg text-sm mt-3">Sign Up</button>
                            </div>
                        </div>
                    </Form>
                    {isSubmit &&
                        <div className="text-error-color text-base">
                            {message}
                        </div>
                    }
                </div>
            </div>
            <div className='border-t mt-2 bottom-0 px-40 pb-8 pt-20 flex flex-row flex-wrap gap-2 justify-between'>
                <div className='flex flex-col mt-2 mr-5'>
                    <img src='./assets/logo.png' className='w-14 h-14 mb-4' alt='logo' />
                    <div className='mt-2 flex flex-row items-center'>
                        <EnvelopeIcon className='h-6 w-6 mr-2' />
                        <div className='text-base'>admin@class.com</div>
                    </div>
                    <div className='mt-2 flex flex-row items-center'>
                        <PhoneIcon className='h-6 w-6 mr-2' />
                        <div className='text-base'>+84 123 456 789</div>
                    </div>
                    <div className='mt-2 flex flex-row items-center'>
                        <MapPinIcon className='h-6 w-6 mr-2' />
                        <div className='text-base'>Ho Chi Minh City, Viet Nam</div>
                    </div>
                </div>
                <div className='mr-2 mt-2 flex flex-row flex-wrap gap-3'>
                    <div className='flex flex-col items-start mr-5 gap-2'>
                        <div className='text-lg'>
                            Home
                        </div>
                        <div className='text-base text-neutral-600'>
                            Overview
                        </div>
                        <div className='text-base text-neutral-600'>
                            Product guides
                        </div>
                        <div className='text-base text-neutral-600'>
                            Communities
                        </div>
                        <div className='text-base text-neutral-600'>
                            FAQ
                        </div>
                    </div>
                    <div className='flex flex-col items-start mr-5 gap-2'>
                        <div className='text-lg'>
                            About Us
                        </div>
                        <div className='text-base text-neutral-600'>
                            Company
                        </div>
                        <div className='text-base text-neutral-600'>
                            Achievements
                        </div>
                        <div className='text-base text-neutral-600'>
                            Our Goals
                        </div>
                    </div>
                    <div className='flex flex-col items-start mr-5 gap-2'>
                        <div className='text-lg'>
                            Follow Us
                        </div>
                        <div className='flex flex-row items-center gap-2 mt-2'>
                            <div className='rounded bg-neutral-200 flex justify-center items-center p-2'>
                                <img src='./assets/facebook.svg' className='w-3 h-3' alt='Facebook' />
                            </div>
                            <div className='rounded bg-neutral-200 flex justify-center items-center p-2'>
                                <img src='./assets/instagram.svg' className='w-3 h-3' alt='Facebook' />
                            </div>
                            <div className='rounded bg-neutral-200 flex justify-center items-center p-2'>
                                <img src='./assets/twitter.svg' className='w-3 h-3' alt='Facebook' />
                            </div>
                            <div className='rounded bg-neutral-200 flex justify-center items-center p-2'>
                                <img src='./assets/linkedin-in.svg' className='w-3 h-3' alt='Facebook' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Signup)