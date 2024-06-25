import {createApi} from "@reduxjs/toolkit/query/react";
import {axiosBaseQuery} from "../../../util/axiosApi";
import {BASE_URL} from "../../../util/additionalFunc";

export const dashboardApi = createApi({
    reducerPath: "dashboardApi",
    baseQuery: axiosBaseQuery({
        baseUrl: BASE_URL
    }),
    endpoints: (builder) => ({
        getDashBoardStatistics: builder.query({
            query: () => ({
                    url: "/hms/v1/dashboard/statistics",
                    method: "get",
                }),
        }),
        getTodayAppointments: builder.query({
            query: () => ({
                url: "/hms/v1/dashboard/today-appointments",
                method: "get",
            }),
        }),
        getRecentPatients: builder.query({
            query: () => ({
                url: "/hms/v1/dashboard/recent-patients",
                method: "get",
            }),
        }),

    })
});

export const {
    useGetDashBoardStatisticsQuery,
    useGetTodayAppointmentsQuery,
    useGetRecentPatientsQuery,
} = dashboardApi;