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

    const handleMoveItem = useCallback((fromIndex: number, toIndex: number)=>{
        dispatch(basketActions.move({fromIndex, toIndex}))
    }, [dispatch])

    const handleDelete = useCallback(()=>{
        dispatch(basketActions.delete(index))
    }, [dispatch, index])

    const [dragRef, dropRef, previewRef, isDragging] = useDragDropItem(
        ['sauce+constructor', 'main+constructor'],
        id,
        index,
        `${typeProduct}+constructor`,
        handleMoveItem
    )

    let extraDragDropProps = {ref: (r: any)=>{
        dropRef.current = r
        previewRef(r)
    } }

    if (isLocked)
        extraDragDropProps = {ref: ()=>{}}

    const opacity = isDragging ? 0 : 1

    return(
        <div className={styles.content} style={{opacity}} {...extraDragDropProps}>
            <span className={styles.drag_place}>
                {!isLocked && <span ref={dragRef}><DragIcon type="primary"/></span>}
            </span>

            <ConstructorElement
                thumbnail={thumbnail as string}
                isLocked={isLocked}
                handleClose={handleDelete}
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
}