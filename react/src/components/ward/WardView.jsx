import React, {useEffect, useState} from 'react';
import HomeIcon from "@mui/icons-material/Home";
import Divider from "@mui/material/Divider";
import CustomBreadcrumbs from "../shared/CustomBreadcrumbs";
import WardDataTable from "./WardDataTable";
import {useNavigate} from "react-router-dom";
import {useDeleteWardByIdMutation, useGetAllWardQuery} from "../../redux/features/ward/wardApiSlice";
import {GridActionsCellItem} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {wardColumns} from "../../util/wardUtils";
import {mapDataToPatients} from "../../util/patientUtils";


const links = [
    {path: "/", icon: <HomeIcon sx={{mr: 0.5}} fontSize="inherit"/>},
]
const WardView = () => {

    const {data, error, isLoading} = useGetAllWardQuery();
    const [deleteWardById] = useDeleteWardByIdMutation();
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [cols, setCols] = useState([]);

    const handleDeleteClick = (id) => async () => {
        try {
            await deleteWardById(id);
            console.log("delete: ", id);
        } catch (error) {
            console.log(error);
        }
    }
    const getRows = () => {
        setRows(data);
    }
    useEffect(() => {
        document.title = "Wards"
        setCols(columns);
    }, []);

    useEffect(() => {
        if (data) {
            getRows();
        }
    }, [data]);


    const columns = wardColumns.concat([{
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
            ]
        ),
    }]);


    return (
        <section className="flex flex-col pb-1 w-full gap-4 px-5 h-full">
            <div className="flex flex-row gap-2 w-full bg-white rounded-lg p-4">
                <p className="font-bold">Dashboard</p>
                <Divider orientation="vertical"/>
                <CustomBreadcrumbs links={links} pageName="Wards"/>
            </div>
            <WardDataTable cols={cols} rows={rows} error={error} isLoading={isLoading}/>
        </section>
    );
};

export default WardView;