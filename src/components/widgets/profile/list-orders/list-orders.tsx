import React, {useCallback, useEffect} from 'react'
import {Outlet, useNavigate} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from "components/providers/store";

import {ROUTES} from "components/shared/configs";
import {ErrorText} from "components/shared/ui";

import {
    ordersAllOfUserWSDisconnectAction,
    ordersAllOfUserWSStartAction,
    useSortOrders
} from "components/entities/order";
import {OrderCard} from "components/entities/order/ui/order-card";
import {selectOrdersAllOfUser} from "components/entities/order";

import {useGetProductsQuery} from "components/entities/products";
import {ProductsShortComposition} from "components/entities/products/ui/products-short-composition";

import {CalcPrice} from "components/features/calc-price";

import styles from './list-orders.module.css'




export const ListOrders = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
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


    const ordersSorted = useSortOrders(orders)

    const onClickCard = useCallback((number:number)=>{
        navigate(ROUTES.ORDER_IN_PROFILE.replace(':id', String(number)))
    }, [navigate])


    if (isError) return <ErrorText message={(error as any)?.error} extraClass="mt-6"/>
    if (isErrorWs) return <ErrorText message={errorWs} extraClass="mt-6"/>

    return(<>
        <Outlet/>

        {products &&
            <section className={styles.box}>
                {!!ordersSorted.length && ordersSorted.map((v) => {
                    return (
                        <OrderCard key={v.number} order={v}
                            onClick={onClickCard}
                            childrenComposition={
                                <ProductsShortComposition ids={v.ingredients} products={products}/>
                            }
                           childrenCalcPrice={<CalcPrice ids={v.ingredients} products={products}/>}
                        />

                    )
                })}
            </section>
        }
    </>)
}