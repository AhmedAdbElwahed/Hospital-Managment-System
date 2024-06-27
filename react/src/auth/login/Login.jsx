import './Login.css';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {loginUser} from '../../redux/features/auth/authActions'
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {loginFromSchema} from '../../util/forms';
import {useDispatch, useSelector} from "react-redux";
import {Alert, CircularProgress, FormHelperText, Snackbar, TextField} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import {Visibility, VisibilityOff} from "@mui/icons-material";

export default function Login() {

    const {loading, success, userTokens, error} = useSelector(state => state.auth)
    const {control, handleSubmit, formState: {errors}} = useForm({resolver: zodResolver(loginFromSchema)});
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);


    useEffect(() => {
        if (userTokens) {
            navigate("/", {replace: true});
        }
    }, [userTokens, navigate]);

    const handleOnSubmit = async (data) => {
        dispatch(loginUser(data));
        if (error) {
            console.log(error);
            setOpen(true);
        } else {
            navigate("/");
        }
        console.log("access_token: ", userTokens);
        console.log("Success: ", success);
        if (success) {
            console.log("hello from navigate");
            navigate("/");
        }

    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            console.log("error")
            return;
        }
        console.log(open)
        setOpen(false);
    };

    useEffect(() => {
        document.title = "Login"
    }, [])



    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    return (
        <main className='w-full  min-h-screen flex flex-col-reverse  items-center justify-end md:grid md:grid-cols-2 '>

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
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{required: 'Email is required'}}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    label="Email"
                                    variant="outlined"
                                    error={!!errors.email}
                                    helperText={errors.email ? errors.email.message : ''}
                                    fullWidth
                                />
                            )}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{required: 'First name is required'}}
                            render={({field}) => (
                                <FormControl sx={{width: '100%' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        {...field}
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                    <FormHelperText>{errors.gender ? errors.gender.message : ''}</FormHelperText>
                                </FormControl>
                            )}
                        />
                    </div>

                    <label className="inline-flex items-center cursor-pointer my-3">
                        <input type="checkbox" className="sr-only peer"/>
                        <div
                            className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900">Remember me</span>
                    </label>

                    <button id='login' className='bg-[#0e82fd] text-xs' type="submit">
                        {loading ? <CircularProgress color='inherit'/> : "SIGN IN"}
                    </button>
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
                <img className='w-[50%]' src="/assets/logo.png" alt=""/>
            </div>

            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{width: '100%'}}
                >
                    <span>{error}</span>
                </Alert>
            </Snackbar>

        </main>
    )
}
