import React, {FC} from "react";

import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import DefaultImage from "@ya.praktikum/react-developer-burger-ui-components/dist/images/img.png";

import styles from './card-position.module.css'

interface CardPositionProps{
    text: string;
    thumbnail?: string;
    price: number;
    type?: 'top' | 'bottom';
    isLocked?: boolean;
    extraClass?: string;
    handleClose?: () => void;
}

export const CardPosition: FC<CardPositionProps> = (props)=>{
    const {thumbnail, isLocked, ...other} = props

    return(
        <div className={styles.content}>
            <span style={{width:32}}>
                {!isLocked && <DragIcon type="primary" />}
            </span>
            <ConstructorElement
                thumbnail={thumbnail as string}
                {...other}
                />
        </div>
    )
}

CardPosition.defaultProps={
    thumbnail: DefaultImage,
    isLocked: false
}