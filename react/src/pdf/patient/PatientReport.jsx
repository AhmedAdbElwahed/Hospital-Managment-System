import React from 'react';
import {Document, Page, View} from "@react-pdf/renderer";
import ReportHeader from "./components/ReportHeader";
import ReportPatientData from "./components/ReportPatientData";
import {tw} from "../../util/additionalFunc";
import ReportPatientHistory from "./components/ReportPatientHistory";
import ReportFooter from "./components/ReportFooter";
import {useGetPatientHistoryByPatientIdQuery} from "../../redux/features/patientHistory/patientHistoryApiSlice";

const PatientReport = ({patient, patientHist}) => {

    console.log("patientHistory, ", patientHist && patientHist)

    return (
     <Document>
         <Page size="A4" style={tw("bg-[#f4f4f4]")}>
             <View style={tw("p-4")}>
                 <View style={tw("border p-4 h-full rounded-lg")}>
                     <View style={tw("flex flex-col gap-2 h-full bg-white")}>
                         <ReportHeader/>
                         <View style={tw("flex flex-col gap-2 h-full bg-white p-2")}>
                             <ReportPatientData patient={patient}/>
                             <ReportPatientHistory patientHist={patientHist}/>
                             <ReportFooter/>
                         </View>
                     </View>
                 </View>
             </View>
         </Page>
     </Document>
    );
};

export default PatientReport;