import React from "react";

import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import {CardPosition} from "./card-position/card-position";

import styles from './burger-constructor.module.css'

export const BurgerConstructor = () => {
    const price = 610

    return (
        <section>
            <div className={styles.content + ' pl-4 pr-4 mb-10'} >
                <CardPosition
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                />
                <div className={styles.box}>
                    <CardPosition
                        text="Краторная булка N-200i (верх)"
                        price={50}
                    />
                    <CardPosition
                            text="Краторная булка N-200i (верх)"
                            price={50}
                        />
                    <CardPosition
                            text="Краторная булка N-200i (верх)"
                            price={50}
                        />
                    <CardPosition
                            text="Краторная булка N-200i (верх)"
                            price={50}
                        />
                    <CardPosition
                            text="Краторная булка N-200i (верх)"
                            price={50}
                        />
                    <CardPosition
                            text="Краторная булка N-200i (верх)"
                            price={50}
                        />
                </div>
                <CardPosition
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                />
            </div>
            <div className={styles.button_order}>
                <span className="mr-10">
                    <p className="text text_type_digits-medium">{price}&nbsp;<CurrencyIcon type="primary" /></p>
                </span>
                <Button htmlType={'button'}>Оформить заказ</Button>
            </div>
        </section>
    );
}