import React, {FC} from "react";

import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import {clx} from "components/shared/utils";

import styles from './price-with-currency.module.css'



interface IPriceWithCurrencyProps{
    price: string | number
    size?: 'medium' | 'default' | 'large'
    extraClassName?: string
}

export const PriceWithCurrency:FC<IPriceWithCurrencyProps> = ({price, size='default', extraClassName}) => {
    return (
        <p className={clx(styles.content, ["text",  `text_type_digits-${size}`, extraClassName as string])}>{price}&nbsp;
            <CurrencyIcon type="primary" />
        </p>
    )
}