import moment from "moment/moment";
import {Link} from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export const doctorCols  = [
    {field: 'id', headerName: 'ID', width: 70,

        renderCell: params => <Link className="text-blue-500" to={`/doctors/update-doctor/${params?.value}`} >{params?.value}</Link>},
    {field: 'firstname', headerName: 'First Name', width: 130},
    {field: 'lastname', headerName: 'Last Name', width: 130},
    {
        field: 'dob', headerName: 'Date of Birth', type: 'date', // Assuming you want to display the date portion
        width: 90,
        valueFormatter: params =>
            moment(params?.value).format("DD/MM/YYYY hh:mm A"),
    },
    {field: 'address', headerName: 'Address', width: 200}, // Adjust width as needed
    {field: 'phone', headerName: 'Phone Number', width: 120},
    {field: 'email', headerName: 'Email', width: 180},
    {field: 'gender', headerName: 'Gender', width: 100}, // Assuming you have a way to display gender values
    {
        field: 'is_enabled', headerName: 'Enabled', width: 80,
        renderCell: (params) => (params?.value === true ?
            <CheckCircleIcon className="text-green-700"/> :
            <CancelIcon className="text-red-700"/>)
    }, // Render a formatted value for boolean
    {field: 'education', headerName: 'Education', width: 150},
    {field: 'certifications', headerName: 'Certifications', width: 150},
    {field: 'experience', headerName: 'Experience', width: 150},
    {
        field: 'activeStatus', headerName: 'Active', width: 80,
        renderCell: (params) => (params?.value === true ?
            <CheckCircleIcon className="text-green-700"/> :
            <CancelIcon className="text-red-700"/>)
    }, // Render a formatted value for boolean
    {field: 'specialty', headerName: 'Specialty', width: 150},
    {field: 'licenseNumber', headerName: 'License Number', width: 150},
    {
        field: 'workStartTime', headerName: 'Work Start Time', type: 'time', // Assuming you want to display the time portion
        width: 120
    },
    {
        field: 'workEndTime', headerName: 'Work End Time', type: 'time', // Assuming you want to display the time portion
        width: 120
    },

];

export const mapDoctorToDoctorDto = (doctor) => {
    const doctorData = {
        "requiredInfoDto": {
            firstname: doctor.firstname,
            lastname: doctor.lastname,
            gender: doctor.gender,
            dob: doctor.dob,
            address: doctor.address,
            phone: doctor.phone,
            email: doctor.email,
            password: doctor.password,
            is_enabled: doctor.is_enabled,
        },
        "additionalInfoDto": {
            education: doctor.education,
            certifications: doctor.certifications,
            experience: doctor.experience,
            activeStatus: doctor.activeStatus,
            specialty: doctor.specialty,
            licenseNumber: doctor.licenseNumber,
        }
    }
    doctorData.additionalInfoDto['workStartTime'] = doctor.workStartTime ?
        moment(doctor.workStartTime.toString()).format("HH:mm:ss") : null;
    doctorData.additionalInfoDto['workEndTime'] = doctor.workEndTime ?
        moment(doctor.workEndTime.toString()).format("HH:mm:ss") : null;

    return doctorData;
}

export const mapDataToDoctors = (data) => {
    return data.map((doctor) => {
        return doctor ? {
            id: doctor.id,
            firstname: doctor.requiredInfoDto.firstname,
            lastname: doctor.requiredInfoDto.lastname,
            dob: doctor.requiredInfoDto.dob,
            address: doctor.requiredInfoDto.address,
            phone: doctor.requiredInfoDto.phone,
            email: doctor.requiredInfoDto.email,
            gender: doctor.requiredInfoDto.gender,
            is_enabled: doctor.requiredInfoDto.is_enabled,
            education: doctor.additionalInfoDto.education,
            certifications: doctor.additionalInfoDto.certifications,
            experience: doctor.additionalInfoDto.experience,
            activeStatus: doctor.additionalInfoDto.activeStatus,
            specialty: doctor.additionalInfoDto.specialty,
            licenseNumber: doctor.additionalInfoDto.licenseNumber,
            workStartTime: doctor.additionalInfoDto.workStartTime,
            workEndTime: doctor.additionalInfoDto.workEndTime,
        } : null;

    });
}