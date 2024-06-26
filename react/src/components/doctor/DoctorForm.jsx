import {Tab, TabGroup, TabList, TabPanel, TabPanels} from "@headlessui/react";
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
import {DatePicker, LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import React, {useState} from "react";
import {useRegisterDoctorMutation, useUpdateDoctorMutation} from "../../redux/features/doctor/doctorApiSlice";
import {mapDoctorToDoctorDto} from "../../util/doctorUtils";
import dayjs from "dayjs";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
};


export const DoctorForm = ({doctor}) => {
    const [registerDoctor, response] = useRegisterDoctorMutation();
    const [updateDoctor, {isLoading}] = useUpdateDoctorMutation();
    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = React.useState(false);


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            console.log("error")
            return;
        }
        setOpen(false);
    };

    const {
        handleSubmit,
        control,
        formState: {errors}
    } = useForm({
        defaultValues: doctor,
    });

    const onUpdateSubmit = async (data) => {

        const doctorData = mapDoctorToDoctorDto(data);
        doctorData.requiredInfoDto.dob = dayjs(doctorData.requiredInfoDto.dob).format('YYYY-MM-DD');
        try {
            await updateDoctor({id: doctor.id, data: doctorData}).unwrap();
        } catch (error) {
            console.error('Registration error:', error);
        }
        setOpen(true);
    }

    const onRegisterSubmit = async (data) => {
        const doctorData = mapDoctorToDoctorDto(data);

        try {
            await registerDoctor(doctorData).unwrap();
        } catch (error) {
            console.error('Registration error:', error);
        }
        setOpen(true);
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    return (
        <>
            <form onSubmit={handleSubmit(
                doctor ? onUpdateSubmit : onRegisterSubmit
            )} className="space-y-6 p-4 bg-white rounded-lg shadow-md">
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
                                <div className="flex justify-center">
                                    <PersonIcon/>
                                    <p className="p-1">Personal Info</p>
                                </div>
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
                                <div className="flex justify-center">
                                    <BookmarkAddIcon/>
                                    <p className="p-1">Additional Info</p>
                                </div>
                            </Tab>
                        </TabList>
                        <TabPanels className="mt-2">
                            <TabPanel
                            >
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
                                        rules={doctor ? {} :
                                            {
                                                required: 'Password is required',
                                                minLength: {value: 6, message: 'Password must be at least 6 characters'}
                                            }
                                        }
                                        render={({field}) => (
                                            <FormControl sx={{width: '100%'}} variant="outlined">
                                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                                <OutlinedInput
                                                    {...field}
                                                    id="outlined-adornment-password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}
                                                                edge="end"
                                                            >
                                                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                    label="Password"
                                                />
                                                <FormHelperText>{errors.gender ? errors.gender.message : ''}</FormHelperText>
                                            </FormControl>
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
                                </div>

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

                {doctor ? (<Button type="submit" variant="contained" color="primary" className="w-full">
                    {response.isLoading ? <CircularProgress color='inherit'/> : "Update"}
                </Button>) : (
                    <Button type="submit" variant="contained" color="primary" className="w-full">
                        {isLoading ? <CircularProgress color='inherit'/> : "Submit"}
                    </Button>
                )}

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
    )
}