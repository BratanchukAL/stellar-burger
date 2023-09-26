import {createListenerMiddleware} from "@reduxjs/toolkit";

import {TypedListening} from "components/providers/store";

import {invalidateAccessTokenAction} from "components/shared/api/actions";
import {ITokens} from "components/entities/session";
import {sessionActions} from "components/entities/session";
import {selectRefreshToken} from "components/entities/session";

import {RefreshTokenBody} from "./api/types";
import {refreshTokenAPI} from "./api/api";



// Create the middleware instance and methods
export const invalidateAccessTokenListener = createListenerMiddleware()


const startInvalidateAccessTokenListener = invalidateAccessTokenListener.startListening as TypedListening

startInvalidateAccessTokenListener({
    actionCreator: invalidateAccessTokenAction,
    effect: async (action, api) => {
        const dispatch = api.dispatch
        const refreshToken = selectRefreshToken(api.getState())

         // send refresh token to get new access token
        const body:RefreshTokenBody ={
            token: refreshToken
        }

        const refreshResult: ITokens | undefined = (
            await dispatch(refreshTokenAPI.endpoints.requestNewTokens.initiate(body))
        ).data

        console.log(refreshResult) //TODO drop
        if (refreshResult) {
            // store the new token
            api.dispatch(sessionActions.refresh(refreshResult))
        } else {
            api.dispatch(sessionActions.logout())
        }
    },
})