import React, {FC, SyntheticEvent} from "react";

import {clx} from "components/shared/utils";

import styles  from './button-link.module.css';


interface ButtonLinkProps extends React.PropsWithChildren<Omit<React.HTMLProps<HTMLButtonElement>, 'type' | 'size'>> {
    active?: boolean
    type?: 'secondary' | 'primary';
    size?: 'small' | 'medium' | 'large';
    onClick?: (() => void) | ((e: SyntheticEvent) => void);
    extraClass?: string;
    htmlType?: 'button' | 'submit' | 'reset';
}


export const ButtonLink: FC<ButtonLinkProps> = ({
                                                    active= false,
                                                    type = 'primary',
                                                    size = 'small',
                                                    extraClass = '',
                                                    htmlType = 'button',
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
        <button className={buttonStyle} type={htmlType} onClick={onClick} {...otherProps}>
            <div className={styles.caption}>
                {children}
            </div>
        </button>
    )
};