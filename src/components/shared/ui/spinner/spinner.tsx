import React from 'react'
import {Overlay} from "../overlay/overlay";

import styles from './spinner.module.css'

export const Spinner = () => {
    return (
        <div className={styles.content}>
            {/*<Overlay />*/}
            <div className={styles.lds_spinner}>
                <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            </div>
        </div>
    )
}