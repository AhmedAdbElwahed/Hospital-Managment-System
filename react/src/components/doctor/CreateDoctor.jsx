import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Snackbar, Alert, CircularProgress} from '@mui/material';
import {useGetDoctorByIdQuery} from '../../redux/features/doctor/doctorApiSlice';
import {useParams} from "react-router-dom";
import {mapDataToDoctors} from "../../util/doctorUtils";
import {DoctorForm} from "./DoctorForm";
import moment from "moment";
import dayjs from "dayjs";


const CreateDoctor = () => {
    const {id} = useParams();
    const {data} = useGetDoctorByIdQuery(id);
    const [doctorData, setDoctorData] = useState(null);

    useEffect(() => {
        if (id) {

            const doctor = mapDataToDoctors([data])[0];
            if (doctor) {

                doctor['dob'] = doctor.dob ? dayjs(doctor.dob) : null;
                doctor['workStartTime'] = doctor.workStartTime ?dayjs(`2024-06-21T${doctor.workStartTime}Z`, "DD/MM/YYYY hh:mm A"): null;
                doctor['workEndTime'] = doctor.workEndTime ?dayjs(`2023-06-20T${doctor.workEndTime}Z`) : null;
            }

            setDoctorData(doctor);
        }
    }, [data, id]);


    return (
        <section className=" py-6 w-full gap-10 px-5 h-full flex flex-col ">
            <h1 className="font-nunito-sans text-2xl font-bold ">Add New Doctor</h1>
            {id ? doctorData ? <DoctorForm doctor={doctorData}/> : <CircularProgress/> :
                <DoctorForm doctor={doctorData}/>}
        </section>
    );
}

export default CreateDoctor;
