import React, {useEffect} from 'react'

import {useAppDispatch, useAppSelector} from "components/providers/store";

import {ErrorText} from "components/shared/ui";

import {
    ordersAllOfUserWSDisconnectAction,
    ordersAllOfUserWSStartAction,
} from "components/entities/order";
import {OrderCard} from "components/entities/order/ui/order-card";
import {selectOrdersAllOfUser} from "components/entities/order";

import {useGetProductsQuery} from "components/entities/products";
import {ProductsShortComposition} from "components/entities/products/ui/products-short-composition";

import styles from './list-orders.module.css'
import {CalcPrice} from "components/features/calc-price";




export const ListOrders = () => {
    const dispatch = useAppDispatch()
    const {isStreaming, data: {orders}, isError:isErrorWs, error:errorWs} = useAppSelector(selectOrdersAllOfUser)


    const {
        data: products = [],
        isError,
        error
    } = useGetProductsQuery()

    useEffect(()=>{

        !isStreaming && !isErrorWs && dispatch(ordersAllOfUserWSStartAction())

        return ()=>{
            isStreaming && dispatch(ordersAllOfUserWSDisconnectAction())
        }
    }, [dispatch, isStreaming, isErrorWs])


    return(<>
        {
            isErrorWs ? <ErrorText message={errorWs} extraClass="mt-6"/> :
            isError ? <ErrorText message={(error as any)?.error} extraClass="mt-6"/> :
            products &&
                <section className={styles.box}>
                    {!!orders.length && orders.map((v) => {
                        return (
                            <OrderCard key={v.number} order={v}
                                childrenComposition={
                                    <ProductsShortComposition ids={v.ingredients} products={products}/>
                                }
                               childrenCalcPrice={<CalcPrice ids={v.ingredients} products={products}/>}
                            />
                        )
                    })}
                </section>
        }
        </>
    )
}