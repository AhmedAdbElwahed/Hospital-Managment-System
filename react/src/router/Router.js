import {  RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Login, Register } from '../auth/index';
import App from '../App';
import PrivateRoute from "./PrivateRoute";
import DashboardContainer from "../components/DashboardContainer";


export const Router = () => {



     const router = createBrowserRouter([
        {
            path: "/",
            element:  <PrivateRoute><App /></PrivateRoute>,
            children: [
                {
                    path: "",
                    element: <DashboardContainer />
                }
            ]
        },
        {
            path: "auth/login",
            element:  <Login />
        },
        {
            path: "auth/register",
            element:  <Register />
        }
    ]);

    return <RouterProvider router={router}></RouterProvider>
}
