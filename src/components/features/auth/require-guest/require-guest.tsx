import React from 'react'
import { useLocation, Navigate, Outlet } from "react-router-dom"

import {useAppSelector} from "components/providers/store";

import {ROUTES} from "components/shared/configs";

import {selectIsAuthed} from "components/entities/session";



export const RequireGuest = () => {
    const isAuthed = useAppSelector(selectIsAuthed)
    const location = useLocation()

    const {from} = location.state || { from: { pathname: ROUTES.HOME } }

    return (
        !isAuthed
            ? <Outlet />
            : <Navigate to={from} replace/>
   )
}