import React, {FC, useCallback} from "react";
import PropTypes from "prop-types";

import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import DefaultImage from "@ya.praktikum/react-developer-burger-ui-components/dist/images/img.png";

import {useDragDropItem} from "components/shared/hooks/useDragDropItem";
import {useAppDispatch} from "components/providers/store";
import {basketActions} from "components/entities/basket";

import styles from './card-position.module.css'


interface CardPositionProps{
    id: string;
    index: number;
    typeProduct: string;
    text: string;
    thumbnail?: string;
    price: number;
    type?: 'top' | 'bottom';
    isLocked?: boolean;
    extraClass?: string;
    handleClose?: () => void;
}

export const CardPosition: FC<CardPositionProps> = (
    {
        id, index, typeProduct,
        thumbnail= DefaultImage,
        isLocked = false,
        ...props
    }
)=>{
    const dispatch = useAppDispatch()

    const handleDropItem = useCallback((fromIndex: number, toIndex: number)=>{
        dispatch(basketActions.move({fromIndex, toIndex}))
    }, [])

    const [dropRef, isDragging] = useDragDropItem(
        ['sauce+constructor', 'main+constructor'],
        id,
        index,
        `${typeProduct}+constructor`,
        handleDropItem
    )

    let extraProps = {ref: dropRef }
    if (isLocked)
        extraProps = {ref: ()=>{}}

    const opacity = isDragging ? 0 : 1

    return(
        <div className={styles.content} style={{opacity}} {...extraProps}>
            <span className={styles.drag_place}>
                {!isLocked && <DragIcon type="primary"/>}
            </span>
            <ConstructorElement
                thumbnail={thumbnail as string}
                isLocked={isLocked}
                {...props}
                />
        </div>
    )
}


CardPosition.propTypes = {
    text: PropTypes.string.isRequired,
    thumbnail: PropTypes.string,
    price: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['top' , 'bottom']),
    isLocked: PropTypes.bool,
    extraClass: PropTypes.string,
    handleClose: PropTypes.func,
}