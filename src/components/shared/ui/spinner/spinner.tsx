import React from 'react'

import styles from './spinner.module.css'

export const Spinner = () => {
    return (
        <div className={styles.content}>
            <div className={styles.lds_spinner}>
                <div></div><div></div><div></div><div></div><div></div><div></div>
                <div></div><div></div><div></div><div></div><div></div><div></div>
            </div>
        </div>
    )
}