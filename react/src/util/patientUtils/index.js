import {Link} from "react-router-dom";

export const patientColumns = [
    {
        field: 'id', headerName: 'ID', width: 70,
        renderCell: params => <Link className="text-blue-500"
                                    to={`/patients/update-patient/${params?.value}`}>{params?.value}</Link>
    },
    {field: 'firstname', headerName: 'First Name', width: 150},
    {field: 'lastname', headerName: 'Last Name', width: 150},
    {field: 'gender', headerName: 'Gender', width: 100},
    {field: 'dob', headerName: 'Date of Birth', width: 150},
    {field: 'address', headerName: 'Address', width: 200},
    {field: 'phone', headerName: 'Phone', width: 120},
    {field: 'email', headerName: 'Email', width: 180},
    {field: 'is_enabled', headerName: 'Enabled', width: 100},
    {field: 'insurancePolicyNumber', headerName: 'Insurance Policy Number', width: 200},
    {field: 'bloodType', headerName: 'Blood Type', width: 100},
    {field: 'maritalStatus', headerName: 'Marital Status', width: 150},
    {field: 'nationality', headerName: 'Nationality', width: 150},
]

export const mapDataToPatients = (data) => {
    return data.map((patient) => {
        return patient ? {
            id: patient.id,
            firstname: patient.requiredInfoDto.firstname,
            lastname: patient.requiredInfoDto.lastname,
            dob: patient.requiredInfoDto.dob,
            address: patient.requiredInfoDto.address,
            phone: patient.requiredInfoDto.phone,
            email: patient.requiredInfoDto.email,
            gender: patient.requiredInfoDto.gender,
            is_enabled: patient.requiredInfoDto.is_enabled,
            education: patient.additionalInfoDto.insurancePolicyNumber,
            certifications: patient.additionalInfoDto.bloodType,
            experience: patient.additionalInfoDto.maritalStatus,
            activeStatus: patient.additionalInfoDto.nationality,
        } : null;

    });
}