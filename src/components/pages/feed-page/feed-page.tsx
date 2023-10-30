import React from "react"

import {ListOrders} from "components/widgets/feed/list-orders";
import {Dashboard} from "components/widgets/feed/dashboard";

import styles from "./feed-page.module.css"




export const FeedPage = () => {
    return(
        <>
            <section className={styles.page}>
                <p className={styles.title}>
                    Лента заказов
                </p>
                <div className={styles.content}>
                    <ListOrders/>
                    <Dashboard/>
                </div>
            </section>
        </>
    )
}