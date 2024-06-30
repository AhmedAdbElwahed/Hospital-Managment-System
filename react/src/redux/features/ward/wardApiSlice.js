import {createApi} from "@reduxjs/toolkit/query/react";
import {axiosBaseQuery} from "../../../util/axiosApi";
import {BASE_URL} from "../../../util/additionalFunc";

export const wardApi = createApi({
    reducerPath: "wardApi",
    baseQuery: axiosBaseQuery({
        baseUrl: BASE_URL
    }),
    endpoints: (builder) => ({
        getAllWard: builder.query({
            query: () => ({
                url: "/hms/v1/ward",
                method: "get"
            }),
            providesTags: ['WardList']
        }),
        getWardById: builder.query({
            query: (id) => ({
                url: `/hms/v1/ward/get-by-id/${id}`,
                method: "get",
            }),
            providesTags: ["Ward"]
        }),
        addWard: builder.mutation({
            query: (data) => ({
                url: "/hms/v1/ward/add-ward",
                method: "post",
                data
            }),
            invalidatesTags: ["WardList"],
        }),
        updateWard: builder.mutation({
            query: ({id, data}) => ({
                url: `/hms/v1/ward/update-ward/${id}`,
                method: "put",
                data,
            }),
            invalidatesTags: ["WardList"],
        }),
        deleteWardById: builder.mutation({
            query: (id) => ({
                url: `/hms/v1/ward/delete-by-id/${id}`,
                method: 'delete',
            }),
            invalidatesTags: ["WardList"],
        })
    })
});

export const {
    useAddWardMutation,
    useUpdateWardMutation,
    useDeleteWardByIdMutation,
    useGetAllWardQuery,
    useGetWardByIdQuery,
} = wardApi;