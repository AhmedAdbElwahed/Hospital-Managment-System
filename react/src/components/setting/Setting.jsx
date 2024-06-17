import React, { useState } from 'react'
import EditProfile from './EditProfile'

export default function Setting() {
    const [items, setItems] = useState(0)
    return (
        <section className='py-6 w-full  px-5 h-full flex flex-col'>

            <h1 className='font-nunito-sans  mb-9 text-2xl font-bold'>
                Setting
            </h1>

            <div className='w-full flex items-center gap-1  bg-white p-5 rounded-t-lg '>

                <div onClick={() => setItems(0)} className={`p-2 text-center font-bold ${items === 0 ? "border text-blue-400" : "text-blue-300"}  cursor-pointer  border-x-0 border-t-0 border-blue-400 `}>Edit Profile</div>
                <div onClick={() => setItems(1)} className={`p-2 text-center font-bold ${items === 1 ? "border text-blue-400" : "text-blue-300"}  cursor-pointer border-x-0 border-t-0 border-blue-400 `}>Preferences</div>
                <div onClick={() => setItems(2)} className={`p-2 text-center font-bold ${items === 2 ? "border text-blue-400" : " text-blue-300"}  cursor-pointer  border-x-0 border-t-0 border-blue-400 `}>Security</div>

            </div>

            {items === 0 && <EditProfile />}

        </section>
    )
}
