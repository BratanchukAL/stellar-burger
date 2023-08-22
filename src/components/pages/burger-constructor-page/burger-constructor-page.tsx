import {BurgerIngredients} from "components/widgets/burger-ingredients";
import {BurgerConstructor} from "components/widgets/burger-constructor";
import React from "react";


export const BurgerConstructorPage = () => {
    return(
        <>
            <BurgerIngredients/>
            <BurgerConstructor/>
        </>
    )
}