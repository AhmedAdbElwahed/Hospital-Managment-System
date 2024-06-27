import React, {useEffect, useState} from 'react';
import PatientHistoryForm from "./PatientHistoryForm";
import Chip from "@mui/material/Chip";
import {useGetPatientByIdQuery} from "../../redux/features/patient/patientApiSlice";
import {useParams} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import {useGetPatientHistoryByPatientIdQuery} from "../../redux/features/patientHistory/patientHistoryApiSlice";
import {mapPatientHistDtoToPatientHist} from "../../util/patientHistory";
import HomeIcon from "@mui/icons-material/Home";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHospitalUser} from "@fortawesome/free-solid-svg-icons";
import Divider from "@mui/material/Divider";
import CustomBreadcrumbs from "../shared/CustomBreadcrumbs";
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import FlagIcon from '@mui/icons-material/Flag';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import {stringAvatar} from "../../util/additionalFunc";
import dayjs from "dayjs";
import Box from "@mui/material/Box";

const links = [
    {path: "/", icon: <HomeIcon sx={{mr: 0.5}} fontSize="inherit"/>},
    {path: "/patients", icon: <FontAwesomeIcon className="w-[15px] h-[15px] mr-[0.5px]" icon={faHospitalUser}/>},
]
const PatientHistoryView = () => {
    const {patientId} = useParams();
    const {data: patient, error: patientError, isLoading: patientLoading} =
        useGetPatientByIdQuery(patientId);
    const {data: patientHistory, error: patientHistoryError, isLoading: patientHistLoading} =
        useGetPatientHistoryByPatientIdQuery(patientId);
    const [patientHist, setPatientHist] = useState(null);

    const srtAvatar = stringAvatar(
        `${patient && patient.requiredInfoDto.firstname} ${patient && patient.requiredInfoDto.lastname}`
    );

    useEffect(() => {
        if (patientId) {
            if (patientHistory) {
                const ph = mapPatientHistDtoToPatientHist(patientHistory);
                setPatientHist(ph);
            }
        }
    }, [patientHistory, patientId]);

    useEffect(() => {
        document.title = 'Patient History';
    }, []);
    return (
        <section className="flex flex-col pb-1 w-full gap-4 px-5 h-full">
            <div className="flex flex-row gap-2 w-full bg-white rounded-lg p-4">
                <p className="font-bold">Dashboard</p>
                <Divider orientation="vertical"/>
                <CustomBreadcrumbs links={links} pageName="Patient History"/>
            </div>
            <div className="flex p-2 bg-white rounded-lg shadow-md mb-2 gap-1 max-sm:flex-col">
                {
                    !patientLoading ? (
                            <div className="flex gap-4 w-full">
                                <Box sx={srtAvatar.sx} className="p-10 rounded-lg">
                                    <h1 className="font-bold text-white">{srtAvatar && srtAvatar.children}</h1>
                                </Box>
                                <div className="flex flex-col gap-4 w-full">
                                    <p className="font-bold text-xl">
                                        {`${patient && patient.requiredInfoDto.firstname} ${patient && patient.requiredInfoDto.lastname}`}
                                    </p>
                                    <div className="flex gap-1">
                                        <PersonIcon/>
                                        <p className="text-sm font-light">
                                            {patient && dayjs().diff(dayjs(patient.requiredInfoDto.dob), "years")} years,
                                            {patient && patient.requiredInfoDto.gender.toLowerCase()}
                                        </p>
                                    </div>
                                    <div className="flex gap-1">
                                        <HomeIcon/>
                                        <p className="text-sm font-light p-0.5">
                                            {patient && patient.requiredInfoDto.address}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4 w-full">
                                    <div className="flex gap-1">
                                        <EmailIcon/>
                                        <p className="text-sm font-light p-0.5">
                                            {patient && patient.requiredInfoDto.email}
                                        </p>
                                    </div>
                                    <div className="flex gap-1">
                                        <LocalPhoneIcon/>
                                        <p className="text-sm font-light p-0.5">
                                            {patient && patient.requiredInfoDto.phone}
                                        </p>
                                    </div>
                                    <div className="flex gap-1">
                                        <FlagIcon/>
                                        <p className="text-sm font-light p-0.5">
                                            {patient && patient.additionalInfoDto.nationality}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        ) :
                        (
                            <CircularProgress/>
                        )
                }
            </div>
            {
                patientHistoryError ?
                    <PatientHistoryForm patientId={patientId}/>
                    :
                    patientHist ?
                        <PatientHistoryForm patientHist={patientHist} patientId={patientId}/>
                        : <CircularProgress/>
            }
        </section>
    )
};

export default PatientHistoryView;