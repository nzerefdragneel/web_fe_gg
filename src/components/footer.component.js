import React, { Component } from "react";
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/solid'
export default class SimpleFooter extends Component {
    render(){

    return (

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
)}}