import {CircularProgress} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useGetPatientByIdQuery} from "../../redux/features/patient/patientApiSlice";
import dayjs from "dayjs";
import {mapDataToPatients} from "../../util/patientUtils";
import PatientForm from "./PatientForm";
import {countries} from "../../constants/patientFormSelectChoices";

const CreatePatient = () => {
    const {id} = useParams();
    const {data} = useGetPatientByIdQuery(id);
    const [patientData, setPatientData] = useState(null);

    useEffect(() => {
        if (id) {

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
    
    return (
        <section className=" py-6 w-full gap-10 px-5 h-full flex flex-col ">
            <h1 className="font-nunito-sans text-2xl font-bold ">Add New patient</h1>
            {id ? patientData ? <PatientForm patient={patientData}/> : <CircularProgress/> :
                <PatientForm patient={patientData}/>}
        </section>
    )
}

export default CreatePatient;