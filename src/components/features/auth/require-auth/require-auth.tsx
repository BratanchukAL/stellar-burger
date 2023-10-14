import React from 'react'
import { useLocation, Navigate, Outlet } from "react-router-dom"

import {ROUTES} from "components/shared/configs";

import {useAppSelector} from "components/providers/store";

import {selectIsAuthChecked, selectIsAuthed} from "components/entities/session";



export const RequireAuth = () => {
    const isAuthChecked = useAppSelector(selectIsAuthChecked)
    const isAuthed = useAppSelector(selectIsAuthed)
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