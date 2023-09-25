import React, {useCallback} from "react"

import {useAppDispatch} from "components/providers/store"

import {sessionActions} from "components/entities/session";

import {LogoutBody} from "./api/types"
import {usePostLogoutMutation} from "./api/api";


export const useHandleLogout = (state: LogoutBody): [((e: React.SyntheticEvent<HTMLFormElement>) => Promise<void>), any] => {
    const [fetchLogout, response] = usePostLogoutMutation()
    const dispatch = useAppDispatch()

    const onHandle = useCallback(async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (e.currentTarget.checkValidity()) {
            const res = await fetchLogout(state)
            if ('data' in res)
                dispatch(sessionActions.logout())
        }

    }, [state, dispatch])

    return [onHandle, response]
};