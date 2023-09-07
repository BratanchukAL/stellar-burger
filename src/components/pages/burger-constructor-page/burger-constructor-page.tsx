import React from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

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
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </DndProvider>
            </div>
        </section>
    )
}