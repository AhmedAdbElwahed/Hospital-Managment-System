import {axiosBaseQuery} from "../../../util/axiosApi";
import {createApi} from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "../../../util/additionalFunc";



export const doctorApi = createApi({
    reducerPath: 'doctorApi',
    baseQuery: axiosBaseQuery({
        baseUrl: BASE_URL,
    }),
    endpoints: (builder) => ({
        getAllDoctors: builder.query({
            query: () => ({url: '/api/v1/doctor', method: 'get'}),
            providesTags: ['DoctorList', "Doctor"],
        }),
        registerDoctor: builder.mutation({
            query: (data) => {
                console.log(data)
                return {
                    url: "/api/v1/doctor/register",
                    method: 'post',
                    datatype: 'json',
                    data,
                }
            },
            invalidatesTags: ['DoctorList'],
        }),
        getDoctorById: builder.query({
            query: (id) => ({
                url: `/api/v1/doctor/get-by-id/${id}`,
                method: 'get'
            }),
            providesTags: ["Doctor"],
        }),
        getAvailableTimes: builder.query({
            query: (id) => ({
                url: `/api/v1/doctor/get-available-time/${id}`,
                method: 'get'
            })
        })
        ,
        deleteDoctor: builder.mutation({
            query: (id) => ({
                url: `/api/v1/doctor/delete-by-id/${id}`,
                method: "delete"
            }),
            invalidatesTags: ['DoctorList'],
        }),
        updateDoctor: builder.mutation({
            query: ({id, data}) => ({
                url: `/api/v1/doctor/update-by-id/${id}`,
                method: "put",
                data,
            }),
            invalidatesTags: ["Doctor"],
        })
    }),
});

export const {
    useRegisterDoctorMutation,
    useDeleteDoctorMutation,
    useUpdateDoctorMutation,
    useGetAllDoctorsQuery,
    useGetAvailableTimesQuery,
    useGetDoctorByIdQuery,
} = doctorApi;