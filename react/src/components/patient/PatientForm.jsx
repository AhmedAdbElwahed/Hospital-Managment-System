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
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import React, {useState} from "react";
import dayjs from "dayjs";
import {useRegisterPatientMutation, useUpdatePatientMutation} from "../../redux/features/patient/patientApiSlice";
import {mapPatientToPatientDto} from "../../util/patientUtils";
import {bloodTypes, maritalStatus, nationalities} from "../../constants/formSelectChoices";

const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
};

const PatientForm = ({patient}) => {

    const [registerPatient, response] = useRegisterPatientMutation();
    const [updatePatient, {isLoading}] = useUpdatePatientMutation();
    const [open, setOpen] = useState(false);

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
        defaultValues: patient,
    });

    const onUpdateSubmit = async (data) => {

        const patientData = mapPatientToPatientDto(data);
        patientData.requiredInfoDto.dob = dayjs(patientData.requiredInfoDto.dob).format('YYYY-MM-DD');
        try {
            await updatePatient({id: patient.id, data: patientData}).unwrap();
        } catch (error) {
            console.error('Registration error:', error);
        }
        setOpen(true);
    }

    const onRegisterSubmit = async (data) => {
        const patientData = mapPatientToPatientDto(data);

        try {
            await registerPatient(patientData).unwrap();
        } catch (error) {
            console.error('Registration error:', error);
        }
        setOpen(true);
    };


    return (
        <>
            <form onSubmit={handleSubmit(
                patient ? onUpdateSubmit : onRegisterSubmit
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
                                            rules={{required: 'Lastname is required'}}
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
                                                    <Select {...field} label="Gender">
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
                                        rules={patient ? {} :
                                            {
                                                required: 'Password is required',
                                                minLength: {value: 6, message: 'Password must be at least 6 characters'}
                                            }
                                        }
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
                                </div>

                            </TabPanel>
                            <TabPanel
                                className="flex flex-col gap-3 bg-white p-3 rounded-lg shadow-md"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Controller
                                        name="insurancePolicyNumber"
                                        control={control}
                                        defaultValue=""
                                        render={({field}) => (
                                            <TextField
                                                {...field}
                                                label="Insurance Policy Number"
                                                variant="outlined"
                                                error={!!errors.insurancePolicyNumber}
                                                helperText={errors.insurancePolicyNumber ? errors.insurancePolicyNumber.message : ''}
                                                fullWidth
                                            />
                                        )}
                                    />

                                    <Controller
                                        name="bloodType"
                                        control={control}
                                        defaultValue=""
                                        render={({field}) => (
                                            <FormControl fullWidth error={!!errors.bloodType}>
                                                <InputLabel>Active Status</InputLabel>
                                                <Select {...field} label="Blood Type">
                                                    {
                                                        bloodTypes.map((type) => (
                                                            <MenuItem value={type}>{type.toLowerCase()}</MenuItem>
                                                        ))
                                                    }
                                                </Select>
                                                <FormHelperText>{errors.bloodType ? errors.bloodType.message : ''}</FormHelperText>
                                            </FormControl>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Controller
                                        name="maritalStatus"
                                        control={control}
                                        defaultValue=""
                                        render={({field}) => (
                                            <FormControl fullWidth error={!!errors.maritalStatus}>
                                                <InputLabel>Marital Status</InputLabel>
                                                <Select {...field} label="Marital Status">
                                                    {
                                                        maritalStatus.map((status) => (
                                                            <MenuItem value={status}>{status.toLowerCase()}</MenuItem>
                                                        ))
                                                    }
                                                </Select>
                                                <FormHelperText>{errors.maritalStatus ? errors.maritalStatus.message : ''}</FormHelperText>
                                            </FormControl>
                                        )}
                                    />
                                    <Controller
                                        name="nationality"
                                        control={control}
                                        defaultValue=""
                                        render={({field}) => (
                                            <FormControl fullWidth error={!!errors.nationality}>
                                                <InputLabel>Nationality</InputLabel>
                                                <Select {...field} label="Nationality">
                                                    {
                                                        nationalities.map((nationality) => (
                                                            <MenuItem
                                                                value={nationality}>{nationality.toLowerCase()}</MenuItem>
                                                        ))
                                                    }
                                                </Select>
                                                <FormHelperText>{errors.nationality ? errors.nationality.message : ''}</FormHelperText>
                                            </FormControl>
                                        )}
                                    />

                                </div>
                            </TabPanel>
                        </TabPanels>
                    </TabGroup>
                </div>

                {patient ? (<Button type="submit" variant="contained" color="primary" className="w-full">
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

export default PatientForm;