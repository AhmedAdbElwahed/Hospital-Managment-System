import DoctorDataTable from "./DoctorDataTable";
import {useDeleteDoctorMutation, useGetAllDoctorsQuery} from "../../redux/features/doctor/doctorApiSlice";
import {useEffect, useState} from "react";
import {doctorCols, mapDataToDoctors} from "../../util/doctorUtils";
import {GridActionsCellItem} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import * as React from "react";
import AccessTimeFilledIcon from "@mui/icons-material/RateReview";
import {useNavigate} from "react-router-dom";
import {Clock1Icon} from "lucide-react";

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
        setCols(columns);
    }, []);


    useEffect(() => {
        if (data) {
            getRows();
        }
    }, [data]);


    return (
        <section className="pt-6 pb-1 w-full gap-10 px-5 h-full flex flex-col">
            <h1 className="font-nunito-sans text-2xl font-bold " >Doctors</h1>
                <DoctorDataTable
                    rows={rows} error={error}
                    isLoading={isLoading} cols={cols}
                />


        </section>
    )
}

export default DoctorView;
