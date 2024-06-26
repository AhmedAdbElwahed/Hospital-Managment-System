import {createApi} from "@reduxjs/toolkit/query/react";
import {axiosBaseQuery} from "../../../util/axiosApi";
import {BASE_URL} from "../../../util/additionalFunc";

export const settingsApi = createApi({
    reducerPath: "settingsApi",
    baseQuery: axiosBaseQuery({
        baseUrl: BASE_URL
    }),
    endpoints: (builder) => ({
        getCurrentUserInfo: builder.query({
            query: () => ({
                url: "/api/v1/user",
                method: "get"
            }),
            providesTags: ["User"]
        }),
        updateCurrentUserInfo: builder.mutation({
            query: (data) => ({
                url: "/api/v1/user/update-user",
                method: "put",
                data
            }),
            invalidatesTags: ["User"]
        }),
        updateCurrentUserPassword: builder.mutation({
            query: (data) => ({
                url: "/hms/v1/auth/admin/password/reset",
                method: "post",
                data
            }),
        }),

    })
});

export const {
    useGetCurrentUserInfoQuery,
    useUpdateCurrentUserInfoMutation,
    useUpdateCurrentUserPasswordMutation,
} = settingsApi;