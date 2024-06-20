import * as React from "react";

import PatientDataTable from "./PatientDataTable";
import {useGetAllPatientsQuery} from "../../redux/features/patient/patientApiSlice";
import {mapDataToPatients, patientColumns} from "../../util/patientUtils";
import {useEffect, useState} from "react";
import {GridActionsCellItem} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

export const PatientView = () => {

    const {data, error, isLoading} = useGetAllPatientsQuery();
    const [rows, setRows] = useState([]);
    const [cols, setCols] = useState([]);

    const handleDeleteClick = (id) => async () => {
        try {
            // await deleteDoctor(id);
            // TODO: add delete logic here
            console.log("delete: ", id);
        } catch (error) {
            console.log(error);
        }
    }

    const columns = patientColumns.concat([{
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


    return (
        <section className="pt-6 pb-1 w-full gap-10 px-5 h-full flex flex-col">
            <h1 className="font-nunito-sans text-2xl font-bold ">Patient</h1>
            <PatientDataTable rows={rows} cols={columns} error={error} isLoading={isLoading}/>
        </section>
    )
}