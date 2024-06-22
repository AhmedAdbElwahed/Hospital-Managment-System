import {createApi} from "@reduxjs/toolkit/query/react";
import {axiosBaseQuery} from "../../../util/axiosApi";
import {BASE_URL} from "../../../util/additionalFunc";

export const patientHistoryApi = createApi({
    reducerPath: "patientHistoryApi",
    baseQuery: axiosBaseQuery({
        baseUrl: BASE_URL
    }),
    endpoints: (builder) => ({
        getPatientHistoryByPatientId: builder.query({
            query: (patientId) => ({
                url: `/api/vi/patient-history/get_by-patient-id/${patientId}`,
                method: 'get'
            }),
            providesTags: ['patientHist']
        }),
        addPatientHistory: builder.mutation({
            query: (data) => ({
                url: "/api/vi/patient-history/add-patient-hist",
                method: 'post',
                data
            }),
        }),
        updatePatientHistory: builder.mutation({
            query: (data) => ({
                url: `/api/vi/patient-history/update-patient-hist`,
                method: "put",
                data
            }),
            invalidatesTags: ['patientHist']
        })
    }),
});

export const {
    useAddPatientHistoryMutation,
    useUpdatePatientHistoryMutation,
    useGetPatientHistoryByPatientIdQuery,
} = patientHistoryApi;