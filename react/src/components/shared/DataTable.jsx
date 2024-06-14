import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {useGetAllDoctorsQuery} from "../../redux/features/doctor/doctorApiSlice";
import {CircularProgress} from "@mui/material";
import moment from "moment";
import {useEffect, useState} from "react";

const columns = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'firstName', headerName: 'First Name', width: 130},
    {field: 'lastName', headerName: 'Last Name', width: 130},
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
        renderCell: (params) => params.row.is_enabled ? 'Yes' : 'No'
    }, // Render a formatted value for boolean
    {field: 'education', headerName: 'Education', width: 150},
    {field: 'certifications', headerName: 'Certifications', width: 150},
    {field: 'experience', headerName: 'Experience', width: 150},
    {
        field: 'activeStatus', headerName: 'Active', width: 80,
        renderCell: (params) => params.row.activeStatus ? 'Yes' : 'No'
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


const DataTable = () => {

    const {data, error, isLoading} = useGetAllDoctorsQuery();
    const [rows, setRows] = useState([]);
    console.log("rows", rows);
    useEffect(() => {
        if (data) {
            const newRows = data.map((doctor) => {
                console.log(doctor);
                return {
                    id: doctor.id,
                    firstName: doctor.requiredInfoDto.firstname,
                    lastName: doctor.requiredInfoDto.lastname,
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
                }

            });
            setRows(newRows);
        }
    }, [data]);


    return (
        <div style={{height: 400, width: '100%'}}>
            {
                !error ? (
                    isLoading ? (
                        <CircularProgress/>
                    ) : (
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {page: 0, pageSize: 5},
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                            checkboxSelection
                        />)

                ) : (
                    <h1>Can not fetch Doctors</h1>
                )
            }

        </div>
    );
}

export default DataTable;