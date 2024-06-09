import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function CreateAppointment({add}) {
    const [date, setdate] = useState();


    return (

        <section>
            <div onClick={() => add(0)}
                 className='flex items-center cursor-pointer'>
                <img src="/assets/back.svg" alt=""/>
                <h1 className='font-nunito-sans text-2xl font-bold'>
                    Appointments
                </h1>
            </div>

            <div className='w-full flex flex-col gap-3 px-5 '>
                <p className='text-[#6B779A] font-bold'>Meeting Name</p>
                <p className='font-bold px-5'>Patient Ali Meeting - 1</p>
            </div>

            <form className='my-10' action="">

                <div className='flex gap-6 flex-col w-full  md:p-6  items-start '>
                    <div className=" items-center relative border border-gray-300 rounded-lg  cursor-pointer flex">
                        <DatePicker
                            selected={date}
                            onChange={date => setdate(date)}
                            dateFormat="MM/yyyy"
                            showMonthYearPicker
                            showYearDropdown
                            className="block px-5 py-2  mt-1 outline-none cursor-pointer rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button type="button"
                                className=' pointer-events-none px-2 flex right-0 absolute items-center justify-center cursor-pointer'>
                            <img className=' w-5' src="/assets/arrowdown.svg" alt=""/>
                        </button>
                    </div>

                    <div className='w-full flex items-center gap-5 justify-start overflow-x-auto'>
                        <div
                            className='bg-[#0E82FD] text-white flex flex-col justify-center items-center rounded-xl p-9'>
                            <p className='font-bold text-3xl'>14</p>
                            <p className='font-bold'>TUE</p>
                        </div>
                        <div
                            className='bg-[#0E82FD] text-white flex flex-col justify-center items-center rounded-xl p-9'>
                            <p className='font-bold text-3xl'>14</p>
                            <p className='font-bold'>TUE</p>
                        </div>
                        <div
                            className='bg-[#0E82FD] text-white flex flex-col justify-center items-center rounded-xl p-9'>
                            <p className='font-bold text-3xl'>14</p>
                            <p className='font-bold'>TUE</p>
                        </div>
                        <div
                            className='bg-[#0E82FD] text-white flex flex-col justify-center items-center rounded-xl p-9'>
                            <p className='font-bold text-3xl'>14</p>
                            <p className='font-bold'>TUE</p>
                        </div>
                        <div
                            className='bg-[#0E82FD] text-white flex flex-col justify-center items-center rounded-xl p-9'>
                            <p className='font-bold text-3xl'>14</p>
                            <p className='font-bold'>TUE</p>
                        </div>
                        <div
                            className='bg-[#0E82FD] text-white flex flex-col justify-center items-center rounded-xl p-9'>
                            <p className='font-bold text-3xl'>14</p>
                            <p className='font-bold'>TUE</p>
                        </div>
                        <div
                            className='bg-[#0E82FD] text-white flex flex-col justify-center items-center rounded-xl p-9'>
                            <p className='font-bold text-3xl'>14</p>
                            <p className='font-bold'>TUE</p>
                        </div>
                        <div
                            className='bg-[#0E82FD] text-white flex flex-col justify-center items-center rounded-xl p-9'>
                            <p className='font-bold text-3xl'>14</p>
                            <p className='font-bold'>TUE</p>
                        </div>
                        <div
                            className='bg-[#0E82FD] text-white flex flex-col justify-center items-center rounded-xl p-9'>
                            <p className='font-bold text-3xl'>14</p>
                            <p className='font-bold'>TUE</p>
                        </div>
                    </div>
                </div>


                <p className='font-bold text-2xl px-5 my-5'>Available Time</p>

                <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
                    <p className='p-2 cursor-pointer bg-gray-300 rounded-xl flex items-center justify-center font-bold text-gray-600'>90:00
                        AM</p>
                    <p className='p-3 cursor-pointer bg-gray-300 rounded-xl flex items-center justify-center font-bold text-gray-600'>90:00
                        AM</p>
                </div>

                <button
                    className=' p-3  w-full my-5 bg-[#0E82FD] text-gray-100 rounded-xl flex items-center justify-center md:w-[360px] '
                    type='submit '>
                    Set Appointment
                </button>

            </form>

        </section>
    )
}
