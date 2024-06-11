import React, {useState} from 'react';
import {Itemsasside} from './assideMenuConst'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../../redux/features/auth/authActions";
import {Alert, Snackbar} from "@mui/material";


export default function Asside({pages, control}) {
    const [items, setItems] = useState(Itemsasside);
    const dispatch = useDispatch();
    const {userTokens, error} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(0);
    const updatedItems = (id) => {
        const updatedList = items.map((item) => ({...item, selection: item.id === id,}));
        setItems(updatedList);
        pages(id)
        setId(id)
        return updatedList;

    };

    const handleLogout = () => {
        dispatch(logoutUser({
            accessToken: userTokens.access_token}));
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
            className=' z-20 flex left-0  w-[70%] h-full flex-col gap-8 pt-2  bg-white    items-center border border-black fixed md:w-[40%]  lg:left-0 lg:w-[20%]  '>
            <section className='flex text-xl gap-5'>
                <img className='md:hiden' onClick={control} src="/assets/menue.svg" alt=""/>
                <div className=' flex gap-1 items-center justify-center'>
                    <h1 className='text-[#4880FF] font-sans text-2xl font-bold '>MED</h1>
                    <h1 className='text-black font-sans text-2xl font-bold '>ICA</h1>
                    {/*<img className='w-[100px] ' src="logo.png" alt=""*/}
                    {/*     style={{filter: 'invert(37%) sepia(98%) saturate(805%) hue-rotate(198deg) brightness(104%) contrast(101%)'}}/>*/}

                </div>

            </section>
            <section className='w-full h-full flex  gap-1 text-black   flex-col'>
                {items.map((item, index) => (
                    <div onClick={() => updatedItems(item.id)} key={index} className='w-full  flex'>
                        <span
                            className={`w-[5px] h-full flex rounded-r-sm ${item.selection ? 'bg-[#4880FF]' : 'bg-[transpreants]'} `}></span>
                        <div
                            className={`${item.selection ? 'bg-[#4880FF] ' : 'bg-[#fff] '} px-4 py-4 w-full mx-5 cursor-pointer flex items-center gap-5 text-white rounded-lg`}>
                            <img src={item.icon} alt="" className="w-[24px] h-[24px]"
                                 style={{filter: item.selection ? 'invert(100%)' : 'invert(0%)'}}/>
                            <p className={`text-sm font-[400] ${item.selection ? ' text-white' : ' text-black'}  `}>{item.name}</p>
                        </div>
                    </div>
                ))}

                {/* =============================================================================================================== */}
                {/* ================================================================= items-2 *=====================================*/}
                {/* =============================================================================================================== */}


            </section>

            <section className='w-full flex flex-col gap-1 bg-white'>
                <div
                    onClick={() => updatedItems(5)}
                    className='w-full  flex'>
                    <span
                        className={`w-[5px] h-full flex rounded-r-sm ${id === 5 ? 'bg-[#4880FF]' : 'bg-[transparent]'} `}></span>
                    <div
                        className={` ${id === 5 ? 'bg-[#4880FF] text-white' : 'bg-[#fff] text-[#000]'}   px-4 py-4 w-full mx-5 cursor-pointer flex items-center gap-5 text-black rounded-lg`}>
                        <svg style={{filter: id === 5 ? 'invert(100%)' : 'invert(0%)'}}
                             width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7.06641 0.8125H7.625H10.375H10.9336L11.0625 1.37109L11.4492 3.39062C12.0794 3.64844 12.6667 4.00651 13.2109 4.46484L15.2305 3.77734L15.7891 3.60547L16.0469 4.07812L17.4219 6.48438L17.6797 6.95703L17.293 7.34375L15.7461 8.67578C15.832 9.19141 15.875 9.54948 15.875 9.75C15.875 9.95052 15.832 10.3086 15.7461 10.8242L17.293 12.1562L17.6797 12.543L17.4219 13.0156L16.0469 15.4219L15.7891 15.8945L15.2305 15.7227L13.2109 15.0352C12.6667 15.4935 12.0794 15.8516 11.4492 16.1094L11.0625 18.1289L10.9336 18.6875H10.375H7.625H7.06641L6.9375 18.1289L6.55078 16.1094C5.92057 15.8516 5.33333 15.4935 4.78906 15.0352L2.76953 15.7227L2.21094 15.8945L1.95312 15.4219L0.578125 13.0156L0.320312 12.543L0.707031 12.1562L2.25391 10.8242C2.16797 10.3086 2.125 9.95052 2.125 9.75C2.125 9.54948 2.16797 9.19141 2.25391 8.67578L0.707031 7.34375L0.320312 6.95703L0.578125 6.48438L1.95312 4.07812L2.21094 3.60547L2.76953 3.77734L4.78906 4.46484C5.33333 4.00651 5.92057 3.64844 6.55078 3.39062L6.9375 1.37109L7.06641 0.8125ZM8.18359 2.1875L7.83984 3.99219L7.75391 4.37891L7.36719 4.50781C6.59375 4.76562 5.90625 5.16667 5.30469 5.71094L4.96094 5.96875L4.61719 5.88281L2.85547 5.28125L2.03906 6.65625L3.41406 7.85938L3.75781 8.11719L3.62891 8.54688C3.54297 8.91927 3.5 9.32031 3.5 9.75C3.5 10.1797 3.54297 10.5807 3.62891 10.9531L3.75781 11.3828L3.41406 11.6406L2.03906 12.8438L2.85547 14.2188L4.61719 13.6172L4.96094 13.5312L5.30469 13.7891C5.90625 14.3333 6.59375 14.7344 7.36719 14.9922L7.75391 15.1211L7.83984 15.5078L8.18359 17.3125H9.81641L10.1602 15.5078L10.2461 15.1211L10.6328 14.9922C11.4062 14.7344 12.0938 14.3333 12.6953 13.7891L13.0391 13.5312L13.3828 13.6172L15.1445 14.2188L15.9609 12.8438L14.5859 11.6406L14.2852 11.3828L14.3711 10.9531C14.457 10.5807 14.5 10.1797 14.5 9.75C14.5 9.32031 14.457 8.91927 14.3711 8.54688L14.2422 8.11719L14.5859 7.85938L15.9609 6.65625L15.1445 5.28125L13.3828 5.88281L13.0391 5.96875L12.6953 5.71094C12.0938 5.16667 11.4062 4.76562 10.6328 4.50781L10.2461 4.37891L10.1602 3.99219L9.81641 2.1875H8.18359ZM6.55078 7.34375C7.23828 6.65625 8.05469 6.3125 9 6.3125C9.94531 6.3125 10.7474 6.65625 11.4062 7.34375C12.0938 8.0026 12.4375 8.80469 12.4375 9.75C12.4375 10.6953 12.0938 11.5117 11.4062 12.1992C10.7474 12.8581 9.94531 13.1875 9 13.1875C8.05469 13.1875 7.23828 12.8581 6.55078 12.1992C5.89193 11.5117 5.5625 10.6953 5.5625 9.75C5.5625 8.80469 5.89193 8.0026 6.55078 7.34375ZM10.4609 8.28906C10.0599 7.88802 9.57292 7.6875 9 7.6875C8.42708 7.6875 7.9401 7.88802 7.53906 8.28906C7.13802 8.6901 6.9375 9.17708 6.9375 9.75C6.9375 10.3229 7.13802 10.8099 7.53906 11.2109C7.9401 11.612 8.42708 11.8125 9 11.8125C9.57292 11.8125 10.0599 11.612 10.4609 11.2109C10.862 10.8099 11.0625 10.3229 11.0625 9.75C11.0625 9.17708 10.862 8.6901 10.4609 8.28906Z"
                                fill="black"/>
                        </svg>
                        <p className='text-sm'>Setting</p>
                    </div>
                </div>

                <button onClick={handleLogout} className='w-full  flex'>
                    <div
                        className={` bg-[#fff]  px-4 py-4 w-full mx-5 cursor-pointer flex items-center gap-5 text-black rounded-lg`}>
                        <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.3125 0.5H9.6875V8.75H8.3125V0.5ZM6.25 0.972656V2.47656C5.01823 2.99219 4.01562 3.82292 3.24219 4.96875C2.4974 6.11458 2.125 7.375 2.125 8.75C2.125 10.6406 2.79818 12.2591 4.14453 13.6055C5.49089 14.9518 7.10938 15.625 9 15.625C10.8906 15.625 12.5091 14.9518 13.8555 13.6055C15.2018 12.2591 15.875 10.6406 15.875 8.75C15.875 7.375 15.4883 6.11458 14.7148 4.96875C13.9701 3.82292 12.9818 2.99219 11.75 2.47656V0.972656C13.3828 1.54557 14.7005 2.54818 15.7031 3.98047C16.7344 5.38411 17.25 6.97396 17.25 8.75C17.25 11.013 16.4336 12.9609 14.8008 14.5938C13.1966 16.1979 11.263 17 9 17C6.73698 17 4.78906 16.1979 3.15625 14.5938C1.55208 12.9609 0.75 11.013 0.75 8.75C0.75 6.97396 1.2513 5.38411 2.25391 3.98047C3.28516 2.54818 4.61719 1.54557 6.25 0.972656Z"
                                fill="black"/>
                        </svg>
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
