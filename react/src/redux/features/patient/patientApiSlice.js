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
            query: () => ({
                url: "/api/v1/patients",
                method: "get",
            }),
            providesTags: ['PatientList'],
        }),
        getPatientById: builder.query({
            query: (id) => ({
                url: `/api/v1/patients/get-by-id/${id}`,
                method: "get"
            }),
            providesTags: ["Patient"],
        }),
        searchPatientByFullName: builder.query({
            query: (fullName) => ({
                url: `/api/v1/patients/search-full-name?fullName=${fullName}`,
                method: "get"
            })
        }),
        registerPatient: builder.mutation({
            query: (data) => ({
                url: "/api/v1/patients/add-patient",
                method: "post",
                data,
            }),
            invalidatesTags: ["PatientList"],
        }),
        updatePatient: builder.mutation({
            query: ({id, data}) => ({
                url: `/api/v1/patients/update-patient/${id}`,
                method: "put",
                data
            }),
            invalidatesTags: ['PatientList', 'Patient']
        }),
        deletePatientById: builder.mutation({
            query: (id) => ({
                url: `/api/v1/patients/delete-by-id/${id}`,
                method: "delete"
            }),
            invalidatesTags: ['PatientList'],
        })
    })
});

export const {
    useGetAllPatientsQuery,
    useGetPatientByIdQuery,
    useSearchPatientByFullNameQuery,
    useRegisterPatientMutation,
    useUpdatePatientMutation,
    useDeletePatientByIdMutation
} = patientApi;