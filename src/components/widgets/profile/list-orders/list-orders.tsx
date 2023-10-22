import React from 'react'

import {OrderCard} from "components/entities/order/ui/order-card";

import styles from './list-orders.module.css'



export const ListOrders = () => {
    return(
        <section className={styles.box}>
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
        </section>
    )
}