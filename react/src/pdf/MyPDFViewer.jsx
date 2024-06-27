import {PDFViewer} from "@react-pdf/renderer";
import PatientReport from "./patient/PatientReport";
import {useGetPatientByIdQuery} from "../redux/features/patient/patientApiSlice";
import {CircularProgress} from "@mui/material";
import {useGetPatientHistoryByPatientIdQuery} from "../redux/features/patientHistory/patientHistoryApiSlice";
import store from "../redux/store";
import {Provider} from "react-redux";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

function MyPDFViewer() {

    const {patientId} = useParams();
    const {data: patient} = useGetPatientByIdQuery(patientId);
    const [patientHist, setPatientHist] = useState(null);
    const [skip, setSkip] = useState(true);
    const [patientHisId, setPatientHisId] = useState(0);
    const {data: patientHistory} = useGetPatientHistoryByPatientIdQuery(patientHisId, {
        skip,
    });

    console.log("PatientHist: ", patientHist);
    console.log("PatientHist id: ", patient && patient.id);
    useEffect(() => {
        if (patient){
            setPatientHisId(patient.id)
            setSkip(false);
        }
    }, [patient]);

    useEffect(() => {
        if (patientHistory)
            setPatientHist(patientHistory);
    }, [patientHistory]);

    return (
        <div>
            {
                patient ? (
                        <PDFViewer className="h-screen w-screen">
                            <PatientReport patient={patient && patient} patientHist={patientHist && patientHist}/>
                        </PDFViewer>
                    ) :
                    (
                        <CircularProgress/>
                    )
            }

        </div>
    );
}

export default MyPDFViewer;
