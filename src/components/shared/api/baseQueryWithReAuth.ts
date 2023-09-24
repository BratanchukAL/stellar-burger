import {baseQuery} from "./baseQuery";
import {
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta
} from "@reduxjs/toolkit/query";

import {
  BaseQueryApi,
  QueryReturnValue,
} from '@reduxjs/toolkit/src/query/baseQueryTypes'

import {invalidateAccessTokenAction} from "./actions"


export async function baseQueryWithReAuth(
  args: FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
): Promise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>> {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.status === 403) {
        console.log('sending invalidateAccessTokenAction')
        // send refresh token to get new access token
        await api.dispatch(invalidateAccessTokenAction())

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