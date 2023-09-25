import {
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta
} from "@reduxjs/toolkit/query";
import {
  BaseQueryApi,
  QueryReturnValue,
} from '@reduxjs/toolkit/src/query/baseQueryTypes'

import {baseQuery} from "./baseQuery";

import {invalidateAccessTokenAction} from "./actions"

const AUTH_ERROR_CODES = new Set([401])


export async function baseQueryWithReAuth(
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: {}
): Promise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>> {
    let result = await baseQuery(args, api, extraOptions)

    /**
     * 👇 ATTENTION: We can't use any thunk in direct mode,
     * coz it's FSD Violation:
     *
     * api.dispatch(logoutThunk()) // 👎
     *
     * So we dispatch shared event `invalidateAccessToken`,
     * which has subscribes via redux middleware in other layers.
     * See example in @/features/authentication/InvalidateAccessToken
     */

    //TODO configure retry 200-499
    //TODO 401: email or password are incorrect
    if (
        typeof result?.error?.status === 'number'
        && AUTH_ERROR_CODES.has(result.error!.status)
    ){
        console.log('sending invalidateAccessTokenAction')
        // send refresh token to get new access token
        await api.dispatch(invalidateAccessTokenAction())

        // retry with new access token
        result = await baseQuery(args, api, extraOptions)
        // console.log(refreshResult) //TODO drop
        // if (refreshResult) {
        //     // store the new token
        //     api.dispatch(setCredentialsAction(refreshResult))
        //     // retry the original query with new access token
        //
        // } else {
        //     api.dispatch(logoutAction())
        // }
    }

    return result
}