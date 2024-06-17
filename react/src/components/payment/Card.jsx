import React from 'react'

export default function Card() {
    return (
        <section className='w-full'>
            <div className=" flex flex-col h-fit gap-5 text-white w-full bg-gradient-to-b from-blue-500 to-indigo-900 rounded-3xl justify-between " >
                <div className='p-6 w-full h-full gap-8 flex flex-col justify-between'>
                    <div className='w-ful flex  items-center  '>
                        <div className='w-full   ' >
                            <p className='text-2xl' > Balance</p>
                            <p className='text-2xl'>$5,756</p>
                        </div>
                        <img className='' src="/assets/chipcard.svg" alt="" />
                    </div>
                    <div className='w-ful flex items-center justify-between'>
                        <div className='w-full'>
                            <p className='text-white text-opacity-70'>CARD HOLDER </p>
                            <p className='font-semibold'>Eddy Cusuma </p>
                        </div>
                        <div className='  w-full flex flex-col justify-start'>
                            <p className='text-white text-opacity-70'>VALID THRU </p>
                            <p>12/22 </p>
                        </div>
                    </div>
                </div>
                <div className=' flex items-center justify-between p-6 bg-gradient-to-br from-blue-500 via-blue-700 to-purple-900 rounded-b-3xl '>
                    <p className=' font-bold text-2xl'>
                        3778 **** **** 1234
                    </p>
                    <img src="/assets/cardprand.svg" alt="" />
                </div>
            </div>
        </section>
    )
}
