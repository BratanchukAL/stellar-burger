import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";

import {useAppDispatch} from 'components/providers/store';

import {IOrder, orderAPI} from "components/entities/order";

import {OrderCompositionWidget} from "components/widgets/order-composition-widget";

import styles from './order-composition-page.module.css'




export const OrderCompositionPage = () =>{
    const id_param = useParams().id
    const dispatch = useAppDispatch()
    const [order, setOrder] = useState<IOrder>({} as IOrder)

    useEffect(()=>{
        dispatch(orderAPI.endpoints.getOrder.initiate({number: Number(id_param)}))
            .then((response)=>setOrder(response.data as IOrder))
    }, [dispatch, id_param])


    return(
        <>
            <section className={styles.page}>
                <OrderCompositionWidget order={order}/>
            </section>
        </>
    )
}