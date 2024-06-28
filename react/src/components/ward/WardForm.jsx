import React, {useState} from 'react';
import {Controller, useForm} from "react-hook-form";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import {wardFormCheckBoxes} from "../../constants/wardFormCheckBoxes";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import {useAddWardMutation, useUpdateWardMutation} from "../../redux/features/ward/wardApiSlice";

const WardForm = ({wardId, ward}) => {
    const {
        handleSubmit,
        control,
        formState: {errors}
    } = useForm({
        defaultValues: ward,
    });
    const [addWard, response] = useAddWardMutation();
    const [updateWard, {isLoading}] = useUpdateWardMutation();
    const [open, setOpen] = useState(false);


    const onUpdateSubmit = async (data) => {
        try {
            console.log(data)
            await updateWard({id: wardId, data});
        } catch (err) {
            console.log(err);
        }
    }

    const onAddSubmit = async (data) => {
        try {
            console.log(data);
            await addWard(data);
        } catch (err) {
            console.log(err);
        }
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            console.log("error")
            return;
        }
        setOpen(false);
    };

    return (
        <>
            <form className="p-4 bg-white rounded-lg shadow-md"
                  onSubmit={handleSubmit(
                      ward ? onUpdateSubmit : onAddSubmit
                  )}>
                <div className="flex flex-col gap-3 p-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            rules={{required: 'Ward name is required'}}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    label="Ward Name"
                                    variant="outlined"
                                    error={!!errors.name}
                                    helperText={errors.name ? errors.name.message : ''}
                                    fullWidth
                                />
                            )}
                        />
                        <Controller
                            name="phoneNumber"
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
                                    error={!!errors.phoneNumber}
                                    helperText={errors.phoneNumber ? errors.phoneNumber.message : ''}
                                    fullWidth
                                />
                            )}
                        />
                    </div>

                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Email is required',
                            pattern: {
                                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                message: 'Invalid email'
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Controller
                            name="numOfBeds"
                            control={control}
                            defaultValue=""
                            rules={{required: 'Number Of Beds is required'}}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    label="Number Of Beds"
                                    variant="outlined"
                                    InputProps={{
                                        inputProps: {
                                            min: 0
                                        },
                                    }}
                                    type="number"
                                    error={!!errors.numOfBeds}
                                    helperText={errors.numOfBeds ? errors.numOfBeds.message : ''}
                                    fullWidth
                                />
                            )}
                        />
                        <Controller
                            name="numOfNurses"
                            control={control}
                            defaultValue=""
                            rules={{required: 'Number Of Nurses is required',}}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    label="Number Of Nurses"
                                    variant="outlined"
                                    type="number"
                                    error={!!errors.numOfNurses}
                                    helperText={errors.numOfNurses ? errors.numOfNurses.message : ''}
                                    fullWidth
                                />
                            )}
                        />
                    </div>
                    <div className="flex flex-row gap-2">
                        {
                            wardFormCheckBoxes.map((field, index) => (
                                <FormControlLabel
                                    key={field.value}
                                    control={
                                        <Controller
                                            name={field.value}
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
                                    label={field.label}
                                />
                            ))
                        }
                    </div>
                </div>

                {ward ? (<Button type="submit" variant="contained" color="primary" className="w-full">
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
    );
};

export default WardForm;