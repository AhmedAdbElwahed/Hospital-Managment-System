import React, {useEffect, useState} from 'react';
import {CircularProgress} from '@mui/material';
import {useGetDoctorByIdQuery} from '../../redux/features/doctor/doctorApiSlice';
import {useParams} from "react-router-dom";
import {mapDataToDoctors} from "../../util/doctorUtils";
import {DoctorForm} from "./DoctorForm";
import dayjs from "dayjs";
import Divider from "@mui/material/Divider";
import CustomBreadcrumbs from "../shared/CustomBreadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import {faUserDoctor} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const links = [
    {path: "/", icon: <HomeIcon sx={{mr: 0.5}} fontSize="inherit"/>},
    {path: "/doctors", icon: <FontAwesomeIcon className="w-[15px] h-[15px] mr-[0.5px]" icon={faUserDoctor} />},
]

const CreateDoctor = () => {
    const {id} = useParams();
    const [skip, setSkip] = useState(true);
    const {data} = useGetDoctorByIdQuery(id, {
        skip,
    });
    const [doctorData, setDoctorData] = useState(null);

    useEffect(() => {
        if (id) {
            setSkip(false);
            const doctor = mapDataToDoctors([data])[0];
            if (doctor) {

                doctor['dob'] = doctor.dob ? dayjs(doctor.dob) : null;
                doctor['workStartTime'] = doctor.workStartTime ?dayjs(`2024-06-21T${doctor.workStartTime}Z`, "DD/MM/YYYY hh:mm A"): null;
                doctor['workEndTime'] = doctor.workEndTime ?dayjs(`2023-06-20T${doctor.workEndTime}Z`) : null;
            }

            setDoctorData(doctor);
        }
    }, [data, id]);

    useEffect(() => {
        document.title = 'Create Doctor';
    }, []);


    return (
        <section className="flex flex-col pb-1 w-full gap-4 px-5 h-full">
            <div className="flex flex-row gap-2 w-full bg-white rounded-lg p-4">
                <p className="font-bold">Dashboard</p>
                <Divider orientation="vertical"/>
                <CustomBreadcrumbs links={links} pageName={id ? "Update Doctor": "Create Doctor"}/>
            </div>
            {id ? doctorData ? <DoctorForm doctor={doctorData}/> : <CircularProgress/> :
                <DoctorForm doctor={doctorData}/>}
        </section>
    );
}

export default CreateDoctor;
