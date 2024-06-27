import DoctorDataTable from "./DoctorDataTable";
import {useDeleteDoctorMutation, useGetAllDoctorsQuery} from "../../redux/features/doctor/doctorApiSlice";
import {useEffect, useState} from "react";
import {doctorCols, mapDataToDoctors} from "../../util/doctorUtils";
import {GridActionsCellItem} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import * as React from "react";
import {useNavigate} from "react-router-dom";
import {Clock1Icon} from "lucide-react";
import HomeIcon from "@mui/icons-material/Home";
import Divider from "@mui/material/Divider";
import CustomBreadcrumbs from "../shared/CustomBreadcrumbs";

const links = [
    {path: "/", icon: <HomeIcon sx={{mr: 0.5}} fontSize="inherit"/>},
]

const DoctorView = () => {

    const {data, error, isLoading} = useGetAllDoctorsQuery();
    const [deleteDoctor] = useDeleteDoctorMutation();
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [cols, setCols] = useState([]);

    const handleDeleteClick = (id) => async () => {
        try {
            await deleteDoctor(id);
        } catch (error) {
            console.log(error);
        }
    }

    const handleAppointment = (id) => () => {
        navigate(`/appointments/create-appointment/${id}`);
    }

    const columns = doctorCols.concat([{
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
            />,
                <GridActionsCellItem
                    icon={<Clock1Icon/>}
                    label="Delete"
                    onClick={handleAppointment(id)}
                    color="inherit"
                />
            ]
        ),
    }]);
    const getRows = () => {
        const newRows = mapDataToDoctors(data);
        setRows(newRows);
    }
    useEffect(() => {
        document.title = "Doctors";
        setCols(columns);
    }, []);


    useEffect(() => {
        if (data) {
            getRows();
        }
    }, [data]);


    return (
        <section className="flex flex-col pb-1 w-full gap-4 px-5 h-full">
            <div className="flex flex-row gap-2 w-full bg-white rounded-lg p-4">
                <p className="font-bold">Dashboard</p>
                <Divider orientation="vertical"/>
                <CustomBreadcrumbs links={links} pageName="Doctors"/>
            </div>
            <DoctorDataTable
                rows={rows} error={error}
                isLoading={isLoading} cols={cols}
            />


        </section>
    )
}

export default DoctorView;
