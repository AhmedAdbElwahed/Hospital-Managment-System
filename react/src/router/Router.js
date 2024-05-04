import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Login, Register } from '../Auth/index';
import App from '../App';
import { useAuth } from '../context/AuthContext';


export const Router = () => {

    const {accessToken} = useAuth();

     const router = createBrowserRouter([
        {
            path: "/",
            element: accessToken != null | undefined ? <App /> : <Navigate to="/auth/login" />
        },
        {
            path: "auth/login",
            element: accessToken == null | undefined ? <Login /> : <Navigate to="/" />,
        },
        {
            path: "auth/register",
            element: accessToken == null | undefined ? <Register /> : <Navigate to="/" />
        }
    ]);

    return <RouterProvider router={router}></RouterProvider>
}
