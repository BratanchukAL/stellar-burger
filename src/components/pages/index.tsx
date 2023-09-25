import React from "react";

import { Route, Routes} from 'react-router-dom'

import {RoutesPath} from "components/shared/configs";

import {RequireGuest} from "components/features/auth/require-guest";
import {RequireAuth} from "components/features/auth/require-auth";

import {AppHeader} from "components/widgets/app-header";
import {Content} from "components/widgets/content";

import {BurgerConstructorPage} from "./burger-constructor-page";

import {LoginPage} from "./auth-pages/login-page";
import {SignupPage} from "./auth-pages/signup-page";
import {ForgotPage} from "./auth-pages/forgot-page";
import {ResetPage} from "./auth-pages/reset-page";


export const Pages = () =>{
    return(
        <>
            <AppHeader/>
            <Content>
                <Routes>
                    <Route path='/' element={<BurgerConstructorPage/>} />

                    {/*Auth pages*/}
                    <Route element={<RequireGuest />}>
                        <Route path={RoutesPath.login} element={<LoginPage/>} />
                        <Route path={RoutesPath.register} element={<SignupPage/>} />
                        <Route path={RoutesPath.forgot} element={<ForgotPage/>} />
                        <Route path={RoutesPath.reset} element={<ResetPage/>} />
                    </Route>
                {/* TODO    Страницу 404 */}
                </Routes>
            </Content>
        </>
    )
}