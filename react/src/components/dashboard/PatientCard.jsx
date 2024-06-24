import React from 'react';
import Avatar from "@mui/material/Avatar";

const PatientCard = () => {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row w-full gap-8">
                <Avatar>SU</Avatar>
                <div className="flex flex-col w-full">
                    <span className="text-sm font-61ef]">Ahmed Mohammed</span>
                    <span className="font-thin text-xs text-gray-500">Health Check</span>
                </div>
                <div className="flex flex-col w-full">
                    <span className="text-sm font-bold text-[#2761ef]">Patient ID</span>
                    <span className="font-thin text-xs text-gray-500">12345</span>
                </div>
            </div>

            <div className="flex flex-row w-full gap-8">
                <Avatar>SU</Avatar>
                <div className="flex flex-col w-full">
                    <span className="text-sm font-bold text-[#2761ef]">Ahmed Mohammed</span>
                    <span className="font-thin text-xs text-gray-500">Health Check</span>
                </div>
                <div className="flex flex-col w-full">
                    <span className="text-sm font-bold text-[#2761ef]">Patient ID</span>
                    <span className="font-thin text-xs text-gray-500">12345</span>
                </div>
            </div>

            <div className="flex flex-row w-full gap-8">
                <Avatar>SU</Avatar>
                <div className="flex flex-col w-full">
                    <span className="text-sm font-bold text-[#2761ef]">Ahmed Mohammed</span>
                    <span className="font-thin text-xs text-gray-500">Health Check</span>
                </div>
                <div className="flex flex-col w-full">
                    <span className="text-sm font-bold text-[#2761ef]">Patient ID</span>
                    <span className="font-thin text-xs text-gray-500">12345</span>
                </div>
            </div>
        </div>
    );
};

export default PatientCard;