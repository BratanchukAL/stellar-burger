import {createAsyncThunk} from "@reduxjs/toolkit";

import {RootStateType} from "components/providers/store";
import {sessionActions} from "components/entities/session";

import {RegisterBody} from "./api/types";
import {registerAPI} from "./api/api";


export const registerThunk = createAsyncThunk<void, RegisterBody, { state: RootStateType; }>(
    'auth/register',
    async (body: RegisterBody, {dispatch}) => {
        const response = (await dispatch(registerAPI.endpoints.postRegister.initiate(body))).data

        if(response)
           dispatch(sessionActions.login(response))
    }
);