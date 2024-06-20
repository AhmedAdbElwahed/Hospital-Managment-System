import React, {useState} from 'react';
import {Itemsasside} from './assideMenuConst'
import {Link, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../../redux/features/auth/authActions";
import {Alert, Snackbar} from "@mui/material";
import {SettingsAccessibility} from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";


export default function Asside() {
    const [items, setItems] = useState(Itemsasside);
    const dispatch = useDispatch();
    const {userTokens, error} = useSelector((state) => state.auth);
    const {pathname} = useLocation();
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(0);


    const handleLogout = () => {
        dispatch(logoutUser({
            accessToken: userTokens.access_token
        }));
        if (error) {
            setOpen(true);
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    return (
        <div
            className=''>
            <section className='flex text-xl gap-5'>
                <img className='md:hiden' src="/assets/menue.svg" alt=""/>
                <div className=' flex gap-1 items-center justify-center'>
                    <h1 className='text-[#4880FF] font-sans text-2xl font-bold '>MED</h1>
                    <h1 className='text-black font-sans text-2xl font-bold '>ICA</h1>
                </div>

            </section>
            <section className='w-full h-full flex  gap-1 text-black   flex-col'>
                {items.map((link, index) => {
                    const isActive = (pathname.includes(link.path)
                        && link.path.length > 1) || pathname === link.path;
                    return (
                        <div key={index} className='w-full  flex'>
                        <span
                            className={`w-[5px] h-full flex rounded-r-sm ${isActive ? 'bg-[#4880FF]' : 'bg-[transpreants]'} `}></span>
                            <div
                                className={`${isActive ? 'bg-[#4880FF] ' : 'bg-[#fff] '} px-4 w-full mx-5 cursor-pointer flex items-center gap-5 text-white rounded-lg`}>
                                <Link to={link.path} className="flex w-full h-full py-4">
                                    <div className={`pr-2 mt-[-5px]`}>{link.icon}</div>
                                    <p className={`text-sm font-[400] ${isActive ? ' text-white' : ' text-black'}  `}>{link.name}</p>
                                </Link>
                            </div>
                        </div>
                    )
                })}

                {/* =============================================================================================================== */}
                {/* ================================================================= items-2 *=====================================*/}
                {/* =============================================================================================================== */}


            </section>

            <section className='w-full flex flex-col gap-1 bg-white'>
                <div
                    className='w-full  flex'>
                    <span
                        className={`w-[5px] h-full flex rounded-r-sm ${((pathname.includes("/settings")
                            && "/settings".length > 1) || pathname === "/settings") ? 'bg-[#4880FF]' : 'bg-[transparent]'} `}></span>
                    <div
                        className={` ${((pathname.includes("/settings")
                            && "/settings".length > 1) || pathname === "/settings") ? 'bg-[#4880FF] text-white' : 'bg-[#fff] text-[#000]'}   px-4 w-full mx-5 cursor-pointer flex items-center gap-5 text-black rounded-lg`}>
                        <Link to="/settings" className="flex w-full h-full py-4">
                            <SettingsAccessibility/>
                            <p className='text-sm'>Setting</p>
                        </Link>
                    </div>
                </div>

                <button onClick={handleLogout} className='w-full  flex'>
                    <div
                        className={` bg-[#fff]  px-4 py-4 w-full mx-5 cursor-pointer flex items-center gap-5 text-black rounded-lg`}>
                        <LogoutIcon/>
                        <p className='text-sm'>Logout</p>
                    </div>
                </button>
            </section>

            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{width: '100%'}}
                >
                    <span>Can not logout, please try again later!!</span>
                </Alert>
            </Snackbar>

        </div>
    )
}
