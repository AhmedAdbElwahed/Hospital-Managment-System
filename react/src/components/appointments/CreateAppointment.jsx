import React, {useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import {useGetAllPatientsQuery, useSearchPatientByFullNameQuery} from "../../redux/features/patient/patientApiSlice";
import {CircularProgress, debounce} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {stringAvatar} from "../../util/additionalFunc";
import AppointmentForm from "./AppointmentForm";
import {useParams} from "react-router-dom";
import {useGetAvailableTimesQuery, useGetDoctorByIdQuery} from "../../redux/features/doctor/doctorApiSlice";
import CustomBreadcrumbs from "../shared/CustomBreadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserDoctor} from "@fortawesome/free-solid-svg-icons";

const links = [
    {path: "/", icon: <HomeIcon sx={{mr: 0.5}} fontSize="inherit"/>},
    {path: "/doctors", icon: <FontAwesomeIcon className="w-[15px] h-[15px] mr-[0.5px]" icon={faUserDoctor} />},
]

const CreateAppointment = () => {


    const {doctorId} = useParams();
    const [value, setValue] = React.useState(null);
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState([]);
    const {data: doctor} = useGetDoctorByIdQuery(doctorId);
    const {data: availableTimes} = useGetAvailableTimesQuery(doctorId);
    const {data, isLoading, isSuccess, error} = useSearchPatientByFullNameQuery(inputValue);

    console.log(data);

    useEffect(() => {
        let isActive = true;
        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }

        if (isActive) {
            setOptions([...data])
        }

        return () => {
            isActive = false;
        };

    }, [value, inputValue,]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    useEffect(() => {
        document.title = 'Book Appointment';
    }, []);


    return (
        <section className="flex flex-col pb-1 w-full gap-4 px-5 h-full">
            <div className="flex flex-row gap-2 w-full bg-white rounded-lg p-4">
                <p className="font-bold">Dashboard</p>
                <Divider orientation="vertical"/>
                <CustomBreadcrumbs links={links} pageName="Book Appointment"/>
            </div>
            <div>
                <Paper
                    component="div"
                    sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%"}}
                >
                    <IconButton type="button" sx={{p: '10px'}} aria-label="search">
                        <SearchIcon/>
                    </IconButton>

                    <Autocomplete
                        fullWidth
                        onOpen={() => {
                            setOpen(true);
                        }}
                        onClose={() => {
                            setOpen(false);
                        }}
                        options={options}
                        autoComplete
                        includeInputInList
                        filterSelectedOptions
                        value={value}
                        getOptionLabel={(option) =>
                            typeof option === 'string' ? option : option.requiredInfoDto.firstname
                        }
                        filterOptions={(x) => x}
                        onChange={(event, newValue) => {
                            setOptions(newValue ? [newValue, ...options] : options);
                            setValue(newValue);
                        }}
                        onInputChange={(event, newInputValue) => {
                            console.log(newInputValue);
                            setInputValue(newInputValue);
                        }}
                        noOptionsText="No Patients"
                        renderOption={(props, option) => {
                            return (
                                option.requiredInfoDto ? (
                                    <Box component="li"
                                         sx={{'& > img': {mr: 2, flexShrink: 0}}} {...props}>
                                        <Avatar
                                            className="w-[20px] mr-2"
                                            {...stringAvatar(
                                                `${option.requiredInfoDto.firstname} ${option.requiredInfoDto.lastname}`
                                            )} />
                                        {`${option.requiredInfoDto.firstname} ${option.requiredInfoDto.lastname}`}
                                    </Box>
                                ) : (
                                    <Box component="li"
                                         sx={{'& > img': {mr: 2, flexShrink: 0}}} {...props}>

                                        <Typography variant="subtitle1">No Patients</Typography>
                                    </Box>
                                )


                            )
                        }}
                        renderInput={(params) => (
                            <TextField
                                variant="standard"
                                placeholder="Search For Patients"
                                {...params}
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                }}
                            />
                        )}
                    />


                </Paper>
            </div>
            <div>
                <Paper
                    component="div"
                    className="px-[6px] py-[6px] flex flex-col justify-items-center w-full"
                >
                    <Typography variant="h6">Book appointment</Typography>
                    {doctor ? <AppointmentForm patient={value} doctor={doctor} startTimes={availableTimes}/> :
                        <CircularProgress/>}

                </Paper>
            </div>
        </section>
    );
};

export default CreateAppointment;