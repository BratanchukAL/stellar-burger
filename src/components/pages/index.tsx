import React from "react";

import { Route, Routes} from 'react-router-dom'

import {RoutesPath} from "components/shared/configs";

import {RequireGuest} from "components/features/auth/require-guest";
import {RequireAuth} from "components/features/auth/require-auth";
import {Logout} from "components/features/auth/logout";

import {SpinnerWidget} from "components/widgets/spinner-widget";
import {AppHeader} from "components/widgets/app-header";
import {Content} from "components/widgets/content";

import {LeftHeader} from "components/widgets/profile/left-header";
import {ProfileForm} from "components/widgets/profile/profile-form";

import {BurgerConstructorPage} from "./burger-constructor-page";
import {IngredientDetailsPage} from "./ingredient-details-page";

import {LoginPage} from "./auth-pages/login-page";
import {SignupPage} from "./auth-pages/signup-page";
import {ForgotPage} from "./auth-pages/forgot-page";
import {ResetPage} from "./auth-pages/reset-page";



export const Pages = () => {
    return (
        <>
            <SpinnerWidget/>
            <AppHeader/>
            <Content>
                <Routes>
                    <Route path='/' element={<BurgerConstructorPage/>}>
                        <Route path={RoutesPath.ingredient_detail} element={<IngredientDetailsPage  />}/>
                    </Route>

                    {/*Guest pages*/}
                    <Route element={<RequireGuest/>}>
                        <Route path={RoutesPath.login} element={<LoginPage/>}/>
                        <Route path={RoutesPath.register} element={<SignupPage/>}/>
                        <Route path={RoutesPath.forgot} element={<ForgotPage/>}/>
                        <Route path={RoutesPath.reset} element={<ResetPage/>}/>
                    </Route>
                    <Route path={RoutesPath.logout} element={<Logout/>}/>

                    {/*Only Auth*/}
                    <Route element={<RequireAuth/>}>
                        <Route path={RoutesPath.application_tape} element={<p>В разработке...</p>}/>
                        <Route element={<LeftHeader/>}>
                            <Route path={RoutesPath.profile} element={<ProfileForm/>}/>
                            <Route path={RoutesPath.orders_in_profile} element={<p>В разработке...</p>}/>
                        </Route>
                    </Route>

                    <Route path={"*"} element={<p>404 :(</p>}/>
                </Routes>
            </Content>
        </>
    )
}