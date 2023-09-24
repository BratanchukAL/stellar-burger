import {useCallback} from "react"

import {useAppDispatch} from "components/providers/store"

import {RegisterBody} from "./api/types"
import {registerThunk} from "./thunk"


export const useHandleRegister = (state: RegisterBody): [()=>void] => {
    const dispatch = useAppDispatch()

    const onRegister = useCallback(()=>{
        dispatch(registerThunk(state))
    }, [state, dispatch])

    return [onRegister]
}