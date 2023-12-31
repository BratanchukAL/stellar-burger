import React, {useCallback, useEffect, useMemo} from "react";

import {useLocation, useNavigate, useParams} from "react-router-dom";

import {ErrorText, Modal} from "components/shared/ui";
import {ROUTES} from "components/shared/configs";

import {useAppDispatch, useAppSelector} from "components/providers/store";

import {
    ingredientDetailsActions,
    selectCurrentIngredientDetailsState
} from "components/entities/products/ingredient-details";

import {IProduct, useGetProductsQuery} from "components/entities/products";

import {IngredientDetails} from "components/widgets/burger-ingredients";

import styles from './ingredient-details-page.module.css'



export const IngredientDetailsPage = () => {
    const dispatch = useAppDispatch()

    const navigate = useNavigate()
    const location = useLocation();
    const id_param = useParams<{id: string}>().id
    const background = location.state && location.state.background;

    const {isOpen: isOpenModal, details: currentDetails} = useAppSelector(selectCurrentIngredientDetailsState)

    const {
        data: products = [],
        isError,
        error
    } = useGetProductsQuery()

    const details = useMemo<IProduct | undefined>(()=>{
        if (!isOpenModal)
            if (products.length)
                return products.find((v)=>v._id === id_param)
        return currentDetails
    },[currentDetails, products, isOpenModal])


    useEffect((): void=>{
        if (!background)
            dispatch(ingredientDetailsActions.clean())
    },[dispatch, background])

    const handleClose = useCallback(()=>{
            dispatch(ingredientDetailsActions.clean())
            navigate(ROUTES.HOME)
    }, [dispatch, navigate])


    if (isError) return <ErrorText message={(error as any)?.error} extraClass="mt-6"/>

    return(
        <>
            {!details && <div>Не найден такой ингредиент</div>}
            {isOpenModal && background && details?._id &&
                <Modal onClose={handleClose} extraClassContent="pb-5">
                    <IngredientDetails details={details}/>
                </Modal>
            }
            {!isOpenModal && details?._id &&
                <section className={styles.page}>
                    <IngredientDetails details={details}/>
                </section>
            }
        </>
    )
}