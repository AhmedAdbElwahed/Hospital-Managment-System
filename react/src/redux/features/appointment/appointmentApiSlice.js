import {createApi} from "@reduxjs/toolkit/query/react";
import {axiosBaseQuery} from "../../../util/axiosApi";
import {BASE_URL} from "../../../util/additionalFunc";

export const appointmentApi = createApi({
    reducerPath: "appointmentApi",
    baseQuery: axiosBaseQuery({
        baseUrl: BASE_URL
    }),
    endpoints: (builder) => ({
        getAllAppointments: builder.query({
            query: () => ({
                url: "/api/v1/appointments",
                method: "get"
            }),
            providesTags: ["Appointments"]
        }),
        deleteAppointmentById: builder.mutation({
            query: (id) => ({
                url: `/api/v1/appointments/delete-by-id/${id}`,
                method: "delete"
            }),
            invalidatesTags: ["Appointments"]
        }),
        createAppointment: builder.mutation({
            query: ({patientId, data}) => ({
                url: `/api/v1/appointments/patients/${patientId}`,
                method: "post",
                data
            }),
            invalidatesTags: ["Appointments"]
        }),
        changeStatus: builder.mutation({
            query: (data) => ({
                url: "/api/v1/appointments/change-status",
                method: 'put',
                data
            }),
            invalidatesTags: ['Appointments']
        })
    }),
});

export const {
    useDeleteAppointmentByIdMutation,
    useCreateAppointmentMutation,
    useChangeStatusMutation,
    useGetAllAppointmentsQuery,
} = appointmentApi;