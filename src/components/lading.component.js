import React from 'react'
import { withRouter } from '../common/with-router'

import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/solid'

function Lading() {
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
            <div className='flex flex-col items-start gap-2 px-5 py-2 my-5 mx-16'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-center '>
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
                    <div className='justify-self-center'>
                        <img src='./assets/online-class.jpg' className='h-96 rounded-2xl' alt='online-class' />
                    </div>
                </div>
                <div className='flex flex-col gap-4 mt-24 items-start'>
                    <div className='text-3xl text-dark-green font-bold'>
                        Designed in collaboration with educators
                    </div>
                    <div className='text-base text-neutral-600'>
                        Classroom is designed with feedback from the educational community, always building new features and functionality that lets educators focus on teaching and students focus on learning.
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full place-items-center mt-3'>
                        <div className='p-5 rounded-lg bg-slate-50 w-80'>
                            <div className='text-right text-5xl text-medium-green font-bold my-2'>
                                01
                            </div>
                            <div className='text-base font-bold'>
                                Personalize learning
                            </div>
                        </div>
                        <div className='p-5 rounded-lg bg-slate-50 w-80'>
                            <div className='text-right text-5xl text-medium-green font-bold my-2'>
                                02
                            </div>
                            <div className='text-base font-bold'>
                                Simplify everyday tasks
                            </div>
                        </div>
                        <div className='p-5 rounded-lg bg-slate-50 w-80'>
                            <div className='text-right text-5xl text-medium-green font-bold my-2'>
                                03
                            </div>
                            <div className='text-base font-bold'>
                                Gain insights and visibility
                            </div>
                        </div>
                    </div>
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

export default withRouter(Lading)