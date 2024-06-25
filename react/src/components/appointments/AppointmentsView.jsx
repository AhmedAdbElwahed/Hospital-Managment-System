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
        <div className="pt-6 pb-1 w-full gap-10 px-5 h-full flex flex-col">
            <h1 className="font-nunito-sans text-2xl font-bold ">Appointments</h1>
            <AppointmentsDataTable
                rows={rows} error={error}
                isLoading={isLoading} cols={cols}
            />
        </div>
    );
};

export default AppointmentsView;