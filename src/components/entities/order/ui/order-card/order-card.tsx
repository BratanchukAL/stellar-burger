import React, {FC} from 'react'

import {FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";

import {clx} from "components/shared/utils";

import {IOrder} from "../../models";

import styles from './order-card.module.css'



const StatusDictionary = {
    done: 'Готово',
    created: 'Создан',
    pending: 'Готовится',
    cancelled: 'Отменен'
}


interface IOrderCardProps {
    order: IOrder
    childrenComposition: React.ReactNode
    childrenCalcPrice: React.ReactNode
}


export const OrderCard:FC<IOrderCardProps> = ({order, childrenComposition, childrenCalcPrice}) => {
    const date = new Date(order.createdAt)


    return(
        <div className={clx(styles.content, ['p-6'])}>
            <div className={styles.item_info}>
                <p className="text text_type_digits-default">#{order.number}</p>
                <FormattedDate className="text text_type_main-default text_color_inactive" date={date} />
            </div>
            <div className={clx(styles.item_info, ['pt-6'])}>
                <p className="text text_type_main-medium">{order.name}</p>
            </div>
            <div className={clx(styles.item_info, ['pt-2'])}>
                <p className="text text_type_main-default">{StatusDictionary[order.status]}</p>
            </div>
            <div className={clx(styles.item_info, ['pt-6'])}>
                {childrenComposition}
                {childrenCalcPrice}
            </div>
        </div>
    )
}