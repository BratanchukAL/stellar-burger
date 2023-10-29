import React, {useEffect} from 'react'

import {useAppDispatch, useAppSelector} from "components/providers/store";

import {ErrorText} from "components/shared/ui";

import {
    ordersAllWSDisconnectAction,
    ordersAllWSStartAction,
} from "components/entities/order";
import {OrderCard} from "components/entities/order/ui/order-card";
import {selectOrdersAll} from "components/entities/order";

import {useGetProductsQuery} from "components/entities/products";
import {ProductsShortComposition} from "components/entities/products/ui/products-short-composition";

import {CalcPrice} from "components/features/calc-price";

import styles from './list-orders.module.css'




export const ListOrders = () => {
    const dispatch = useAppDispatch()
    const {isStreaming, data: {orders}, isError:isErrorWs, error:errorWs} = useAppSelector(selectOrdersAll)


    const {
        data: products = [],
        isError,
        error
    } = useGetProductsQuery()

    useEffect(()=>{

        !isStreaming && !isErrorWs && dispatch(ordersAllWSStartAction())

        return ()=>{
            isStreaming && dispatch(ordersAllWSDisconnectAction())
        }
    }, [dispatch, isStreaming, isErrorWs])


    return(<>
        {
            isErrorWs ? <ErrorText message={errorWs} extraClass="mt-6"/> :
            isError ? <ErrorText message={(error as any)?.error} extraClass="mt-6"/> :
            products &&
                <section className={styles.box}>
                    {orders && orders.map((v) => {
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