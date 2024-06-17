// import '/R`';
import React, { useState } from 'react';
import { Link } from 'react-router-dom'

export default function Register() {


    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');



    const handleSubmit = (e) => {
        e.preventDefault();
        // هنا يمكنك إرسال بيانات تسجيل الدخول إلى الخادم
        console.log('Username:', username);
        console.log('Password:', password);
    };


    return (
        <main className='w-full   min-h-screen  flex flex-col  items-center justify-start  ' >


            <div className="w-full gap-2 pb-4  bg-[#0e82fd] flex  flex-col items-center justify-start p-2 md:h-[20vh] lg:h-[50vh] md:gap-4" >
                <img className='w-[25%] md:w-[15%]' src="/assets/logo.png" alt="" />
                <h1 className='  w-full text-center text-4xl font-bold text-white '>
                    Welcome!
                </h1>
                <p className='  w-full text-center text-white text-xs  '>
                    Use these awesome forms to login or create new account in your project for free.


                </p>
            </div>

            <div className=" p-2 rounded-lg w-full h-[100%]  bg-white  flex flex-col  md:w-[45%]  items-center  md:justify-center md:mt-[-150px]  md:p-9 ">

                <h1 className='font-bold'>
                    Register with
                </h1>



                <form className='   flex w-full flex-col px-3 pt-5  gap-3 ' onSubmit={handleSubmit}>
                    <div className=' flex flex-col'>
                        <label htmlFor="name">Name:</label>
                        <input
                            id="name"
                            className='h-[50px] border border-[#e2e8f0] rounded-lg px-2'
                            type="text"
                            value={username}
                            placeholder='Your full name'
                            onChange={(e) => setUsername(e.target.value)} />
                    </div>


                    <div className='flex flex-col'>
                        <label htmlFor="email">Email:</label>
                        <input
                            id="email"
                            className='h-[50px] border border-[#e2e8f0] rounded-lg px-2'
                            type="text"
                            value={username}
                            placeholder='Your email address'
                            onChange={(e) => setUsername(e.target.value)} />
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="password">Password:</label>
                        <input
                            id="password"
                            className='h-[50px] border border-[#e2e8f0] rounded-lg px-2'
                            type="password"
                            value={password}
                            placeholder='Your password'
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <label className="inline-flex items-center cursor-pointer my-3">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900">Remember me</span>
                    </label>

                    <button id='login' className='bg-[#0e82fd]' type="submit">SIGN UP</button>
                </form>


                <div className='w-full text-center text-gray-500'>
                    Already have an account?
                    <Link to='/' className='text-blue-700 font-bold'>
                        Sign up
                    </Link>
                </div>


            </div>



        </main >
    )
}
