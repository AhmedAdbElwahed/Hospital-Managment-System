import DoctorTableHeader from "./DoctorTableHeader";
import DoctorDataTable from "./DoctorDataTable";
import {useDeleteDoctorMutation, useGetAllDoctorsQuery} from "../../redux/features/doctor/doctorApiSlice";
import {useEffect, useState} from "react";
import {doctorCols, mapDataToDoctors} from "../../util/doctorUtils";
import {GridActionsCellItem} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import * as React from "react";
import {Outlet} from "react-router-dom";

const DoctorView = () => {

    const {data, error, isLoading} = useGetAllDoctorsQuery();
    const [deleteDoctor] = useDeleteDoctorMutation();
    const [rows, setRows] = useState([]);
    const [cols, setCols] = useState([]);

    const handleDeleteClick = (id) => async () => {
        try {
            await deleteDoctor(id);
        } catch (error) {
            console.log(error);
        }
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
            />]
        ),
    }]);
    const getRows = () => {
        const newRows = mapDataToDoctors(data);
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


    return (
        <section className=" py-6 w-full gap-10 px-5 h-full flex flex-col ">
            <h1 className="font-nunito-sans text-2xl font-bold ">Doctors</h1>
            <DoctorDataTable
                rows={rows} error={error}
                isLoading={isLoading} cols={cols}
            />
        </section>
    )
}

export default DoctorView;
