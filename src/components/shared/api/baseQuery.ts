import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

import {API_URL} from "../configs/api";

import {selectAccessToken} from "./selectors";


export const baseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
    prepareHeaders: (headers, api) => {
        const token = selectAccessToken(api.getState())

        if (token) {
            headers.set("authorization", `${token}`) // include Bearer
        }
        return headers
    }
})