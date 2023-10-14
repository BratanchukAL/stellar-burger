import React, {FC, useCallback} from "react";

import {useLocation, useNavigate} from "react-router-dom";

import DefaultImage from "@ya.praktikum/react-developer-burger-ui-components/dist/images/img.png";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import {clx} from "components/shared/utils";
import {ROUTES} from "components/shared/configs";
import {useDragItem} from "components/shared/hooks";

import {useAppDispatch} from "components/providers/store";
import {IProduct} from "components/entities/products";
import {ingredientDetailsActions} from "components/entities/products/ingredient-details";

import styles from './card-product.module.css'



interface CardProductProps{
    id: string
    productType: string
    count?: number
    image?: string
    price: number
    caption: string

    extraClass?: string

    details: IProduct
}

export const CardProduct: FC<CardProductProps> = (
    {
        id,
        productType,
        image = DefaultImage,
        extraClass = '',
        count = 0,
        details,
        ...props
    }
) => {
    const dispatch = useAppDispatch()
    const [dragRef] = useDragItem(id, productType)

    const navigate = useNavigate()
    const location = useLocation();

    const handleClick = useCallback(()=>{
        dispatch(ingredientDetailsActions.add(details))
        navigate(ROUTES.INGREDIENT_DETAIL.replace(':id', details._id), {state:{ background: location }})
    }, [dispatch, details, navigate, location])


    let counterElement = undefined
    if (count)
        counterElement = <Counter count={count} size="default" extraClass="m-1" />

    return (
        <div className={clx(styles.card_content, [extraClass, styles.drag_place])}
             ref={dragRef}
             onClick={handleClick}
        >
            <div className={styles.image_content}>
                {counterElement}
                <img src={image}
                     alt={props.caption}
                     className={clx(styles.img, ['ml-4', 'mr-4'])}
                />
            </div>
            <div className={clx(styles.currency_content, ['mt-1', 'mb-1'])}>
                <span className="text text_type_digits-default p-2">{props.price}</span>
                <CurrencyIcon type="primary" />
            </div>

            <p className={clx(styles.caption, ['text', 'text_type_main-small'])}>{props.caption}</p>
        </div>
    )
}
