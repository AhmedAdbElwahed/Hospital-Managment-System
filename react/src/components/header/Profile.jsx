import React from 'react'

export default function Profile() {
 
    return (
        <section className='flex items-center gap-3 w-fit '>
            <div className=' flex items-center justify-center w-7 h-7  rounded-full bg-gray-900 md:w-10 md:h-10'>
                <img className='w-full h-full rounded-full' src="/assets/avatar.png" alt="" />
            </div>

            <div className='flex flex-col leading-4 '>
                <p className='text-[#404040] font-bold text-xs text-nowrap md:text-sm'>Moni Roy</p>
                <p className='text-[#565656] text-xs md:text-sm'>Admin</p>
            </div>

            <svg className='cursor-pointer' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 19.1C15.0258 19.1 19.1 15.0258 19.1 10C19.1 4.97421 15.0258 0.9 10 0.9C4.97421 0.9 0.9 4.97421 0.9 10C0.9 15.0258 4.97421 19.1 10 19.1Z" stroke="#5C5C5C" strokeWidth="0.2" />
                <path d="M10 10.7929L7.73162 8.14645C7.56425 7.95118 7.29289 7.95118 7.12553 8.14645C6.95816 8.34171 6.95816 8.65829 7.12553 8.85355L9.69695 11.8536C9.86432 12.0488 10.1357 12.0488 10.303 11.8536L12.8745 8.85355C13.0418 8.65829 13.0418 8.34171 12.8745 8.14645C12.7071 7.95118 12.4358 7.95118 12.2684 8.14645L10 10.7929Z" fill="#565656" />
                <mask id="mask0_476_860"  maskUnits="userSpaceOnUse" x="7" y="8" width="6" height="4">
                    <path d="M10 10.7929L7.73162 8.14645C7.56425 7.95118 7.29289 7.95118 7.12553 8.14645C6.95816 8.34171 6.95816 8.65829 7.12553 8.85355L9.69695 11.8536C9.86432 12.0488 10.1357 12.0488 10.303 11.8536L12.8745 8.85355C13.0418 8.65829 13.0418 8.34171 12.8745 8.14645C12.7071 7.95118 12.4358 7.95118 12.2684 8.14645L10 10.7929Z" fill="white" />
                </mask>
                
            </svg>

        </section>
    )
}

