import React from 'react'
import Search from './Search'
import Profile from './Profile'

export default function Header({controlAsside}) {
    return (
        <section
            className='bg-white  items-center justify-between w-full h-fit px-5 py-3 flex gap-5'>
            <div>
                <svg
                    onClick={controlAsside}
                    className='cursor-pointer' width="24" height="25" viewBox="0 0 24 25" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.898019">
                        <path
                            d="M3.75 6.5625H20.25V7.9375H3.75V6.5625ZM3.75 12.0625H20.25V13.4375H3.75V12.0625ZM3.75 17.5625H20.25V18.9375H3.75V17.5625Z"
                            fill="#202224"/>
                    </g>
                </svg>
            </div>
            <Search/>
            <Profile/>

        </section>
    )
}
