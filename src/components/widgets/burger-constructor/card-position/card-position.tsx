import React, {FC} from "react";
import PropTypes from "prop-types";

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

export const CardPosition: FC<CardPositionProps> = (
    {
        thumbnail= DefaultImage,
        isLocked = false,
        ...props
    }
)=>{

    return(
        <div className={styles.content}>
            <span style={{width:32}}>
                {!isLocked && <DragIcon type="primary" />}
            </span>
            <ConstructorElement
                thumbnail={thumbnail as string}
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