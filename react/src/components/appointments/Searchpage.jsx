import React from 'react'
import CreateAppointment from './CreateAppointment'
import { Link } from 'react-router-dom'

export default function Search({ add }) {
    return (
        <section className='w-full  flex flex-col  gap-3 md:flex-row '>
            <form className="flex items-center  mx-auto w-full bg-white border border-blue-300 rounded-lg gap-2 p-2.5">
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.92163 10.9105C9.27842 10.9105 11.189 8.99998 11.189 6.64319C11.189 4.28641 9.27842 2.37585 6.92163 2.37585C4.56485 2.37585 2.6543 4.28641 2.6543 6.64319C2.6543 8.99998 4.56485 10.9105 6.92163 10.9105Z" stroke="#0E82FD" stroke-width="1.46309" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M9.96973 9.69128L13.6274 13.349" stroke="#0E82FD" strokeWidth="1.46309" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <input type="text" id="simple-search" className="   text-[#0E82FD] text-sm rounded-lg outline-none w-full " placeholder="Search appointments..." required />
            </form>

            <div
                onClick={() => add(1)}
                className='bg-blue-700 rounded-lg flex items-center p-3 gap-2 cursor-pointer  justify-center'>
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.00696 9.5H13.7855" stroke="white" strokeWidth="1.46309" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9.39618 13.8892L9.39618 5.11072" stroke="white" strokeWidth="1.46309" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <section className=' text-xs text-nowrap  text-white'>
                    New Appointment
                </section>
            </div>
        </section >
    )
}
