import DoctorView from "../../components/doctor/DoctorView";
import CreateDoctor from "../../components/doctor/CreateDoctor";
import Appointments from "../../components/appointments/Appointments";
import CreateAppointment from "../../components/appointments/CreateAppointment";
import Dashboard from "../../components/dashboard/Dashboard";
import Setting from "../../components/setting/Setting";
import {PatientView} from "../../components/patient/PatientView";
import CreatePatient from "../../components/patient/CreatePatient";
import PatientHistoryView from "../../components/patienthistory/PatientHistoryView";

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
    element: <Appointments/>,
    children: [
        {
            path: "create-doctor/",
            element: <CreateAppointment/>
        }
    ]

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