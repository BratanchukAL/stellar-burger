import React from "react";
import {Outlet, useMatch} from "react-router-dom";

import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

import {RoutesPath} from "components/shared/configs";
import {useAppSelector} from "components/providers/store";
import {selectCurrentIngredientDetailsState} from "components/entities/products/ingredient-details";

import {BurgerIngredients} from "components/widgets/burger-ingredients";
import {BurgerConstructor} from "components/widgets/burger-constructor";

import styles from './burger-constructor-page.module.css'



export const BurgerConstructorPage = () => {
    const isModalMatch = Boolean(useMatch(RoutesPath.ingredient_detail))
    const {isOpen: isOpenModal} = useAppSelector(selectCurrentIngredientDetailsState)

    return(
        <>
            {/*IngredientDetailsPage*/}
            <Outlet/>
            {(!isModalMatch || isOpenModal) &&
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
            }
        </>
    )
}