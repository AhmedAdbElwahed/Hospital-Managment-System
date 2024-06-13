import React, {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {
    TextField,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    FormHelperText, Snackbar, Alert, CircularProgress
} from '@mui/material';
import {LocalizationProvider, TimePicker} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {DatePicker} from '@mui/x-date-pickers'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {registerDoctor} from "../../redux/features/doctor/doctorActions";
import {TabGroup, TabList, TabPanel, TabPanels, Tab} from "@headlessui/react";
import {sleep} from "../../util/additionalFunc";
import moment from "moment";


const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
};

const CreateDoctor = () => {
    const {
        handleSubmit,
        control,
        formState: {errors}
    } = useForm();

    const dispatch = useDispatch();
    const {loading, error} = useSelector(state => state.doctor);
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);


    const onSubmit = async (data) => {
        const doctorData = {
            firstname: data.firstname,
            lastname: data.lastname,
            gender: data.gender,
            dob: data.dob,
            address: data.address,
            phone: data.phone,
            email: data.email,
            password: data.password,
            is_enabled: data.is_enabled,
            education: data.education,
            certifications: data.certifications,
            experience: data.experience,
            activeStatus: data.activeStatus,
            specialty: data.specialty,
            licenseNumber: data.licenseNumber,
        }
        if (data.workStartTime) {
            doctorData['workStartTime'] = moment(data.workStartTime.toString()).format("HH:mm:ss");
        } else {
            doctorData['workStartTime'] = null;
        }
        if (data.workEndTime) {
            doctorData['workEndTime'] = moment(data.workEndTime.toString()).format("HH:mm:ss");
        } else {
            doctorData['workEndTime'] = null;
        }

        dispatch(registerDoctor(doctorData));
        await sleep(2000);
        setOpen(true);
        console.log(error);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            console.log("error")
            return;
        }
        console.log(open)
        setOpen(false);
    };

    return (
        <section className=" py-6 w-full gap-10 px-5 h-full flex flex-col ">
            <h1 className="font-nunito-sans text-2xl font-bold ">Add New Doctor</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4 bg-white rounded-lg shadow-md">
                <div>
                    <TabGroup>
                        <TabList className="flex p-1 space-x-1 bg-blue-light rounded-lg">
                            <Tab
                                className={({selected}) =>
                                    classNames(
                                        'w-full py-2.5 text-sm leading-5 font-medium text-blue-light rounded-lg',
                                        'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-light ring-white ring-opacity-60',
                                        selected
                                            ? 'bg-white shadow text-blue'
                                            : 'text-gray-light hover:bg-white/[0.12] hover:text-blue-light'
                                    )
                                }
                            >
                                Personal Info
                            </Tab>
                            <Tab
                                className={({selected}) =>
                                    classNames(
                                        'w-full py-2.5 text-sm leading-5 font-medium text-blue-light rounded-lg',
                                        'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-light ring-white ring-opacity-60',
                                        selected
                                            ? 'bg-white shadow text-blue'
                                            : 'text-gray-light hover:bg-white/[0.12] hover:text-blue-light'
                                    )
                                }
                            >
                                Additional Info
                            </Tab>
                        </TabList>
                        <TabPanels className="mt-2">
                            <TabPanel
                                className="flex flex-col gap-3 bg-white p-3 h-full rounded-lg shadow-md"
                            >
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
                                            pattern: {value: /^01[0-2][0-9]{8}$/, message: 'Invalid phone number'}
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

                                <Controller
                                    name="password"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: 'Password is required',
                                        minLength: {value: 6, message: 'Password must be at least 6 characters'}
                                    }}
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            label="Password"
                                            type="password"
                                            variant="outlined"
                                            error={!!errors.password}
                                            helperText={errors.password ? errors.password.message : ''}
                                            fullWidth
                                        />
                                    )}
                                />

                                <Controller
                                    name="is_enabled"
                                    control={control}
                                    defaultValue={false}
                                    render={({field}) => (
                                        <FormControl fullWidth>
                                            <InputLabel>Is Enabled</InputLabel>
                                            <Select {...field} label="Is Enabled">
                                                <MenuItem value={true}>Yes</MenuItem>
                                                <MenuItem value={false}>No</MenuItem>
                                            </Select>
                                        </FormControl>
                                    )}
                                />
                            </TabPanel>
                            <TabPanel
                                className="flex flex-col gap-3 bg-white p-3 rounded-lg shadow-md"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Controller
                                        name="education"
                                        control={control}
                                        defaultValue=""
                                        render={({field}) => (
                                            <TextField
                                                {...field}
                                                label="Education"
                                                variant="outlined"
                                                error={!!errors.education}
                                                helperText={errors.education ? errors.education.message : ''}
                                                fullWidth
                                            />
                                        )}
                                    />

                                    <Controller
                                        name="certifications"
                                        control={control}
                                        defaultValue=""
                                        render={({field}) => (
                                            <TextField
                                                {...field}
                                                label="Certifications"
                                                variant="outlined"
                                                error={!!errors.certifications}
                                                helperText={errors.certifications ? errors.certifications.message : ''}
                                                fullWidth
                                            />
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Controller
                                        name="experience"
                                        control={control}
                                        defaultValue=""
                                        render={({field}) => (
                                            <TextField
                                                {...field}
                                                label="Experience"
                                                variant="outlined"
                                                error={!!errors.experience}
                                                helperText={errors.experience ? errors.experience.message : ''}
                                                fullWidth
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="specialty"
                                        control={control}
                                        defaultValue=""
                                        render={({field}) => (
                                            <TextField
                                                {...field}
                                                label="Specialty"
                                                variant="outlined"
                                                error={!!errors.specialty}
                                                helperText={errors.specialty ? errors.specialty.message : ''}
                                                fullWidth
                                            />
                                        )}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Controller
                                        name="workStartTime"
                                        control={control}
                                        defaultValue={null}
                                        render={({field}) => (
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <TimePicker
                                                    {...field}
                                                    label="Work Start Time"
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            error={!!errors.workStartTime}
                                                            helperText={errors.workStartTime ? errors.workStartTime.message : ''}
                                                            fullWidth
                                                        />
                                                    )}
                                                />
                                            </LocalizationProvider>
                                        )}
                                    />
                                    <Controller
                                        name="workEndTime"
                                        control={control}
                                        defaultValue={null}
                                        render={({field}) => (
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <TimePicker
                                                    {...field}
                                                    label="Work End Time"
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            error={!!errors.workEndTime}
                                                            helperText={errors.workEndTime ? errors.workEndTime.message : ''}
                                                            fullWidth
                                                        />
                                                    )}
                                                />
                                            </LocalizationProvider>
                                        )}
                                    />
                                </div>

                                <Controller
                                    name="licenseNumber"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            label="licenseNumber"
                                            variant="outlined"
                                            error={!!errors.licenseNumber}
                                            helperText={errors.licenseNumber ? errors.licenseNumber.message : ''}
                                            fullWidth
                                        />
                                    )}
                                />
                                <Controller
                                    name="activeStatus"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => (
                                        <FormControl fullWidth error={!!errors.activeStatus}>
                                            <InputLabel>Active Status</InputLabel>
                                            <Select {...field} label="activeStatus">
                                                <MenuItem value={true}>Yes</MenuItem>
                                                <MenuItem value={false}>No</MenuItem>
                                            </Select>
                                            <FormHelperText>{errors.activeStatus ? errors.activeStatus.message : ''}</FormHelperText>
                                        </FormControl>
                                    )}
                                />
                            </TabPanel>
                        </TabPanels>
                    </TabGroup>
                </div>


                <Button type="submit" variant="contained" color="primary" className="w-full">
                    {loading ? <CircularProgress color='inherit'/> : "Submit"}
                </Button>
            </form>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={error ? "error" : "success"}
                    variant="filled"
                    sx={{width: '100%'}}
                >
                    <span>{error ? error : "New Doctor Added Successfully"}</span>
                </Alert>
            </Snackbar>
        </section>
    );
}

export default CreateDoctor;
