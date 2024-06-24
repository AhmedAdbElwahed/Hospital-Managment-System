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


    return (
        <div className="flex flex-col gap-2">
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
        </div>
    );
};

export default CreateAppointment;