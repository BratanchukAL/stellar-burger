import React, {FC, KeyboardEvent, useEffect, useRef} from "react";
import ReactDOM from "react-dom";

import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import {clx} from "components/shared/utils";

import {ModalOverlay} from "./modal-overlay/modal-overlay";

import styles from './modal.module.css'


const modalRoot = document.getElementById("react-modals")!;


interface ModalProps{
    onClose: (() => void)
    extraClassContent?: string
}

export const Modal: FC<React.PropsWithChildren<ModalProps>> = ({
    onClose,
    extraClassContent= '',
    children, ...props
}) => {
    const modalRef= useRef<HTMLDivElement>(null)

    useEffect(() => {
        modalRef.current?.focus()

    }, [])

    const handleCloseByKeyDown = (e:KeyboardEvent<HTMLInputElement>) =>{
        if (e.code === 'Escape')
            onClose()
    }

    const handleClose = () =>{
        onClose()
    }

    return ReactDOM.createPortal(
        (
            <>
                <ModalOverlay onClick={handleClose}/>
                <div className={styles.modal}
                     onKeyDown={handleCloseByKeyDown}
                     ref={modalRef}
                     tabIndex={-1}
                >
                    <div className={clx(styles.modal_dialog, ['p-10'])}>
                        <div className={styles.close_icon_content}>
                            <CloseIcon type="primary" onClick={handleClose}/>
                        </div>
                        <div className={clx(styles.modal_content, [extraClassContent])}>
                            {children}
                        </div>
                    </div>
                </div>
            </>
        ),
        modalRoot
    );
};