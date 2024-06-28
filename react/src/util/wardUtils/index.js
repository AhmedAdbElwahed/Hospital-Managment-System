import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import {Link} from "react-router-dom";

export const wardColumns = [
    { field: 'id', headerName: 'ID', width: 70,
        renderCell: params => <Link className="text-blue-500"
                                    to={`/wards/update-ward/${params?.value}`}>{params?.value}</Link>},
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'numOfBeds', headerName: 'Number of Beds', width: 120 },
    { field: 'numOfNurses', headerName: 'Number of Nurses', width: 150 },
    {
        field: 'isMale',
        headerName: 'Male Ward',
        width: 90,
        renderCell: (params) => (params?.value === true ?
            <CheckCircleIcon className="text-green-700"/> :
            <CancelIcon className="text-red-700"/>)
    },
    {
        field: 'isFemale',
        headerName: 'Female Ward',
        width: 100,
        renderCell: (params) => (params?.value === true ?
            <CheckCircleIcon className="text-green-700"/> :
            <CancelIcon className="text-red-700"/>)
    },
    {
        field: 'isLock',
        headerName: 'Locked',
        width: 70,
        renderCell: (params) => (params?.value === true ?
            <CheckCircleIcon className="text-green-700"/> :
            <CancelIcon className="text-red-700"/>)
    },
    {
        field: 'isActive',
        headerName: 'Active',
        width: 70,
        renderCell: (params) => (params?.value === true ?
            <CheckCircleIcon className="text-green-700"/> :
            <CancelIcon className="text-red-700"/>)
    },
    { field: 'numberOfPatients', headerName: 'Number of Patients', width: 150 },
]