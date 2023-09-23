import React, {FC, HTMLProps, SyntheticEvent} from "react";

import { NavLink } from "react-router-dom";

import {clx} from "components/shared/utils";

import styles  from './button-link.module.css';



interface ButtonLinkProps extends Omit<HTMLProps<HTMLLinkElement>, 'type' | 'size'> {
    active?: boolean
    type?: 'secondary' | 'primary'
    size?: 'small' | 'medium' | 'large'
    to?: string
    onClick?: (() => void) | ((e: SyntheticEvent) => void)
    extraClass?: string
}


export const ButtonLink: FC<ButtonLinkProps> = ({
                                                    active= false,
                                                    type = 'primary',
                                                    size = 'small',
                                                    extraClass = '',
                                                    to = '#',
                                                    onClick= ()=>{},
                                                    children,
                                                    ...otherProps
}) => {
    const buttonStyle = clx(styles.buttonLink, [
        styles[`buttonLink_type_${type}`],
        styles[`buttonLink_size_${size}`]
    ],{
        [styles.active]: active,
        [extraClass]: extraClass
    })

    return (
        <NavLink className={buttonStyle} onClick={onClick} to={to}>
            <div className={styles.caption}>
                {children}
            </div>
        </NavLink>
    )
};