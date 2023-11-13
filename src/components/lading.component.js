import React from 'react'
import { withRouter } from '../common/with-router'

function Lading() {
    return (
        <div className="flex flex-col h-48 w-full">
            <div className='pt-3 pb-4 px-32 flex flex-row justify-between border-b mb-2'>
                <div className='flex flex-row text-lg'>
                    <img src='../../public/logo.png' className='w-8 h-8' alt='logo'/>
                    <div className='px-6 py-2.5 rounded-lg hover:bg-medium-green'>
                        Home
                    </div>
                    <div className='px-6 py-2.5 rounded-lg hover:bg-medium-green'>
                        About Us
                    </div>
                    <div className='px-6 py-2.5 rounded-lg hover:bg-medium-green'>
                        Contact
                    </div>
                </div>
                <div className='flex flex-row gap-2 text-lg'>
                    <div className='px-6 py-2.5 rounded-lg hover:bg-medium-green'>
                        Sign up
                    </div>
                    <div className='px-6 py-2.5 rounded-lg hover:bg-medium-green'>
                        Log in
                    </div>
                </div>
            </div>
            <div>
                Content
            </div>
            <div className='border-t mt-2 bottom-0'>
                Footer
            </div>
        </div>
    )
}

export default withRouter(Lading)