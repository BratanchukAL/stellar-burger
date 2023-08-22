import React, {useState} from "react"

import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";


export const BurgerIngredients = () => {
    const [current, setCurrent] = useState('TabBuns')
    return (
        <div style={{display: 'flex'}}>
            <Tab value="TabBuns" active={current === 'TabBuns'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value="TabSauces" active={current === 'TabSauces'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value="TabToppings" active={current === 'TabToppings'} onClick={setCurrent}>
                Начинки
            </Tab>
        </div>
    )
};