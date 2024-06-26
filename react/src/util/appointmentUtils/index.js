import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Chip from "@mui/material/Chip";
import PendingIcon from '@mui/icons-material/Pending';
import moment from "moment";

export const appointmentsCols = [
    {field: 'id', headerName: 'ID', width: 70},
    { field: 'startTime', headerName: 'Start Time', width: 140, type: 'time' },
    { field: 'reasonForVisit', headerName: 'Reason for Visit', width: 200 },
    { field: 'doctorName', headerName: 'Doctor Name', width: 150 },
    { field: 'patientName', headerName: 'Patient Name', width: 150 },
    {
        field: 'createdAt', headerName: 'Booked Date', type: 'date',
        width: 150,
        valueFormatter: params =>
            moment(params?.value).format("DD/MM/YYYY"),
    },
    {field: 'appointmentStatus', headerName: 'Status', width: 150,
        renderCell: (params) => {
            switch (params?.value) {
                case 'COMPLETED':
                    return (
                        <Chip icon={ <CheckCircleIcon />} label={params?.value} color="success"/>
                    )
                case 'CANCELED':
                    return (
                        <Chip icon={ <CancelIcon />} label={params?.value} color="error"/>
                    )
                case 'PENDING':
                    return (
                        <Chip icon={ <PendingIcon />} label={params?.value} color="info"/>
                    )
            }
        }
    },
    { field: 'virtual', headerName: 'Virtual', width: 80,
        renderCell: (params) => (params?.value === true ?
            <CheckCircleIcon className="text-green-700"/> :
            <CancelIcon className="text-red-700"/>)
    },
];