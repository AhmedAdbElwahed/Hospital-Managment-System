import React, {useEffect} from 'react';
import Divider from "@mui/material/Divider";
import CustomBreadcrumbs from "../shared/CustomBreadcrumbs";
import HomeIcon from "@mui/icons-material/Home";

const links = [
    {path: "/", icon: <HomeIcon sx={{mr: 0.5}} fontSize="inherit"/>},
]


const AdmissionView = () => {

    useEffect(() => {
        document.title = "Admission"
    }, [])

    return (
        <section className="flex flex-col pb-1 w-full gap-4 px-5 h-full">
            <div className="flex flex-row gap-2 w-full bg-white rounded-lg p-4">
                <p className="font-bold">Dashboard</p>
                <Divider orientation="vertical"/>
                <CustomBreadcrumbs links={links} pageName="Admission"/>
            </div>
        </section>
    );
};

export default AdmissionView;