import React, {useEffect, useState} from 'react'
import SummaryDetails from './SummaryDetails'
import {
    useGetDashBoardStatisticsQuery,
    useGetRecentPatientsQuery, useGetTodayAppointmentsQuery
} from "../../redux/features/dashboard/dashboardApiSlice";
import dayjs from "dayjs";
import {CircularProgress} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faCalendarCheck, faUser, faUsers} from "@fortawesome/free-solid-svg-icons";
import Calendar from "./Calendar";

export default function Dashboard() {
    const {data: statistics} = useGetDashBoardStatisticsQuery();
    const {data: recentPatients} = useGetRecentPatientsQuery();
    const {data: todayAppointments} = useGetTodayAppointmentsQuery();

    const [statistics1, setStatistics1] = useState(null);
    const [recentPatients1, setRecentPatients1] = useState(null);
    const [todayAppointments1, setTodayAppointments1] = useState(null);


    useEffect(() => {
        setTodayAppointments1(todayAppointments);
        setRecentPatients1(recentPatients);
        setStatistics1(statistics);
    }, [statistics, recentPatients, todayAppointments]);

    return (
        <section className=' py-6 w-full gap-10 px-5 h-full flex flex-col '>
            <div className='w-full gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>

                <div className='h-[161px] flex flex-col justify-betwwen p-3 bg-[#eceffd] gap-3 rounded-lg shadow-sm'>

                    <div className='w-full h-full flex justify-between'>
                        <div className='flex flex-col gap-2'>
                            <p className='text-[#202224] text-[16px]'>Total Patients</p>
                            <p className='text-[#202224] font-bold text-[28px]'>
                                {statistics1 ? statistics1.totalPatient : 0}
                            </p>
                        </div>
                        <div>
                            <FontAwesomeIcon className="w-15 h-14 text-[#0d46c1]" icon={faUsers} />
                        </div>
                    </div>

                    <div className='flex w-ful gap-2 '>
                        <div className='flex items-center justify-center gap-2'>
                            <p className='text-[16px'>Till Today</p>
                        </div>
                    </div>
                </div>

                <div className='  h-[161px] flex flex-col justify-betwwen p-3 bg-[#eceffd] gap-3 rounded-lg shadow-sm'>

                    <div className='w-full h-full flex justify-between'>
                        <div className='flex flex-col gap-2'>
                            <p className='text-[#202224] text-[16px]'>Today Patient</p>
                            <p className='text-[#202224] font-bold text-[28px]'>
                                {statistics1 ? statistics1.todayPatient : 0}
                            </p>
                        </div>
                        <div>
                            <FontAwesomeIcon className="w-14 h-14 text-[#0d46c1]" icon={faUser} />
                        </div>
                    </div>

                    <div className='flex w-ful gap-2 '>
                        <div className='flex items-center justify-center gap-2'>
                            <p className='text-[16px'>{dayjs().format("DD-MM-YYYY")}</p>
                        </div>
                    </div>
                </div>

                <div className='  h-[161px] flex flex-col justify-betwwen p-3 bg-[#eceffd] gap-3 rounded-lg shadow-sm'>

                    <div className='w-full h-full flex justify-between'>
                        <div className='flex flex-col gap-2'>
                            <p className='text-[#202224] text-[16px]'>Today Appointments</p>
                            <p className='text-[#202224] font-bold text-[28px]'>
                                {statistics1 ? statistics1.todayAppointment : 0}
                            </p>
                        </div>
                        <div className='flex  items-start justify-center'>
                            <FontAwesomeIcon className="w-14 h-14 text-[#0d46c1]" icon={faCalendar} />
                        </div>
                    </div>

                    <div className='flex w-ful items-center gap-2 '>
                        <div className='flex items-center justify-center gap-1'>
                            <p className='flex-1 text-auto'>{dayjs().format("DD-MM-YYYY")}</p>
                        </div>
                    </div>
                </div>

                <div className='  h-[161px] flex flex-col justify-betwwen p-3 bg-[#eceffd] gap-3 rounded-lg shadow-sm'>

                    <div className='w-full h-full flex justify-between'>
                        <div className='flex flex-col gap-2'>
                            <p className='text-[#202224] text-[16px]'>Completed Appointments</p>
                            <p className='text-[#202224] font-bold text-[28px]'>
                                {statistics1 ? statistics1.completedAppointment : 0}
                            </p>
                        </div>
                        <div>
                            <FontAwesomeIcon className="w-14 h-14 text-[#0d46c1]" icon={faCalendarCheck} />
                        </div>
                    </div>

                    <div className='flex w-ful gap-2 '>
                        <div className='flex items-center justify-center gap-2'>
                            <p className='text-[16px'>Till Today</p>
                        </div>
                    </div>
                </div>


            </div>
            {(statistics1 && recentPatients1 && todayAppointments1) ?
                <SummaryDetails
                    statistics={statistics1}
                    recentPatients={recentPatients1}
                    todayAppointments={todayAppointments1}
                /> : <CircularProgress/>}
            <Calendar/>
        </section>
    )
}

