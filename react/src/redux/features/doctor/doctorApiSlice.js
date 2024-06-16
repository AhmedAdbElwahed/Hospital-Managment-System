import {axiosPrivate} from "../../../util/axiosApi";
import {createApi} from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

const axiosBaseQuery = ({baseUrl} = {baseUrl: ""}) => {
    return async ({url, method, data, params, headers}) => {
        try {
            const result = await axiosPrivate({
                url: baseUrl + url,
                method,
                data,
                params,
                headers,
            });
            return {data: result.data};
        } catch (error) {
            const err = error
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            }
        }
    }
}
export const doctorApi = createApi({
    reducerPath: 'doctorApi',
    baseQuery: axiosBaseQuery({
        baseUrl: baseUrl,
    }),
    endpoints: (builder) => ({
        getAllDoctors: builder.query({
            query: () => ({url: '/api/v1/doctor', method: 'get'}),
            providesTags: ['DoctorList'],
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
    useGetDoctorByIdQuery,
} = doctorApi;