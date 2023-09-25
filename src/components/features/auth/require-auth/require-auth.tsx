import React from 'react'

import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

import {RoutesPath} from "components/shared/configs";

import {selectIsAuthed} from "components/entities/session";



export const RequireAuth = () => {
    const isAuthed = useSelector(selectIsAuthed)
    const location = useLocation()

    return (
        isAuthed
            ? <Outlet />
            : <Navigate to={RoutesPath.login} state={{ from: location }} replace />
   )
}