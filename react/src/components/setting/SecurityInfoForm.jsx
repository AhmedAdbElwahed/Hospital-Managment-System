import React, {useState} from 'react';
import {Controller, useForm} from "react-hook-form";
import {
    Alert,
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    InputLabel,
    Snackbar,
    TextField
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useUpdateCurrentUserPasswordMutation} from "../../redux/features/settings/settingsApiSlice";

const SecurityInfoForm = ({userEmail}) => {

    const [updateCurrentUserPassword, response] = useUpdateCurrentUserPasswordMutation();
    const [showOldPassword, setShowOldPassword] = React.useState(false);
    const [showNewPassword, setShowNewPassword] = React.useState(false);
    const [showConfirmedPassword, setShowConfirmedPassword] = React.useState(false);
    const [open, setOpen] = useState(false);

    const {
        handleSubmit,
        control,
        getValues,
        formState: {errors}
    } = useForm();


    const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);

    const handleMouseDownOldPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);

    const handleMouseDownNewPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowConfirmedPassword = () => setShowConfirmedPassword((show) => !show);

    const handleMouseDownConfirmedPassword = (event) => {
        event.preventDefault();
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            console.log("error")
            return;
        }
        setOpen(false);
    };

    const handleOnSubmit = async (data) => {
        const passwordObj = {
            email: userEmail,
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
        }
        try {
            await updateCurrentUserPassword(passwordObj).unwrap();
        } catch (error) {
            console.error('Registration error:', error);
        }
        setOpen(true);
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
                <div className="flex flex-col gap-3 bg-white p-3 h-full rounded-lg shadow-md">
                    <Controller
                        name="oldPassword"
                        control={control}
                        defaultValue=""
                        rules={
                            {
                                required: 'Old Password is required',
                            }
                        }
                        render={({field}) => (
                            <FormControl sx={{width: '100%'}} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Old Password</InputLabel>
                                <OutlinedInput
                                    {...field}
                                    id="outlined-adornment-password"
                                    type={showOldPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowOldPassword}
                                                onMouseDown={handleMouseDownOldPassword}
                                                edge="end"
                                            >
                                                {showOldPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                                <FormHelperText
                                    error>{errors.oldPassword ? errors.oldPassword.message : ''}</FormHelperText>
                            </FormControl>
                        )}
                    />


                    <Controller
                        name="newPassword"
                        control={control}
                        defaultValue=""
                        rules={
                            {
                                required: 'New Password is required',
                                minLength: {value: 6, message: 'Password must be at least 6 characters'}
                            }
                        }
                        render={({field}) => (
                            <FormControl sx={{width: '100%'}} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                                <OutlinedInput
                                    {...field}
                                    id="outlined-adornment-password"
                                    type={showNewPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowNewPassword}
                                                onMouseDown={handleMouseDownNewPassword}
                                                edge="end"
                                            >
                                                {showNewPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                                <FormHelperText
                                    error>{errors.newPassword ? errors.newPassword.message : ''}</FormHelperText>
                            </FormControl>
                        )}
                    />


                    <Controller
                        name="confirmedPassword"
                        control={control}
                        defaultValue=""
                        rules={
                            {
                                required: 'Confirm Password is required',
                                minLength: {value: 6, message: 'Password must be at least 6 characters'},
                                validate: (value) => {
                                    return getValues("newPassword") === value || "Confirm Password does not match new Password";
                                },
                            }
                        }
                        render={({field}) => (
                            <FormControl sx={{width: '100%'}} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                                <OutlinedInput
                                    {...field}
                                    id="outlined-adornment-password"
                                    type={showConfirmedPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowConfirmedPassword}
                                                onMouseDown={handleMouseDownConfirmedPassword}
                                                edge="end"
                                            >
                                                {showConfirmedPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                                <FormHelperText
                                    error>{errors.confirmedPassword ? errors.confirmedPassword.message : ''}</FormHelperText>
                            </FormControl>
                        )}
                    />
                    <Button type="submit" variant="contained" color="primary" className="w-full">
                        {response.isLoading ? <CircularProgress color='inherit'/> : "Change Password"}
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

export default SecurityInfoForm;