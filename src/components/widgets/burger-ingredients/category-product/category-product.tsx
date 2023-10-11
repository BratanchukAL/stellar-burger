import React, {FC, PropsWithChildren} from "react";
import PropTypes from "prop-types";

import styles from './category-product.module.css'


interface CategoryProductProps{
    title: string
    extraClass?: string
}

export const CategoryProduct: FC<PropsWithChildren<CategoryProductProps>> = (
    {
        title,
        extraClass = '',
        children
    }
) => {


    return (
        <div className={extraClass}>
            <p className='text text_type_main-medium pb-2'>{title}</p>
            <div className={styles.items}>
                {children}
            </div>
        </div>
    )
};