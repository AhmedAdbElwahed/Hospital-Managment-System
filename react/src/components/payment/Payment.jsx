import React from 'react'
import Card from './Card'
import Chart from './Chart'
import RecentTransactions from './RecentTransactions'


export default function Payment() {
    return (


        <section className='py-6 w-full gap-10 px-5 h-full flex flex-col'>

            <div className='w-full flex items-center justify-between  '>
                <h1 className='font-nunito-sans text-2xl font-bold'>
                    Payment
                </h1>
                <button className='bg-[#0E82FD] text-gray-50 py-3 cursor-pointer px-5 rounded-xl'>
                    Withdraw Now
                </button>
            </div>


            <div className='w-full gap-4 flex flex-col items-center justify-between  md:flex-row'>
                <Card />
                <Chart />
            </div>


            <RecentTransactions />

        </section>
    )
}
