import React from 'react'
import SalesDetails from './SalesDetails'
import PatientAppointments from './PatientAppointments'

export default function Dashboard() {
    return (
        <section className=' py-6 w-full gap-10 px-5 h-full flex flex-col '>
            <div className='w-full gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>

                <div className='h-[161px] flex flex-col justify-betwwen p-3 gap-3  rounded-sm bg-white shadow-sm'>

                    <div className='w-full h-full flex justify-between'>
                        <div className='flex flex-col gap-2'>
                            <p className='text-[#202224] text-[16px]'>Total Patients</p>
                            <p className='text-[#202224] font-bold text-[28px]'>401</p>
                        </div>
                        <div>
                            <img className='w-[80%]' src="/assets/Total_Patients.svg" alt=""/>
                        </div>
                    </div>

                    <div className='flex w-ful gap-2 '>
                        <img src="/assets/ic-trending-up-24px.svg" alt=""/>
                        <div className='flex items-center justify-center gap-2'>
                            <p className='text-[16px text-[#00B69B]'>8.5%</p>
                            <p className='text-[16px'>Up from yesterday</p>
                        </div>
                    </div>
                </div>

                <div className='  h-[161px] flex flex-col justify-betwwen p-3 gap-3  rounded-sm bg-white shadow-sm'>

                    <div className='w-full h-full flex justify-between'>
                        <div className='flex flex-col gap-2'>
                            <p className='text-[#202224] text-[16px]'>Total Order</p>
                            <p className='text-[#202224] font-bold text-[28px]'>10293</p>
                        </div>
                        <div>
                            <img className='w-[80%]' src="/assets/Total_order.svg" alt=""/>
                        </div>
                    </div>

                    <div className='flex w-ful gap-2 '>
                        <img src="/assets/ic-trending-up-24px.svg" alt=""/>
                        <div className='flex items-center justify-center gap-2'>
                            <p className='text-[16px text-[#00B69B]'>8.5%</p>
                            <p className='text-[16px'>Up from yesterday</p>
                        </div>
                    </div>
                </div>

                <div className='  h-[161px] flex flex-col justify-betwwen p-3 gap-3  rounded-sm bg-white shadow-sm'>

                    <div className='w-full h-full flex justify-between'>
                        <div className='flex flex-col gap-2'>
                            <p className='text-[#202224] text-[16px]'>Total Earnings</p>
                            <p className='text-[#202224] font-bold text-[28px]'>$89,000</p>
                        </div>
                        <div className='flex  items-start justify-center'>
                            <img className='w-[80%]' src="/assets/Total_Earnings.svg" alt=""/>
                        </div>
                    </div>

                    <div className='flex w-ful items-center gap-2 '>
                        <div className='flex  items-start justify-center'>
                            <img src="/assets/ic-trending-down-24px.svg" alt=""/>
                        </div>
                        <div className='flex items-center justify-center gap-1'>
                            <p className='text-[16px] text-[#F93C65]'>8.5%</p>
                            <p className='flex-1 text-auto'>Up from yesterday</p>
                        </div>
                    </div>
                </div>

                <div className='  h-[161px] flex flex-col justify-betwwen p-3 gap-3  rounded-sm bg-white shadow-sm'>

                    <div className='w-full h-full flex justify-between'>
                        <div className='flex flex-col gap-2'>
                            <p className='text-[#202224] text-[16px]'>Appointments</p>
                            <p className='text-[#202224] font-bold text-[28px]'>2040</p>
                        </div>
                        <div>
                            <img className='w-[80%]' src="/assets/Appointments2.svg" alt=""/>
                        </div>
                    </div>

                    <div className='flex w-ful gap-2 '>
                        <img src="/assets/ic-trending-up-24px.svg" alt=""/>
                        <div className='flex items-center justify-center gap-2'>
                            <p className='text-[16px text-[#00B69B]'>1.8%</p>
                            <p className='text-[16px'>Up from yesterday</p>
                        </div>
                    </div>
                </div>


            </div>

            <SalesDetails/>
            {/*<PatientAppointments/>*/}

        </section>
    )
}

