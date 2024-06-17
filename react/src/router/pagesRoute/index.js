import DoctorView from "../../components/doctor/DoctorView";
import CreateDoctor from "../../components/doctor/CreateDoctor";
import Appointments from "../../components/appointments/Appointments";
import CreateAppointment from "../../components/appointments/CreateAppointment";
import Dashboard from "../../components/dashboard/Dashboard";
import Setting from "../../components/setting/Setting";

export const doctorRoute = {
    path: "doctors/",
    element: <DoctorView/>,
    children: [
        {
            path: "doctors/create-doctor/:id",
            element: <CreateDoctor/>
        },
    ]
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

export const dashboardRout = {
    path: "",
    element: <Dashboard/>
}

export const settingsRoute = {
    path: "/settings",
    element: <Setting/>
}