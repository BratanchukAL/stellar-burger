import {createAsyncThunk} from "@reduxjs/toolkit";

import {TAsyncThunk} from "components/providers/store";

import {ITokens, selectRefreshToken, sessionActions} from "components/entities/session";
import {selectIsLoading, selectText, spinnerActions} from "components/entities/spinner";

import {RefreshTokenBody} from "./api/types";
import {refreshTokenAPI} from "./api/api";



export const refreshTokenThunk = createAsyncThunk<
    void,
    void,
    TAsyncThunk
> (
    'session/refreshToken',
    async (_,  api) => {
        const dispatch = api.dispatch
        const refreshToken = selectRefreshToken(api.getState())
        const bufferTextSpinner = selectText(api.getState())
        const currentIsLoading = selectIsLoading(api.getState())

        dispatch(sessionActions.loading())
        dispatch(spinnerActions.start("Идет проверка токена. Подождите..."))

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
            if (currentIsLoading)
                dispatch(spinnerActions.start(bufferTextSpinner))
        } else {
            dispatch(sessionActions.logout())
        }
    }
)