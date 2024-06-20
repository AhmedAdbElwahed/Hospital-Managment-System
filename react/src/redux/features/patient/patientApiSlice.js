import {createApi} from "@reduxjs/toolkit/query/react";
import {axiosBaseQuery} from "../../../util/axiosApi";
import {BASE_URL} from "../../../util/additionalFunc";

export const patientApi = createApi({
    reducerPath: "patientApi",
    baseQuery: axiosBaseQuery({
        baseUrl: BASE_URL,
    }),
    endpoints: (builder) => ({
        getAllPatients: builder.query({
            query:() => ({
                url: "/api/v1/patients",
                method: "get",
            })
        })
    })
});

export const {
    useGetAllPatientsQuery
} = patientApi;