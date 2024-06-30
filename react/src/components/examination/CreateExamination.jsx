import React from 'react';
import Divider from "@mui/material/Divider";
import CustomBreadcrumbs from "../shared/CustomBreadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThermometer} from "@fortawesome/free-solid-svg-icons";
import ExaminationForm from "./ExaminationForm";

const links = [
    {path: "/", icon: <HomeIcon sx={{mr: 0.5}} fontSize="inherit"/>},
    {path: "/examination", icon: <FontAwesomeIcon className="w-[15px] h-[15px] mr-[0.5px]" icon={faThermometer}/>},
]

const CreateExamination = () => {
    return (
        <section className="flex flex-col pb-1 w-full gap-4 px-5 h-full">
            <div className="flex flex-row gap-2 w-full bg-white rounded-lg p-4">
                <p className="font-bold">Dashboard</p>
                <Divider orientation="vertical"/>
                <CustomBreadcrumbs links={links} pageName="Add Examination"/>
            </div>
            <ExaminationForm/>
        </section>
    );
};

export default CreateExamination;