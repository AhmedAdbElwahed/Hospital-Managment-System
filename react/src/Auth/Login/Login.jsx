import './Login.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFromSchema } from '../../util/forms';

export default function Login() {
  
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm({resolver: zodResolver(loginFromSchema)});
  const navigate = useNavigate();


  const handleOnSubmit = (data) => {
    login(data);
    navigate("/");
  }


  return (
    <main className='w-full  min-h-screen flex flex-col-reverse  items-center justify-end md:grid md:grid-cols-2 ' >

      <div className=" w-full h-[100%]  flex flex-col  pt-5 items-center  md:justify-center   ">

        <h1 className='w-full text-center text-4xl font-bold text-[#0e82fd]'>
          Welcome Back
        </h1>
        <p className='w-full text-center text-gray-500 text-xs  '>
          Enter your email and password to sign in
        </p>


        <form className='flex w-full flex-col px-3 pt-5 md:w-[80%] gap-3 ' 
          onSubmit={handleSubmit(handleOnSubmit)}>
          <div className='flex flex-col'>
            <label htmlFor="email">Email:</label>
            <input
              {...register("email")}
              id="email"
              className='h-[50px] border border-[#e2e8f0] rounded-lg px-2'
              type="text"
              placeholder='Your email address' />
              {errors.email && <span>{errors.email.message}</span>}
          </div>
          <div className='flex flex-col'>
            <label htmlFor="password">Password:</label>
            <input
              {...register("password")}
              id="password"
              className='h-[50px] border border-[#e2e8f0] rounded-lg px-2'
              type="password"
              placeholder='Your password'/>
              {errors.password && <span>{errors.password.message}</span>}
          </div>

          <label className="inline-flex items-center cursor-pointer my-3">
            <input type="checkbox" className="sr-only peer" />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900">Remember me</span>
          </label>

          <button id='login' className='bg-[#0e82fd] text-xs' type="submit">SIGN IN</button>
        </form>


        <div className='w-full flex items-center justify-center text-center gap-1 text-gray-500'>
          <p>
            Don't have an account?
          </p>

          <Link to='/Register' className='text-blue-700 font-bold'>
            Sign up
          </Link>
        </div>


      </div>

      <div className="w-full h-full bg-[#0e82fd] flex items-center justify-center p-2">
        <img className='w-[50%]' src="/logo.png" alt="" />
      </div>

    </main >
  )
}
