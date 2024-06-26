import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import {Login, Register} from '../auth/index';
import PrivateRoute from "./PrivateRoute";
import {Error404} from "../exception/Error404";
import {
    appointmentsRoute, createAppointmentRout,
    createDoctorRoute,
    createPatientRoute,
    dashboardRout,
    doctorRoute,
    patientHistoryRout,
    patientRoute,
    settingsRoute,
    updateDoctorRoute,
    updatePatientRout
} from "./pagesRoute";
import Layout from "../layout/Layout";


export const Router = () => {


    const router = createBrowserRouter([
        {
            path: "/",
            element: <PrivateRoute><Layout/></PrivateRoute>,
            children: [
                doctorRoute,
                patientRoute,
                appointmentsRoute,
                dashboardRout,
                settingsRoute,
                createDoctorRoute,
                createPatientRoute,
                updateDoctorRoute,
                updatePatientRout,
                patientHistoryRout,
                createAppointmentRout,
            ]
        },
        {
            path: "auth/login",
            element: <Login/>
        },
        {
            path: "auth/register",
            element: <Register/>
        },
        {
            path: "*",
            element: <Error404/>
        }
    ]);

    return <RouterProvider router={router}></RouterProvider>
}
