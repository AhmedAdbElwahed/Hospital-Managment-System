import React from 'react';
import {PieChart} from '@mui/x-charts/PieChart';
import Typography from "@mui/material/Typography";
import AppointmentTable from "./AppointmentTable";
import {Link} from "react-router-dom";
import PatientCard from "./PatientCard";


export default function SummaryDetails({statistics, recentPatients, todayAppointments}) {

    const data = [
        {label: 'Old Patients', value: statistics.oldPatient, color: "#ccd0d7"},
        {label: 'New Patients', value: statistics.newPatient, color: "#e86c2e"},
        {label: 'Total Patients', value: statistics.totalPatient, color: "#2761ef"},

    ];
    return (
        <section className='py-3 flex flex-row max-sm:flex-col max-md:flex-col max-lg:flex-col gap-4' >
            <div className="flex flex-col p-4 bg-white rounded-lg shadow-lg drop-shadow">
                <Typography variant="subtitle2">Patient Summary</Typography>
                <div>
                    <PieChart
                        series={[
                            {
                                paddingAngle: 5,
                                innerRadius: 40,
                                outerRadius: 90,
                                cornerRadius: 5,
                                cy: 105,
                                cx: 125,
                                data,
                            },
                        ]}

                        width={250}
                        height={300}
                        slotProps={{
                            legend: {
                                direction: 'column',
                                position: {vertical: 'bottom', horizontal: 'left'},
                                padding: 0,
                                labelStyle: {
                                    fontSize: 15
                                }
                            },
                        }}
                    />
                </div>
            </div>
            <div className="h-full w-full bg-white rounded-lg p-4 shadow-md drop-shadow">
                <Typography variant="subtitle2" color={"#2761ef"}>Today Appointment</Typography>
                <AppointmentTable todayAppointments={todayAppointments}/>
                <Link className="text-small-regular text-[#2761ef]"
                      to="/appointments">See All</Link>
            </div>

            <div className="h-full w-full bg-white rounded-lg p-4 shadow-md drop-shadow">
                <Typography variant="subtitle2" color={"#2761ef"} >Recent Patients</Typography>
                <PatientCard recentPatients={recentPatients}/>
                <Link className="text-small-regular text-[#2761ef]"
                      to="/appointments">See All</Link>
            </div>

        </section>
    )
}
