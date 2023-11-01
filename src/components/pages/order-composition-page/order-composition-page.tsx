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

    const [order, setOrder] = useState<IOrder>({} as IOrder)

    const {isStreaming, data: {orders}} = useAppSelector(selectOrdersAll)
    const {isStreaming:isStreamingOfUser, data: {orders: ordersOfUser}} = useAppSelector(selectOrdersAllOfUser)

    useEffect(()=>{
        if (!isStreaming || !isStreamingOfUser)
            dispatch(orderAPI.endpoints.getOrder.initiate({number: Number(id_param)}))
                .then((response)=>setOrder(response.data as IOrder))
    }, [dispatch, id_param])


    const currentOrder: IOrder | undefined = useMemo<IOrder>(()=>{
        let r = {} as IOrder | undefined
        if (isStreaming)
            r = orders.find((v)=> v.number === Number(id_param))
        else if (isStreamingOfUser)
            r = ordersOfUser.find((v)=> v.number === Number(id_param))
        else if (order?.ingredients)
            r = order

        return r as IOrder
    },
    [id_param, orders, ordersOfUser, isStreaming, isStreamingOfUser, order])


    const handleClose = useCallback(()=>{
            navigate(ROUTES.ORDERS_IN_PROFILE)
    }, [navigate])


    return(
        <>
            {!currentOrder?.ingredients && <div>Не найден такой заказ</div>}
            {currentOrder?.ingredients && (transitionType !== 'POP') &&

                <Modal onClose={handleClose}>
                    <div className={styles.content_modal}>
                        <OrderCompositionWidget order={currentOrder}/>
                    </div>
                </Modal>
            }
            {currentOrder?.ingredients && (transitionType === 'POP') &&

                <section className={styles.page}>
                    <OrderCompositionWidget order={currentOrder}/>
                </section>
            }
        </>
    )
}