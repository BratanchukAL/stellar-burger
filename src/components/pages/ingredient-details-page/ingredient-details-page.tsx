import React, {useCallback, useMemo} from "react";

import {useNavigate, useParams} from "react-router-dom";

import {Modal} from "components/shared/ui";
import {RoutesPath} from "components/shared/configs";

import {useAppDispatch, useAppSelector} from "components/providers/store";

import {
    ingredientDetailsActions,
    selectCurrentIngredientDetailsState
} from "components/entities/products/ingredient-details";

import {useGetProductsQuery} from "components/entities/products";

import {IngredientDetails} from "components/widgets/burger-ingredients";

import styles from './ingredient-details-page.module.css'



export const IngredientDetailsPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const id_param = useParams().id

    const {isOpen: isOpenModal, details: currentDetails} = useAppSelector(selectCurrentIngredientDetailsState)

    const {
        data: products = [],
        // isLoading,
        // isSuccess,
        // isError,
        // error
    } = useGetProductsQuery()

    const details = useMemo(()=>{
        if (!isOpenModal)
            if (products.length)
                return products.find((v)=>v._id === id_param)!
        return currentDetails
    },[currentDetails, products, isOpenModal])


    const handleClose = useCallback(()=>{
            dispatch(ingredientDetailsActions.clean())
            navigate(RoutesPath.home)
    }, [dispatch, navigate])

    return(
        <>
            {isOpenModal &&
                <Modal onClose={handleClose} extraClassContent="pb-5">
                    <IngredientDetails details={details}/>
                </Modal>
            }
            <section className={styles.page}>
                {!isOpenModal &&
                    <IngredientDetails details={details}/>
                }
            </section>
        </>
    )
}