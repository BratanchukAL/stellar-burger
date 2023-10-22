import React, {FC} from "react";

import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import {clx} from "components/shared/utils";

import styles from './price-with-currency.module.css'



interface IPriceWithCurrencyProps{
    price: number,
    size?: 'medium' | 'default' | 'large'
}

export const PriceWithCurrency:FC<IPriceWithCurrencyProps> = ({price, size='default'}) => {
    return (
        <p className={clx(styles.content, ["text",  `text_type_digits-${size}`])}>{price}&nbsp;
            <CurrencyIcon type="primary" />
        </p>
    )
}