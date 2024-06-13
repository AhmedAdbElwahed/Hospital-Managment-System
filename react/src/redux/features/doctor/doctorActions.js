import {createAsyncThunk} from "@reduxjs/toolkit";
import {axiosPrivate} from "../../../util/axiosApi";


const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

export const registerDoctor = createAsyncThunk(
    "doctor/register",

    async ({
               firstname,
               lastname,
               gender,
               dob,
               address,
               phone,
               email,
               password,
               is_enabled,
               education,
               certifications,
               experience,
               activeStatus,
               specialty,
               licenseNumber,
               workStartTime,
               workEndTime,
           }, {rejectWithValue}) => {
        try {
            const response = await axiosPrivate.post(`${baseUrl}/api/v1/doctor/register`,
                {
                    "registerDoctor": {
                        firstname,
                        lastname,
                        gender,
                        dob,
                        address,
                        phone,
                        email,
                        password,
                        is_enabled,
                    },
                    "additionalInfoDto": {
                        education,
                        certifications,
                        experience,
                        activeStatus,
                        specialty,
                        licenseNumber,
                        workStartTime,
                        workEndTime,
                    },
                });

        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);