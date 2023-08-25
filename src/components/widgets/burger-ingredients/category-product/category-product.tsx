import React, {FC, ReactNode} from "react";

import styles from './category-product.module.css'
import PropTypes from "prop-types";

interface CategoryProductProps{
    title: string
    children: ReactNode
    extraClass?: string
}

export const CategoryProduct:FC<CategoryProductProps> = (props) => {
    return(
        <div className={props.extraClass}>
            <p className='text text_type_main-medium pb-2'>{props.title}</p>
            <div className={styles.items}>
                {props.children}
            </div>
        </div>
    )
}

CategoryProduct.defaultProps={
    extraClass: ''
}

CategoryProduct.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    extraClass: PropTypes.string
}