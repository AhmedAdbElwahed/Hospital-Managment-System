import React, {useEffect, useState} from 'react'
import HomeIcon from "@mui/icons-material/Home";
import Divider from "@mui/material/Divider";
import CustomBreadcrumbs from "../shared/CustomBreadcrumbs";
import {Tab, TabGroup, TabList, TabPanel, TabPanels} from "@headlessui/react";
import PersonalInfoForm from "./PersonalInfoForm";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from '@mui/icons-material/Lock';
import SecurityInfoForm from "./SecurityInfoForm";
import {useGetCurrentUserInfoQuery} from "../../redux/features/settings/settingsApiSlice";
import {CircularProgress} from "@mui/material";
import dayjs from "dayjs";


const links = [
    {path: "/", icon: <HomeIcon sx={{mr: 0.5}} fontSize="inherit"/>},
]

const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
};

export default function Setting() {

    const {data: currentUser, error, isLoading} = useGetCurrentUserInfoQuery();
    const [currentUserInfo, setCurrentUserInfo] = useState(null);


    useEffect(() => {
        if (currentUser) {
            const user = {...currentUser};
            user.dob = user.dob ? dayjs(user.dob) : null;
            setCurrentUserInfo(user);
        }
    }, [currentUser]);

    useEffect(() => {
        document.title = 'Settings';
    }, []);


    return (
        <section className="flex flex-col pb-1 w-full gap-4 px-5 h-full">
            <div className="flex flex-row gap-2 w-full bg-white rounded-lg p-4">
                <p className="font-bold">Dashboard</p>
                <Divider orientation="vertical"/>
                <CustomBreadcrumbs links={links} pageName="Settings"/>
            </div>
            <div className="space-y-6 p-4 bg-white rounded-lg shadow-md">
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
                                <LockIcon/>
                                <p className="p-1">Security</p>
                            </div>
                        </Tab>
                    </TabList>
                    <TabPanels className="mt-2">
                        <TabPanel
                        >
                            {currentUserInfo ? <PersonalInfoForm userInfo={currentUserInfo}/> :
                                <CircularProgress/>}
                        </TabPanel>
                        <TabPanel
                        >
                            {currentUserInfo ? <SecurityInfoForm userEmail={currentUserInfo.email}/> :
                                <CircularProgress/>}
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </div>

        </section>
    )
}
