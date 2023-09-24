import {createListenerMiddleware, TypedStartListening} from "@reduxjs/toolkit";

import {AppDispatch, RootStateType} from "components/providers/store";

import {invalidateAccessTokenAction} from "components/shared/api/actions";
import {ITokens} from "components/entities/session";
import {sessionActions} from "components/entities/session";

import {RefreshTokenBody} from "./api/types";
import {refreshTokenAPI} from "./api/api";


// Create the middleware instance and methods
export const invalidateAccessTokenListener = createListenerMiddleware()

// @see https://redux-toolkit.js.org/api/createListenerMiddleware#typescript-usage
type TypedListening = TypedStartListening<RootStateType, AppDispatch> // TODO move in providers

const startInvalidateAccessTokenListener = invalidateAccessTokenListener.startListening as TypedListening

startInvalidateAccessTokenListener({
    actionCreator: invalidateAccessTokenAction,
    effect: async (action, api) => {
        const dispatch = api.dispatch
        const refreshToken = api.getState().session.credentials.refreshToken

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