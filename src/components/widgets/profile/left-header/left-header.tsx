import React from "react";
import {Outlet, useMatch} from "react-router-dom"

import {ButtonLink} from "components/shared/ui";
import {ROUTES} from "components/shared/configs";

import styles from './left-header.module.css'


export const LeftHeader = () => {
    const isMatchProfile = Boolean(useMatch(ROUTES.PROFILE))
    const isMatchOrdersInProfile = Boolean(useMatch(ROUTES.ORDERS_IN_PROFILE))

    return (
        <section className={styles.container + " p-10"}>
            <section>
                <nav className={styles.header}>
                    <ButtonLink to={ROUTES.PROFILE} size="large">
                        Профиль
                    </ButtonLink>
                    <ButtonLink to={ROUTES.ORDERS_IN_PROFILE} size="large">
                        История заказов
                    </ButtonLink>
                    <ButtonLink to={ROUTES.LOGOUT} size="large">
                        Выход
                    </ButtonLink>
                </nav>
                {isMatchProfile &&
                    <p className="text text_type_main-default text_color_inactive mt-20">
                        В этом разделе вы можете <br/> изменить свои персональные данные
                    </p>
                }{isMatchOrdersInProfile &&
                    <p className="text text_type_main-default text_color_inactive mt-20">
                        В этом разделе вы можете <br/> посмотреть свою историю заказов
                    </p>
                }
            </section>
            <section className={styles.right + " ml-15"}>
                <Outlet/>
            </section>
        </section>
    )
}