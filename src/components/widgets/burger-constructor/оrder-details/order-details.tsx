import React, {useCallback, useState} from "react";

import {Button} from "@ya.praktikum/react-developer-burger-ui-components";

import {clx} from "components/shared/utils";
import {Modal} from "components/shared/ui";

import CheckImage from 'images/check.png'
import styles from './order-details.module.css'


export const OrderDetails= ({...props}) =>{
    const [isOpen, setVisible] = useState(false)
    const order_id = '034536'

    const handleClose = useCallback(() =>{
        setVisible(false)
    }, [])

    const handleOpen = useCallback(() => {
        setVisible(true)
    }, [])

    return(
        <>
            <Button htmlType={'button'} onClick={handleOpen}>Оформить заказ</Button>
            { isOpen &&
                <Modal onClose={handleClose} extraClassContent="pt-20 pb-20">
                    <p className={'text text_type_digits-large'}>{order_id}</p>
                    <p className={'text text_type_main-medium mt-8'}>идентификатор заказа</p>
                    <img className={clx(styles.img, ['mt-15', 'mb-15'])} src={CheckImage} alt={'check'}/>
                    <p className={'text text_type_main-default mb-2'}>Ваш заказ начали готовить</p>
                    <p className={'text text_type_main-default text_color_inactive'}>
                        Дождитесь готовности на орбитальной станции
                    </p>
                </Modal>
            }
        </>
    )
}