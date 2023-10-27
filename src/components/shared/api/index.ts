import {createApi} from "@reduxjs/toolkit/dist/query/react";

import { io, Socket } from "socket.io-client";

import {API_WS_URL} from "components/shared/configs/api";

import {baseQueryWithReAuth} from "./baseQueryWithReAuth";



export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery:  baseQueryWithReAuth,
    endpoints: builder => ({})
})


let socket: Socket;

export function getSocket() {
    if (!socket) {
        socket = io(API_WS_URL);
    }
    return socket;
}