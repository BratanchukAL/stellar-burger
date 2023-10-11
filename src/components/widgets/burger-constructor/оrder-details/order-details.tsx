import React, {FC, PropsWithChildren, useCallback} from "react";
import { useNavigate } from "react-router-dom";

import {useAppDispatch, useAppSelector} from "components/providers/store";

import {clx} from "components/shared/utils";
import {ErrorText, Modal} from "components/shared/ui";
import {useVisible} from "components/shared/hooks";
import {ROUTES} from "components/shared/configs";

import {selectIsAuthed} from "components/entities/session";
import {spinnerActions} from "components/entities/spinner";

import {selectSelectedProductsState} from "components/entities/basket";
import {usePostOrderMutation} from "components/features/order";

import styles from './order-details.module.css'
import CheckImage from 'images/check.png'



export const OrderDetails: FC<PropsWithChildren>= ({children}) =>{
    const [isOpen, handleClose, handleOpen] = useVisible(false)
    const dispatch = useAppDispatch()

    const navigate = useNavigate()
    const isAuthed = useAppSelector(selectIsAuthed)

    const {bun: selectedBun, ingredients: selectedIngredients} = useAppSelector(selectSelectedProductsState)
    const [postOrder, response]= usePostOrderMutation()

    const order_id = response.data?.number


    const handleFetch = useCallback(async ()=>{
        if (!isAuthed) //TODO wrap in protected Button
            navigate(ROUTES.LOGIN)

        let ingredients = selectedIngredients.reduce((prev: string[], current): string[]=>{
            prev = prev.concat([current.id])
            return prev
        }, [] as string[])
        if (selectedBun)
            ingredients = ingredients.concat([selectedBun])

        if (ingredients.length) {
            dispatch(spinnerActions.start("Ваш заказ оформляется. Подождите..."))
            await postOrder({ingredients})
            handleOpen()
        }
    }, [selectedIngredients, selectedBun, handleOpen, postOrder, isAuthed, navigate])


    return(
        <>
            <div className={styles.click_children} onClick={handleFetch}>
                {response.isLoading && <span>Загрузка...</span>}{children}
            </div>
            { isOpen &&
                <Modal onClose={handleClose} extraClassContent="pt-20 pb-20">
                    <ErrorText message={(response?.error as any)?.data?.message} extraClass="mb-6"/>

                    <p className={'text text_type_digits-large'}>{order_id}</p>
                    <p className={'text text_type_main-medium mt-8'}>идентификатор заказа</p>
                    {response.isSuccess &&
                        <img className={clx(styles.img, ['mt-15', 'mb-15'])} src={CheckImage} alt={'check'}/>
                    }
                    <p className={'text text_type_main-default mb-2'}>Ваш заказ начали готовить</p>
                    <p className={'text text_type_main-default text_color_inactive'}>
                        Дождитесь готовности на орбитальной станции
                    </p>
                </Modal>
            }
        </>
    )
}