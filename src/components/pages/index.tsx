import React from "react";

import {Route, Routes, useNavigationType} from 'react-router-dom'

import {ROUTES} from "components/shared/configs";

import {RequireGuest} from "components/features/auth/require-guest";
import {RequireAuth} from "components/features/auth/require-auth";
import {Logout} from "components/features/auth/logout";

import {SpinnerWidget} from "components/widgets/spinner-widget";
import {AppHeader} from "components/widgets/app-header";
import {Content} from "components/widgets/content";

import {LeftHeader} from "components/widgets/profile/left-header";
import {ProfileForm} from "components/widgets/profile/profile-form";
import {ListOrders as ProfileListOrders} from "components/widgets/profile/list-orders";

import {BurgerConstructorPage} from "./burger-constructor-page";
import {IngredientDetailsPage} from "./ingredient-details-page";

import {FeedPage} from "./feed-page";

import {OrderCompositionPage} from "./order-composition-page";

import {LoginPage} from "./auth-pages/login-page";
import {SignupPage} from "./auth-pages/signup-page";
import {ForgotPage} from "./auth-pages/forgot-page";
import {ResetPage} from "./auth-pages/reset-page";




export const Pages = () => {
    const transitionType = useNavigationType()
    return (
        <>
            <SpinnerWidget/>
            <AppHeader/>
            <Content>
                <Routes>
                    <Route path='/' element={<BurgerConstructorPage/>}>
                        {/* Popup */}
                        <Route path={ROUTES.INGREDIENT_DETAIL} element={<IngredientDetailsPage  />}/>
                    </Route>

                    <Route path={ROUTES.FEED} element={<FeedPage/>}>
                        {/* Popup */}
                        {(transitionType !== 'POP') && <Route path={':id'} element={<OrderCompositionPage  />}/>}
                    </Route>
                    {(transitionType === 'POP') && <Route path={ROUTES.ORDER_IN_FEED} element={<OrderCompositionPage  />}/>}

                    {/*Guest pages*/}
                    <Route element={<RequireGuest/>}>
                        <Route path={ROUTES.LOGIN} element={<LoginPage/>}/>
                        <Route path={ROUTES.REGISTER} element={<SignupPage/>}/>
                        <Route path={ROUTES.FORGOT} element={<ForgotPage/>}/>
                        <Route path={ROUTES.RESET} element={<ResetPage/>}/>
                    </Route>
                    <Route path={ROUTES.LOGOUT} element={<Logout/>}/>

                    {/*Only Auth*/}
                    <Route element={<RequireAuth/>}>
                        <Route element={<LeftHeader/>}>
                            <Route path={ROUTES.PROFILE} element={<ProfileForm/>}/>
                            <Route path={ROUTES.ORDERS_IN_PROFILE} element={<ProfileListOrders/>}>
                                {/* Popup */}
                                {(transitionType !== 'POP') && <Route path={':id'} element={<OrderCompositionPage  />}/>}
                            </Route>
                        </Route>
                        {(transitionType === 'POP') && <Route path={ROUTES.ORDER_IN_PROFILE} element={<OrderCompositionPage  />}/>}
                    </Route>

                    <Route path={"*"} element={<p>404 :(</p>}/>
                </Routes>
            </Content>
        </>
    )
}