import React, {useEffect, useState} from 'react';
import PatientHistoryForm from "./PatientHistoryForm";
import Chip from "@mui/material/Chip";
import {useGetPatientByIdQuery} from "../../redux/features/patient/patientApiSlice";
import {useParams} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import {useGetPatientHistoryByPatientIdQuery} from "../../redux/features/patientHistory/patientHistoryApiSlice";
import {mapPatientHistDtoToPatientHist} from "../../util/patientHistory";

const PatientHistoryView = () => {
    const {patientId} = useParams();
    const {data: patient, error: patientError, isLoading: patientLoading} =
        useGetPatientByIdQuery(patientId);
    const {data: patientHistory, error: patientHistoryError, isLoading: patientHistLoading} =
        useGetPatientHistoryByPatientIdQuery(patientId);
    const [patientHist, setPatientHist] = useState(null);
    console.log(patientHist);

    useEffect(() => {
        if (patientId) {
            if (patientHistory) {
              const ph =   mapPatientHistDtoToPatientHist(patientHistory);
              setPatientHist(ph);
            }
        }
    }, [patientHistory, patientId]);
    return (
        <div>

            <div className="flex p-2 bg-white rounded-lg shadow-md mb-2 gap-1 max-sm:flex-col">
                {
                    !patientLoading ? (
                            <>
                                <div className="w-full">
                                    <Chip className="w-full"
                                          color="primary"
                                          variant="outlined"
                                          label={`ID: ${patientId}`}
                                    />
                                </div>
                                <div className="w-full">
                                    <Chip className="w-full"
                                          color="primary"
                                          variant="outlined"
                                          label={`Fristname: ${patient && patient.requiredInfoDto.firstname}`}
                                    />
                                </div>
                                <div className="w-full">
                                    <Chip className="w-full"
                                          color="primary"
                                          variant="outlined"
                                          label={`Lastname: ${patient && patient.requiredInfoDto.lastname}`}
                                    />
                                </div>
                            </>
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
        </div>
    )
};

export default PatientHistoryView;