import React, {useCallback} from "react"

import {useAppDispatch} from "components/providers/store"

import {RegisterBody} from "./api/types"
import {registerThunk} from "./thunk"


export const useHandleRegister = (state: RegisterBody): [(e: React.SyntheticEvent<HTMLFormElement> )=>void] => {
    const dispatch = useAppDispatch()

    const onRegister = useCallback((e:React.SyntheticEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if (e.currentTarget.checkValidity())
            dispatch(registerThunk(state))
    }, [state, dispatch])

    return [onRegister]
}