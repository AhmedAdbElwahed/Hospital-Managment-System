import React, {useEffect, useState} from 'react';
import AppointmentsDataTable from "./AppointmentsDataTable";
import {useDeleteDoctorMutation} from "../../redux/features/doctor/doctorApiSlice";
import {
    useChangeStatusMutation,
    useDeleteAppointmentByIdMutation,
    useGetAllAppointmentsQuery
} from "../../redux/features/appointment/appointmentApiSlice";
import {GridActionsCellItem} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {appointmentsCols} from "../../util/appointmentUtils";
import {mapDataToDoctors} from "../../util/doctorUtils";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import CustomBreadcrumbs from "../shared/CustomBreadcrumbs";
import Divider from "@mui/material/Divider";
import HomeIcon from "@mui/icons-material/Home";

const links = [
    {path: "/", icon: <HomeIcon sx={{mr: 0.5}} fontSize="inherit"/>},
]

const AppointmentsView = () => {

    const {data, error, isLoading} = useGetAllAppointmentsQuery();
    const [changeStatus] = useChangeStatusMutation();
    const [deleteAppointmentById] = useDeleteAppointmentByIdMutation();
    const [rows, setRows] = useState([]);
    const [cols, setCols] = useState([]);

    const handleDeleteClick = (id) => async () => {
        try {
            await deleteAppointmentById(id);
        } catch (error) {
            console.log(error);
        }
    }

    const handleCompleteClick = (id) => async () => {
        const status = {
            appointmentId: id,
            appointmentStatus: "COMPLETED",
        }
        try {
            await changeStatus(status);
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancelClick = (id) => async () => {
        const status = {
            appointmentId: id,
            appointmentStatus: "CANCELED",
        }
        try {
            await changeStatus(status);
        } catch (error) {
            console.log(error);
        }
    }

    const getRows = () => {
        setRows(data);
    }
    useEffect(() => {
        document.title = "Appointments";
        setCols(columns);
    }, []);



    useEffect(() => {
        if (data) {
            getRows();
        }
    }, [data]);

    const columns = appointmentsCols.concat([{
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        cellClassName: 'actions',
        getActions: ({id}) => (
            [
                <GridActionsCellItem
                    icon={<DeleteIcon/>}
                    label="Delete"
                    onClick={handleDeleteClick(id)}
                    color="inherit"
                />,
                <GridActionsCellItem
                    icon={<CheckCircleIcon className="text-green-700"/>}
                    label="Complete"
                    onClick={handleCompleteClick(id)}
                    color="inherit"
                />,
                <GridActionsCellItem
                    icon={<CancelIcon className="text-red-700"/>}
                    label="Cancel"
                    onClick={handleCancelClick(id)}
                    color="inherit"
                />,

            ]
        ),
    }]);
    return (
        <div className="flex flex-col pb-1 w-full gap-4 px-5 h-full">
            <div className="flex flex-row gap-2 w-full bg-white rounded-lg p-4">
                <p className="font-bold">Dashboard</p>
                <Divider orientation="vertical"/>
                <CustomBreadcrumbs links={links} pageName="Appointments"/>
            </div>
            <AppointmentsDataTable
                rows={rows} error={error}
                isLoading={isLoading} cols={cols}
            />
        </div>
    );
};

export default AppointmentsView;