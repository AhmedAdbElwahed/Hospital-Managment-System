import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export const appointmentsCols = [
    {field: 'id', headerName: 'ID', width: 70},
    { field: 'startTime', headerName: 'Start Time', width: 140, type: 'time' },
    { field: 'reasonForVisit', headerName: 'Reason for Visit', width: 200 },
    { field: 'doctorName', headerName: 'Doctor Name', width: 150 },
    { field: 'patientName', headerName: 'Patient Name', width: 150 },
    { field: 'virtual', headerName: 'Virtual', width: 80,
        renderCell: (params) => (params?.value === true ?
            <CheckCircleIcon className="text-green-700"/> :
            <CancelIcon className="text-red-700"/>)},
];