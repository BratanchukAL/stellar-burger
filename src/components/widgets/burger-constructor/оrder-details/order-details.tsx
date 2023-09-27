import React, {FC, PropsWithChildren, useCallback} from "react";

import {clx} from "components/shared/utils";
import {Modal} from "components/shared/ui";
import {useVisible} from "components/shared/hooks";

import {useAppSelector} from "components/providers/store";

import {selectSelectedProductsState} from "components/entities/basket";
import {usePostOrderMutation} from "components/features/order";

import styles from './order-details.module.css'
import CheckImage from 'images/check.png'



export const OrderDetails: FC<PropsWithChildren>= ({children}) =>{
    const [isOpen, handleClose, handleOpen] = useVisible(false)
    //TODO: required Auth user
    const {bun: selectedBun, ingredients: selectedIngredients} = useAppSelector(selectSelectedProductsState)
    const [postOrder, response]= usePostOrderMutation()

    const order_id = response.data?.number


    const handleFetch = useCallback(async ()=>{
        let ingredients = selectedIngredients.reduce((prev: string[], current): string[]=>{
            prev = prev.concat([current.id])
            return prev
        }, [] as string[])
        if (selectedBun)
            ingredients = ingredients.concat([selectedBun])

        if (ingredients.length) {
            await postOrder({ingredients})
            handleOpen()
        }
    }, [selectedIngredients, selectedBun, handleOpen, postOrder])


    return(
        <>
            <div className={styles.click_children} onClick={handleFetch}>
                {children}
            </div>
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