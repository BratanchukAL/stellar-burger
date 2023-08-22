import React, {FC} from "react";
import {AppHeader} from "components/widgets/app-header";
import {BurgerConstructor} from "components/widgets/burger-constructor";
import {BurgerIngredients} from "components/widgets/burger-ingredients";


export const Pages = () =>{
    return(
        <>
            <AppHeader/>
            <BurgerConstructor/>
            <BurgerIngredients/>
        </>
    )
}