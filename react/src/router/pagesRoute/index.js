import DoctorView from "../../components/doctor/DoctorView";
import CreateDoctor from "../../components/doctor/CreateDoctor";
import Dashboard from "../../components/dashboard/Dashboard";
import Setting from "../../components/settings/Setting";
import {PatientView} from "../../components/patient/PatientView";
import CreatePatient from "../../components/patient/CreatePatient";
import PatientHistoryView from "../../components/patienthistory/PatientHistoryView";
import AppointmentsView from "../../components/appointments/AppointmentsView";
import CreateAppointment from "../../components/appointments/CreateAppointment";
import MyPDFViewer from "../../pdf/MyPDFViewer";
import AdmissionView from "../../components/admission/AdmissionView";
import ExaminationView from "../../components/examination/ExaminationView";
import WardView from "../../components/ward/WardView";
import CreateWard from "../../components/ward/CreateWard";
import CreateExamination from "../../components/examination/CreateExamination";

export const doctorRoute = {
    path: "doctors/",
    element: <DoctorView/>,
}

export const patientRoute = {
    path: "patients/",
    element: <PatientView/>,
}

export const createPatientRoute = {
    path: "patients/create-patient/",
    element: <CreatePatient/>
}

export const updatePatientRout = {
    path: "patients/update-patient/:id",
    element: <CreatePatient/>
}

export const createDoctorRoute = {
    path: "doctors/create-doctor/",
    element: <CreateDoctor/>
}

export const updateDoctorRoute = {
    path: "doctors/update-doctor/:id",
    element: <CreateDoctor/>
}

export const appointmentsRoute = {
    path: "appointments/",
    element: <AppointmentsView/>,
}

export const createAppointmentRout = {
    path: "appointments/create-appointment/:doctorId",
    element: <CreateAppointment/>
}

export const patientHistoryRout = {
    path: "/patients/patient-history/:patientId?",
    element: <PatientHistoryView/>
}

export const dashboardRout = {
    path: "",
    element: <Dashboard/>
}

export const settingsRoute = {
    path: "/settings",
    element: <Setting/>
}

export const pdfRoute = {
    path: "/pdf/:patientId",
    element: <MyPDFViewer/>
}

export const admissionRout = {
    path: "/admission",
    element: <AdmissionView/>
}

export const examinationRoute = {
    path: "/examination",
    element: <ExaminationView/>
}

export const wardsRout = {
    path: "/wards",
    element: <WardView/>
}
export const createWardRout = {
    path: "/wards/create-ward",
    element: <CreateWard/>
}

export const updateWardRout = {
    path: "/wards/update-ward/:wardId",
    element: <CreateWard/>
}

export const createExaminationRout = {
    path: "/examination/create-exam/:patientId",
    element: <CreateExamination/>
}



