import React from "react";
import {
    BurgerIcon, ListIcon,
    Logo, ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {RoutesPath} from "components/shared/configs";
import { ButtonLink } from "components/shared/ui";

import styles from './app-header.module.css'


export const AppHeader = ()=>{
    return(
        <header>
            <nav  className={styles.navbar + ' ' + 'pt-4 pb-4'}>
                <div>
                    <ButtonLink to={RoutesPath.home} extraClass={'mr-2'} active>
                        <BurgerIcon type="primary" />Конструктор
                    </ButtonLink>
                    <ButtonLink to={RoutesPath.orders}>
                        <ListIcon type="secondary" />Лента заявок
                    </ButtonLink>
                </div>
                <div className={styles.brand}>
                    <Logo />
                </div>
                 <ButtonLink to={RoutesPath.profile}>
                    <ProfileIcon type="secondary" />Личный кабинет
                 </ButtonLink>
            </nav>
        </header>
    )
}

