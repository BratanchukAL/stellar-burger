import React, {FC, useCallback} from "react";
import PropTypes from "prop-types";

import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import DefaultImage from "@ya.praktikum/react-developer-burger-ui-components/dist/images/img.png";

import {useDragDropItem} from "components/shared/hooks/useDragDropItem";
import {useAppDispatch} from "components/providers/store";

import styles from './card-position.module.css'
import {basketActions} from "../../../entities/basket";



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

    const [ref, handlerId, isDragging] = useDragDropItem(
        ['sauce', 'main'],
        id,
        index,
        typeProduct,
        handleDropItem
    )
    const opacity = isDragging ? 0 : 1

    return(
        <div className={styles.content} style={{opacity}} ref={ref} data-handler-id={handlerId} >
            <span className={styles.drag_place}>
                {!isLocked && <DragIcon type="primary" />}
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