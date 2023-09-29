import {createAsyncThunk} from "@reduxjs/toolkit";

import {RootStateType} from "components/providers/store";

import {ITokens, selectRefreshToken, sessionActions} from "components/entities/session";

import {RefreshTokenBody} from "./api/types";
import {refreshTokenAPI} from "./api/api";



export const refreshTokenThunk = createAsyncThunk<
    void,
    void,
    { state: RootStateType }
> (
    'session/refreshToken',
    async (_,  api) => {
        const dispatch = api.dispatch
        const refreshToken = selectRefreshToken(api.getState())
        dispatch(sessionActions.loading())

         // send refresh token to get new access token
        const body:RefreshTokenBody ={
            token: refreshToken
        }

        const response = (
            await dispatch(refreshTokenAPI.endpoints.requestNewTokens.initiate(body))
        )

        const refreshResult: ITokens | undefined = response.data

        if (response.isSuccess && refreshResult) {
            // store the new token
            dispatch(sessionActions.refresh(refreshResult))
        } else {
            dispatch(sessionActions.logout())
        }
    }
)