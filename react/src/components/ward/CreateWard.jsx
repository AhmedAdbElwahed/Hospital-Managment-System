import React, {useEffect, useState} from 'react';
import Divider from "@mui/material/Divider";
import CustomBreadcrumbs from "../shared/CustomBreadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBedPulse} from "@fortawesome/free-solid-svg-icons";
import {useParams} from "react-router-dom";
import WardForm from "./WardForm";

import {CircularProgress} from "@mui/material";
import {useGetWardByIdQuery} from "../../redux/features/ward/wardApiSlice";

const links = [
    {path: "/", icon: <HomeIcon sx={{mr: 0.5}} fontSize="inherit"/>},
    {path: "/wards", icon: <FontAwesomeIcon className="w-[15px] h-[15px] mr-[0.5px]" icon={faBedPulse}/>},
]

const CreateWard = () => {
    const {wardId} = useParams();
    const [skip, setSkip] = useState(true);
    const {data} = useGetWardByIdQuery(wardId, {
        skip,
    });
    const [ward, setWard] = useState(null);

    useEffect(() => {
        if (wardId) {
            setSkip(false);
            setWard(data);
        }
    }, [data, wardId]);

    useEffect(() => {
        document.title = wardId ? "Update Ward" : 'Create Ward';
    }, []);
    return (
        <section className="flex flex-col pb-1 w-full gap-4 px-5 h-full">
            <div className="flex flex-row gap-2 w-full bg-white rounded-lg p-4">
                <p className="font-bold">Dashboard</p>
                <Divider orientation="vertical"/>
                <CustomBreadcrumbs links={links} pageName={wardId ? "Update Ward" : "Create Ward"}/>
            </div>
            {wardId ? ward ? <WardForm ward={ward} wardId={wardId}/> : <CircularProgress/> :
                <WardForm ward={ward} wardId={wardId}/>}
        </section>
    );
};

export default CreateWard;