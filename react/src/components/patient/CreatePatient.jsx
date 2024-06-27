import {CircularProgress} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useGetPatientByIdQuery} from "../../redux/features/patient/patientApiSlice";
import dayjs from "dayjs";
import {mapDataToPatients} from "../../util/patientUtils";
import PatientForm from "./PatientForm";
import {countries} from "../../constants/patientFormSelectChoices";
import Divider from "@mui/material/Divider";
import CustomBreadcrumbs from "../shared/CustomBreadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHospitalUser} from "@fortawesome/free-solid-svg-icons";

const links = [
    {path: "/", icon: <HomeIcon sx={{mr: 0.5}} fontSize="inherit"/>},
    {path: "/patients", icon: <FontAwesomeIcon className="w-[15px] h-[15px] mr-[0.5px]" icon={faHospitalUser} />},
]

const CreatePatient = () => {
    const {id} = useParams();
    const [skip, setSkip] = useState(true);
    const {data} = useGetPatientByIdQuery(id, {
        skip,
    });
    const [patientData, setPatientData] = useState(null);

    useEffect(() => {
        if (id) {
            setSkip(false);
            const patient = mapDataToPatients([data])[0];
            if (patient) {
                patient['dob'] = patient.dob ? dayjs(patient.dob) : null;
                patient['nationality'] = patient.nationality ?
                    countries.find(value => value.label === patient.nationality)
                    : null;
            }

            setPatientData(patient);
        }
    }, [data, id]);

    useEffect(() => {
        document.title = 'Create Patient';
    }, []);
    
    return (
        <section className="flex flex-col pb-1 w-full gap-4 px-5 h-full">
            <div className="flex flex-row gap-2 w-full bg-white rounded-lg p-4">
                <p className="font-bold">Dashboard</p>
                <Divider orientation="vertical"/>
                <CustomBreadcrumbs links={links} pageName={id ? "Update Patient" : "Create Patient"}/>
            </div>
            {id ? patientData ? <PatientForm patient={patientData}/> : <CircularProgress/> :
                <PatientForm patient={patientData}/>}
        </section>
    )
}

export default CreatePatient;