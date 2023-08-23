import React, {FC} from "react";

import DefaultImage from "@ya.praktikum/react-developer-burger-ui-components/dist/images/img.png";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './card-product.module.css'

interface CardProductProps{
    count?: number
    image?: string
    price: string | number
    caption: string

    extraClass?: string
}

//to entities
export const CardProduct: FC<CardProductProps> = (props) => {
    let counterElement = undefined
    if (props.count)
        counterElement = <Counter count={props.count} size="default" extraClass="m-1" />

    return (
        <div className={styles.card_content +' '+ props.extraClass}>
            <div className={styles.image_content}>
                {counterElement}
                <img width={240} height={120} src={props.image} alt={props.caption} className={'ml-4 mr-4'}/>
            </div>
            <div className={styles.currency_content + ' mt-1 mb-1'}>
                <span className="text text_type_digits-default p-2">{props.price}</span>
                <CurrencyIcon type="primary" />
            </div>

            <p className={styles.caption + ' text text_type_main-small'}>{props.caption}</p>
        </div>
    )
}

CardProduct.defaultProps = {
    image: DefaultImage,
    extraClass: '',
}