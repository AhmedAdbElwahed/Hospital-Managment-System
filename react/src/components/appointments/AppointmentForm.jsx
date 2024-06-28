import React, {useState} from 'react';
import Paper from "@mui/material/Paper";
import {Controller, useForm} from "react-hook-form";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {
    Alert,
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    Snackbar
} from "@mui/material";
import dayjs from "dayjs";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import {useCreateAppointmentMutation} from "../../redux/features/appointment/appointmentApiSlice";

const AppointmentForm = ({patient, doctor, startTimes = []}) => {
    const [createAppointment, response] = useCreateAppointmentMutation();
    const [open, setOpen] = useState(false);
    const {
        handleSubmit,
        control,
        formState: {errors}
    } = useForm();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            console.log("error")
            return;
        }
        setOpen(false);
    };


    const handleOnSubmit = async (data) => {

        const appointmentData = data;
        appointmentData['doctorId'] = doctor.id;
        try {
            await createAppointment({patientId: patient.id, data: appointmentData}).unwrap();
            setOpen(true);
        } catch (error) {
            console.error('Registration error:', error);
        }
    }
    return (
        <div className="space-y-6 p-1">
            <div className="flex flex-col gap-2 p-2 bg-white rounded-lg shadow-md">
                <Typography variant="subtitle1">Pateint Info</Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <TextField
                        InputProps={{
                            readOnly: true,
                        }}
                        value={patient ? patient.requiredInfoDto.firstname : ''}
                        placeholder="First Name"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        InputProps={{
                            readOnly: true,
                        }}
                        value={patient ? patient.requiredInfoDto.lastname : ''}
                        placeholder="Last Name"
                        variant="outlined"
                        fullWidth
                    />

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <TextField
                        InputProps={{
                            readOnly: true,
                        }}
                        value={patient ? patient.additionalInfoDto.nationality : ''}
                        placeholder="Nationality"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        InputProps={{
                            readOnly: true,
                        }}
                        value={patient ? dayjs().diff(dayjs(patient.requiredInfoDto.dob), "years") : ''}
                        placeholder="Age"
                        variant="outlined"
                        fullWidth
                    />

                </div>
            </div>

            <div className="flex flex-col gap-2 p-2 bg-white rounded-lg shadow-md">
                <Typography variant="subtitle1">Doctor Info</Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <TextField
                        InputProps={{
                            readOnly: true,
                        }}
                        placeholder="First Name"
                        value={doctor ? doctor.requiredInfoDto.firstname : ''}
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        InputProps={{
                            readOnly: true,
                        }}
                        placeholder="Last Name"
                        value={doctor ? doctor.requiredInfoDto.lastname : ''}
                        variant="outlined"
                        fullWidth
                    />

                </div>
                <TextField
                    InputProps={{
                        readOnly: true,
                    }}
                    placeholder="Specialty"
                    value={doctor ? doctor.additionalInfoDto.specialty : ''}
                    variant="outlined"
                    fullWidth
                />
            </div>


            <form onSubmit={handleSubmit(handleOnSubmit)} className="flex flex-col gap-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                    <Controller
                        name="startTime"
                        control={control}
                        defaultValue=""
                        rules={{required: 'Start Time is required'}}
                        render={({field}) => (
                            <FormControl fullWidth error={!!errors.gender}>
                                <InputLabel>Start Time</InputLabel>
                                <Select disabled={(startTimes.length === 0)} {...field} label="Gender">
                                    {
                                        startTimes.map((value) => (
                                            <MenuItem value={value}>{value}</MenuItem>
                                        ))
                                    }

                                </Select>
                                <FormHelperText>{errors.gender ? errors.gender.message : ''}</FormHelperText>
                            </FormControl>
                        )}
                    />

                    <FormControlLabel
                        control={
                            <Controller
                                name="virtual"
                                control={control}
                                defaultValue={false}
                                render={
                                    ({field}) =>
                                        <Checkbox
                                            {...field}
                                            checked={field.value}
                                            onChange={(event) => field.onChange(event.target.checked)}

                                        />
                                }
                            />
                        }
                        label="Want a virtual visit"
                    />
                </div>

                <Controller
                    name="reasonForVisit"
                    control={control}
                    defaultValue=""
                    rules={{required: 'Reason For Visit is required'}}
                    render={({field}) => (
                        <TextField
                            {...field}
                            label="Reason For Visit"
                            variant="outlined"
                            error={!!errors.lastname}
                            helperText={errors.lastname ? errors.lastname.message : ''}
                            fullWidth
                        />
                    )}
                />

                <Button type="submit" variant="contained" color="primary" className="w-full">
                    {response.isLoading ? <CircularProgress color='inherit'/> : "Submit"}
                </Button>

            </form>

            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={response.isError ? "error" : "success"}
                    variant="filled"
                    sx={{width: '100%'}}
                >
                    <span>{response.isError ? response.error.data.message : response.data}</span>
                </Alert>
            </Snackbar>

        </div>
    );
};

export default AppointmentForm;