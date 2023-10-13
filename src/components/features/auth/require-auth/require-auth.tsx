import React from 'react'
import { useSelector } from "react-redux"
import { useLocation, Navigate, Outlet } from "react-router-dom"

import {ROUTES} from "components/shared/configs";

import {selectIsAuthChecked, selectIsAuthed} from "components/entities/session";



export const RequireAuth = () => {
    const isAuthChecked = useSelector(selectIsAuthChecked)
    const isAuthed = useSelector(selectIsAuthed)
    const location = useLocation()

    if (!isAuthChecked) {
         // Запрос еще выполняется
         // Выводим прелоадер в ПР
        return <div>Проверка токена...</div>;
    }

    return (
        isAuthed
            ? <Outlet />
            : <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
   )
}