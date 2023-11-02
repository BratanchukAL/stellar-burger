import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {useNavigate, useParams, useNavigationType} from "react-router-dom";

import {useAppDispatch, useAppSelector} from 'components/providers/store';

import {ROUTES} from "components/shared/configs";
import {Modal} from "components/shared/ui";

import {IOrder, orderAPI, selectOrdersAll, selectOrdersAllOfUser} from "components/entities/order";

import {OrderCompositionWidget} from "components/widgets/order-composition-widget";

import styles from './order-composition-page.module.css'




export const OrderCompositionPage = () =>{
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const transitionType = useNavigationType()
    const id_param = useParams().id

    const [order, setOrder] = useState<IOrder | null>(null)

    const {isStreaming, data: {orders}} = useAppSelector(selectOrdersAll)
    const {isStreaming:isStreamingOfUser, data: {orders: ordersOfUser}} = useAppSelector(selectOrdersAllOfUser)

    useEffect(()=>{
        if(transitionType === 'POP')
            dispatch(orderAPI.endpoints.getOrder.initiate({number: Number(id_param)}))
                .then((response)=>setOrder(response.data as IOrder))
    }, [dispatch, id_param, transitionType])


    const currentOrder: IOrder | null = useMemo<IOrder | null>(()=>{
        let r = null as IOrder | null
        if (orders.length)
            r = orders.find((v)=> v.number === Number(id_param))!
        else if (ordersOfUser.length)
            r = ordersOfUser.find((v)=> v.number === Number(id_param))!
        else if (order?.ingredients)
            r = order

        return r as IOrder
    },
    [id_param, orders, ordersOfUser, order])


    const handleClose = useCallback(()=>{
        if(isStreamingOfUser)
            navigate(ROUTES.ORDERS_IN_PROFILE)
        else if(isStreaming)
            navigate(ROUTES.FEED)
    }, [navigate, isStreamingOfUser, isStreaming])


    const isNotEmptyCurrentOrder: boolean = Boolean(currentOrder && currentOrder?.ingredients.length)
    const isEmptyCurrentOrder: boolean = Boolean(currentOrder && !currentOrder?.ingredients.length)

    return(
        <>
            {isEmptyCurrentOrder && <div>Не найден такой заказ</div>}
            {isNotEmptyCurrentOrder
            && (transitionType !== 'POP') &&

                <Modal onClose={handleClose}>
                    <div className={styles.content_modal}>
                        <OrderCompositionWidget order={currentOrder!}/>
                    </div>
                </Modal>
            }
            {isNotEmptyCurrentOrder
            && (transitionType === 'POP') &&

                <section className={styles.page}>
                    <OrderCompositionWidget order={currentOrder!}/>
                </section>
            }
        </>
    )
}