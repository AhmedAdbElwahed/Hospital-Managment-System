import React, {useState} from 'react';
import {Controller, useForm} from "react-hook-form";
import {
    Alert,
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select, Snackbar,
    TextField
} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {useUpdateCurrentUserInfoMutation} from "../../redux/features/settings/settingsApiSlice";

const PersonalInfoForm = ({userInfo}) => {

    const [updateCurrentUserInfo, response] = useUpdateCurrentUserInfoMutation();
    const [open, setOpen] = useState(false);

    const {
        handleSubmit,
        control,
        formState: {errors}
    } = useForm({
        defaultValues: userInfo,
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            console.log("error")
            return;
        }
        setOpen(false);
    };


    const handleOnSubmit = async (data) => {
        try {
            await updateCurrentUserInfo(data).unwrap();
        } catch (error) {
            console.error('Registration error:', error);
        }
        setOpen(true);
    }
    return (
        <>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
                <div className="flex flex-col gap-3 bg-white p-3 h-full rounded-lg shadow-md">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Controller
                            name="firstname"
                            control={control}
                            defaultValue=""
                            rules={{required: 'First name is required'}}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    label="First Name"
                                    variant="outlined"
                                    error={!!errors.firstname}
                                    helperText={errors.firstname ? errors.firstname.message : ''}
                                    fullWidth
                                />
                            )}
                        />

                        <Controller
                            name="lastname"
                            control={control}
                            defaultValue=""
                            rules={{required: 'certifications is required'}}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    label="Last Name"
                                    variant="outlined"
                                    error={!!errors.lastname}
                                    helperText={errors.lastname ? errors.lastname.message : ''}
                                    fullWidth
                                />
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Controller
                            name="gender"
                            control={control}
                            defaultValue=""
                            rules={{required: 'Gender is required'}}
                            render={({field}) => (
                                <FormControl fullWidth error={!!errors.gender}>
                                    <InputLabel>Gender</InputLabel>
                                    <Select {...field} label="activeStatus">
                                        <MenuItem value="MALE">Male</MenuItem>
                                        <MenuItem value="FEMALE">Female</MenuItem>
                                    </Select>
                                    <FormHelperText>{errors.gender ? errors.gender.message : ''}</FormHelperText>
                                </FormControl>
                            )}
                        />

                        <Controller
                            name="dob"
                            control={control}
                            defaultValue={null}
                            rules={{required: 'Date of birth is required'}}
                            render={({field}) => (
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        {...field}
                                        label="Date of Birth"
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                error={!!errors.dob}
                                                helperText={errors.dob ? errors.dob.message : ''}
                                                fullWidth
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            )}
                        />
                    </div>

                    <Controller
                        name="address"
                        control={control}
                        defaultValue=""
                        rules={{required: 'Address is required'}}
                        render={({field}) => (
                            <TextField
                                {...field}
                                label="Address"
                                variant="outlined"
                                error={!!errors.address}
                                helperText={errors.address ? errors.address.message : ''}
                                fullWidth
                            />
                        )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Controller
                            name="phone"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: 'Phone is required',
                                pattern: {
                                    value: /^01[0-2][0-9]{8}$/,
                                    message: 'Invalid phone number'
                                }
                            }}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    label="Phone"
                                    variant="outlined"
                                    error={!!errors.phone}
                                    helperText={errors.phone ? errors.phone.message : ''}
                                    fullWidth
                                />
                            )}
                        />

                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: 'Email is required',
                                pattern: {
                                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                    message: 'Invalid email licenseNumber'
                                }
                            }}
                            render={({field}) => (
                                <TextField
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    {...field}
                                    label="Email"
                                    variant="outlined"
                                    error={!!errors.email}
                                    helperText={errors.email ? errors.email.message : ''}
                                    fullWidth
                                />
                            )}
                        />
                    </div>
                    <Button type="submit" variant="contained" color="primary" className="w-full">
                        {response.isLoading ? <CircularProgress color='inherit'/> : "Save"}
                    </Button>
                </div>
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
        </>
    );
};

export default PersonalInfoForm;