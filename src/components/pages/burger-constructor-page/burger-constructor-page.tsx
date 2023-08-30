import React from "react";

import {BurgerIngredients} from "components/widgets/burger-ingredients";
import {BurgerConstructor} from "components/widgets/burger-constructor";

import styles from './burger-constructor-page.module.css'


export const BurgerConstructorPage = () => {
    return(
        <section className={styles.page}>
            <p className={styles.title}>
                Соберите бургер
            </p>
            <div className={styles.ingredients_and_constructor}>
                <BurgerIngredients/>
                <BurgerConstructor/>
            </div>
        </section>
    )
}