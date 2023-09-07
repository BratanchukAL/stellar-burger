import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {API_URL} from "../configs/api";

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: API_URL}),
    endpoints: builder => ({})
})