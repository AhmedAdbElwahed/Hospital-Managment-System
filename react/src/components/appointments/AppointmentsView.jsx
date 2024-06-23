import React, {useEffect, useState} from 'react';
import AppointmentsDataTable from "./AppointmentsDataTable";
import {useDeleteDoctorMutation} from "../../redux/features/doctor/doctorApiSlice";
import {
    useDeleteAppointmentByIdMutation,
    useGetAllAppointmentsQuery
} from "../../redux/features/appointment/appointmentApiSlice";
import {GridActionsCellItem} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {appointmentsCols} from "../../util/appointmentUtils";
import {mapDataToDoctors} from "../../util/doctorUtils";

const AppointmentsView = () => {

    const {data, error, isLoading} = useGetAllAppointmentsQuery();
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
            [<GridActionsCellItem
                icon={<DeleteIcon/>}
                label="Delete"
                onClick={handleDeleteClick(id)}
                color="inherit"
            />]
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