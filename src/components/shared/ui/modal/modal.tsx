import React, {FC, KeyboardEvent, useEffect, useRef} from "react";
import ReactDOM from "react-dom";

import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import {clx} from "components/shared/utils";

import styles from './modal.module.css'


const modalRoot = document.getElementById("react-modals")!;
const bodyElement = document.getElementsByTagName("body")[0]!;


interface ModalProps{
    onClose: (() => void)
}

export const Modal: FC<React.PropsWithChildren<ModalProps>> = ({
    onClose,
    children, ...props
}) => {

    const bodyRef = useRef(bodyElement)

    useEffect(() => {
        bodyRef.current.style.overflow = 'hidden'

        return () => {
            bodyRef.current.style.overflow = ''
        }
    }, [bodyRef])

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
                <div className={styles.overlay}> </div>
                <div className={styles.modal} onKeyDown={handleCloseByKeyDown} tabIndex={-1}>
                    <div className={clx(styles.modal_dialog, ['p-10'])}>
                        <div className={styles.close_icon_content}>
                            <CloseIcon type="primary" onClick={handleClose}/>
                        </div>
                        <div className={styles.modal_content}>
                            hello
                            {children}
                        </div>
                    </div>
                </div>
            </>
        ),
        modalRoot
    );
};