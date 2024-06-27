import * as React from "react";

import PatientDataTable from "./PatientDataTable";
import {useDeletePatientByIdMutation, useGetAllPatientsQuery} from "../../redux/features/patient/patientApiSlice";
import {mapDataToPatients, patientColumns} from "../../util/patientUtils";
import {useEffect, useState} from "react";
import {GridActionsCellItem} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import RateReviewIcon from '@mui/icons-material/RateReview';
import {useNavigate} from "react-router-dom";
import Divider from "@mui/material/Divider";
import CustomBreadcrumbs from "../shared/CustomBreadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';

const links = [
    {path: "/", icon: <HomeIcon sx={{mr: 0.5}} fontSize="inherit"/>},
]

export const PatientView = () => {

    const {data, error, isLoading} = useGetAllPatientsQuery();
    const [deletePatientById] = useDeletePatientByIdMutation();
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [cols, setCols] = useState([]);

    const handleDeleteClick = (id) => async () => {
        try {
            await deletePatientById(id);
            console.log("delete: ", id);
        } catch (error) {
            console.log(error);
        }
    }

    const handlePatientHistory = (id) => () => {
        navigate(`/patients/patient-history/${id}`);
    }

    const handlePrintPatient = (id) => () => {
        window.open(`/pdf/${id}`,'_blank');
    }

    const columns = patientColumns.concat([{
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
                color="error"
            />,
                <GridActionsCellItem
                    icon={<RateReviewIcon/>}
                    label="History"
                    onClick={handlePatientHistory(id)}
                    color="primary"
                />,
                <GridActionsCellItem
                    icon={<LocalPrintshopIcon/>}
                    label="Delete"
                    onClick={handlePrintPatient(id)}
                    color="success"
                />,
            ]
        ),
    }]);

    const getRows = () => {
        const newRows = mapDataToPatients(data);
        setRows(newRows);
    }
    useEffect(() => {
        setCols(columns);
    }, []);

    useEffect(() => {
        if (data) {
            getRows();
        }
    }, [data]);

    useEffect(() => {
        document.title = "Patients"
    }, [])


    return (
        <section className="flex flex-col pb-1 w-full gap-4 px-5 h-full">
            <div className="flex flex-row gap-2 w-full bg-white rounded-lg p-4">
                <p className="font-bold">Dashboard</p>
                <Divider orientation="vertical"/>
                <CustomBreadcrumbs links={links} pageName="Patients"/>
            </div>
            <PatientDataTable rows={rows} cols={cols} error={error} isLoading={isLoading}/>
        </section>
    )
}