import React from "react"

import {ListOrders} from "components/widgets/feed/list-orders";

import styles from "./feed-page.module.css"




export const FeedPage = () => {
    return(
        <>
            <section className={styles.page}>
                <p className={styles.title}>
                    Лента заказов
                </p>
                <ListOrders/>
            </section>
        </>
    )
}