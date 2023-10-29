import {createAsyncThunk} from "@reduxjs/toolkit";

import {TAsyncThunk} from "components/providers/store";

import {ordersAllActions} from "../slice";
import {IOrders} from "../../models";

import {mapOrders} from "./maps";




export const onSuccessActionThunk = createAsyncThunk<
    void,
    Event,
    TAsyncThunk
> (
    'WS/Orders/all/onSuccessActionThunk',
    async (e,  api) => {
        const dispatch = api.dispatch
        dispatch(ordersAllActions.loading())
        dispatch(ordersAllActions.streaming())

        console.log('WS/Orders/all/onSuccessActionThunk')
        console.log(e)
    }
)

export const onErrorActionThunk= createAsyncThunk<
    void,
    Event,
    TAsyncThunk
> (
    'WS/Orders/all/onErrorActionThunk',
    async (e,  api) => {
        const dispatch = api.dispatch
        dispatch(ordersAllActions.error(e.type))

        console.log('WS/Orders/all/onErrorActionThunk')
        console.log(e)
    }
)

export const onMessageActionThunk= createAsyncThunk<
    void,
    MessageEvent,
    TAsyncThunk
> (
    'WS/Orders/all/onMessageActionThunk',
    async (e,  api) => {
        const dispatch = api.dispatch

        const orders: IOrders = mapOrders(JSON.parse(e.data))

        dispatch(ordersAllActions.update(orders))

        console.log('WS/Orders/all/onMessageActionThunk')
        console.log(e)
    }
)

export const onClosedActionThunk= createAsyncThunk<
    void,
    CloseEvent,
    TAsyncThunk
> (
    'WS/Orders/all/onClosedActionThunk',
    async (e,  api) => {
        const dispatch = api.dispatch
        dispatch(ordersAllActions.closedStream())

        console.log('WS/Orders/all/onClosedActionThunk')
        console.log(e)
    }
)