import React, {useState} from 'react';
import {Tab, TabGroup, TabList, TabPanel, TabPanels} from "@headlessui/react";
import {useForm, Controller} from 'react-hook-form';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import {
    familyHistoryObj,
    otherInfo,
    pastHistoryObj,
    physicalHistoryObj
} from "../../constants/patientHistoryFormCheckBoxes";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import GroupIcon from '@mui/icons-material/Group';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import TextareaAutosize from "@mui/material/TextareaAutosize";
import {
    useAddPatientHistoryMutation, useUpdatePatientHistoryMutation,
} from "../../redux/features/patientHistory/patientHistoryApiSlice";


const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
};

const PatientHistoryForm = ({patientId, patientHist}) => {
    const [addPatientHistory, response] = useAddPatientHistoryMutation();
    const [updatePatientHistory, {isLoading}] = useUpdatePatientHistoryMutation();
    const [familyOther, setFamilyOther] = useState(false);
    const [pastOther, setPastOther] = useState(false);
    const [additionalInfo, setAdditionalInfo] = useState([false, false, false, false]);
    const [open, setOpen] = useState(false);

    const {control, handleSubmit} =
        useForm({
            defaultValues: patientHist,

        });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            console.log("error")
            return;
        }
        setOpen(false);
    };
    const onUpdateSubmit = async (data) => {
        try {
            data['patientId'] = patientId;
            await updatePatientHistory(data);
        } catch (err) {
            console.log(err);
        }
    }

    const onAddSubmit = async (data) => {
        try {
            data['patientId'] = patientId;
            await addPatientHistory(data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <form className="p-4 bg-white rounded-lg shadow-md" onSubmit={handleSubmit(
                patientHist ? onUpdateSubmit : onAddSubmit
            )}>
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
                                <GroupIcon/>
                                <p className="p-1">Family History</p>
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
                                <ContentPasteIcon/>
                                <p className="p-1">Past History</p>
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
                                <AccessibilityIcon/>
                                <p className="p-1">Physiological History</p>
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
                                <p className="p-1">Additional History</p>
                            </div>
                        </Tab>
                    </TabList>
                    <TabPanels className="mt-2">
                        <TabPanel>
                            <Stack>
                                {
                                    familyHistoryObj.map((field, index) => (
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
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={familyOther}/>
                                    }
                                    onChange={(event) => setFamilyOther(event.target.checked)}
                                    label="Other"
                                />
                                {
                                    familyOther && (
                                        <Controller
                                            control={control}
                                            defaultValue=""
                                            name="familyNotes"
                                            render={
                                                ({field}) =>
                                                    <TextareaAutosize
                                                        {...field}
                                                        className="w-full text-sm font-normal font-sans leading-normal p-3 rounded-xl rounded-br-none shadow-lg shadow-slate-100  focus:shadow-outline-purple  focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500  focus:border-purple-500  bg-white  text-slate-900  focus-visible:outline-0 box-border"
                                                        aria-label="empty textarea"
                                                        placeholder="Additional Family History Notes..."
                                                    />
                                            }
                                        />
                                    )
                                }
                            </Stack>
                        </TabPanel>
                    </TabPanels>
                    <TabPanels className="mt-2">
                        <TabPanel>
                            <Stack>
                                {
                                    pastHistoryObj.map((field) => (
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
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={pastOther}/>
                                    }
                                    onChange={(event) => setPastOther(event.target.checked)}
                                    label="Other"
                                />
                                {
                                    pastOther && (
                                        <Controller
                                            control={control}
                                            defaultValue=""
                                            name="pastNotes"
                                            render={
                                                ({field}) =>
                                                    <TextareaAutosize
                                                        {...field}
                                                        className="w-full text-sm font-normal font-sans leading-normal p-3 rounded-xl rounded-br-none shadow-lg shadow-slate-100  focus:shadow-outline-purple  focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500  focus:border-purple-500  bg-white  text-slate-900  focus-visible:outline-0 box-border"
                                                        aria-label="empty textarea"
                                                        placeholder="Additional Past History Notes..."
                                                    />
                                            }
                                        />
                                    )
                                }
                            </Stack>
                        </TabPanel>
                    </TabPanels>
                    <TabPanels className="mt-2">
                        <TabPanel>
                            <Stack>
                                {
                                    physicalHistoryObj.map((field, index) => (
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
                            </Stack>
                        </TabPanel>
                    </TabPanels>
                    <TabPanels>
                        <TabPanel>
                            <Stack direction="row">
                                <Stack rowGap={2}>
                                    {
                                        otherInfo.map((value, index) => {
                                            return (
                                                <FormControlLabel
                                                    key={index}
                                                    control={
                                                        <Checkbox
                                                            checked={additionalInfo[index]}/>
                                                    }
                                                    onChange={(event) => setAdditionalInfo(
                                                        additionalInfo.map((value, i) => {
                                                            if (index === i) {
                                                                return event.target.checked;
                                                            }
                                                            return additionalInfo[i];
                                                        })
                                                    )}
                                                    label={value}
                                                />
                                            );
                                        })
                                    }
                                </Stack>
                                <Stack className="w-full" rowGap={2}>
                                    {
                                        additionalInfo.map((show, index) => {
                                                return (
                                                    show && <Controller
                                                        key={index}
                                                        control={control}
                                                        defaultValue=""
                                                        name={otherInfo[index]}
                                                        render={
                                                            ({field}) =>
                                                                <TextareaAutosize
                                                                    {...field}
                                                                    className="w-full text-sm font-normal font-sans leading-normal p-3 rounded-xl rounded-br-none shadow-lg shadow-slate-100  focus:shadow-outline-purple  focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500  focus:border-purple-500  bg-white  text-slate-900  focus-visible:outline-0 box-border"
                                                                    aria-label="empty textarea"
                                                                    placeholder={`${otherInfo[index]} Notes...`}
                                                                />
                                                        }
                                                    />
                                                )
                                            }
                                        )

                                    }
                                </Stack>
                            </Stack>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
                <Controller
                    control={control}
                    defaultValue=""
                    name="notes"
                    render={
                        ({field}) =>
                            <TextareaAutosize
                                {...field}
                                className="w-full text-sm font-normal font-sans leading-normal p-3 rounded-xl rounded-br-none shadow-lg shadow-slate-100  focus:shadow-outline-purple  focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500  focus:border-purple-500  bg-white  text-slate-900  focus-visible:outline-0 box-border"
                                aria-label="empty textarea"
                                placeholder="Additional Notes..."
                            />
                    }
                />

                {patientHist ? (<Button type="submit" variant="contained" color="primary" className="w-full">
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

export default PatientHistoryForm;
