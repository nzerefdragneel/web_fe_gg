import React, { useEffect } from 'react'
import { withRouter } from '../common/with-router'

import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/solid'

function Lading() {

    function parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search)
        const accessToken = queryParameters.get("accessToken")

        if (accessToken != null) {
            const decodedJwt = parseJwt(accessToken);
            if (decodedJwt != null) {
                decodedJwt.user.exp = decodedJwt.exp;
                decodedJwt.user.iat = decodedJwt.iat;
                decodedJwt.user.accessToken = accessToken;
                localStorage.setItem("user", JSON.stringify(decodedJwt.user));
                window.location.replace(`${process.env.REACT_APP_URL}/home`); ///home
                // // window.location.reload();

            }

        }
    }, [])

    return (
        <div className="">
            <div className='flex flex-col items-start gap-2 px-2 py-2 my-5 mr-5 -ml-36'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-center '>
                    <div className='mr-4 ml-2'>
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
                <div className='flex flex-col gap-4 mt-20 items-start'>
                    <div className='text-3xl text-dark-green font-bold mb-5'>
                        How Classroom can make a difference for you
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-center'>
                        <div className='p-5 rounded-lg bg-slate-50 w-full'>
                            <div className='text-base text-neutral-600'>
                                Classroom can be learned in minutes and serves all types of learners and educators, regardless of their tech savviness. Empower educators, and encourage adoption and proficiency with new tools and techniques, with a broad range of resources.
                            </div>
                            <div className='text-base border-t'>
                                Personalize learning
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default withRouter(Lading)