import React from 'react';
import {PieChart} from '@mui/x-charts/PieChart';
import Typography from "@mui/material/Typography";
import AppointmentTable from "./AppointmentTable";
import {Link} from "react-router-dom";
import PatientCard from "./PatientCard";


export default function SalesDetails() {

    const data = [
        {label: 'Old Patients', value: 3000, color: "#ccd0d7"},
        {label: 'New Patients', value: 2000, color: "#e86c2e"},
        {label: 'Total Patients', value: 5000, color: "#2761ef"},

    ];
    return (
        <section className='p-3 flex flex-row max-sm:flex-col max-md:flex-col max-lg:flex-col gap-8 bg-[#f7f7f7] rounded-lg shadow-md'>
            <div className="flex flex-col">
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
            <div className="h-full w-full bg-[#eceffd] rounded-lg p-4">
                <Typography variant="subtitle2" color={"#2761ef"}>Today Appointment</Typography>
                <AppointmentTable/>
                <Link className="text-small-regular text-[#2761ef]"
                      to="/appointments">See All</Link>
            </div>

            <div className="h-full w-full bg-[#eceffd] rounded-lg p-4 flex flex-col gap-4">
                <Typography variant="subtitle2" color={"#2761ef"} >Today Appointment</Typography>
                <PatientCard/>
                <Link className="text-small-regular text-[#2761ef]"
                      to="/appointments">See All</Link>
            </div>

        </section>
    )
}
