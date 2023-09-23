import React from "react";

import { Route, Routes} from 'react-router-dom'

import {RoutesURL} from "components/shared/configs";

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
                    <Route path={RoutesURL.login} element={<LoginPage/>} />
                    <Route path={RoutesURL.register} element={<SignupPage/>} />
                    <Route path={RoutesURL.forgot} element={<ForgotPage/>} />
                    <Route path={RoutesURL.reset} element={<ResetPage/>} />
                </Routes>
            </Content>
        </>
    )
}