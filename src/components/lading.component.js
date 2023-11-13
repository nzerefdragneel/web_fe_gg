import React from 'react'
import { withRouter } from '../common/with-router'

function Lading() {
    return (
        <div className="flex flex-col h-48 w-full">
            <div className='pt-3 pb-4 px-32 flex flex-row justify-between'>
                <div className='flex flex-row text-lg'>
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
                    <div className='px-8 py-2.5 rounded-lg hover:bg-medium-green'>
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
            <div>
                Footer
            </div>
        </div>
    )
}

export default withRouter(Lading)