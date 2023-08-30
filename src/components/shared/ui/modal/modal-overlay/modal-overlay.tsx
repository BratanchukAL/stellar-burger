import React from "react";

import styles from './modal-overlay.module.css'

export const ModalOverlay = (props: { onClick: () => void }) => {
    return (
        <div className={styles.overlay} onClick={props.onClick}>
        </div>
    )
}