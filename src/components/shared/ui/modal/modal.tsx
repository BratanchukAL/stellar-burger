import React, {FC, KeyboardEvent, SyntheticEvent, useEffect, useRef} from "react";
import ReactDOM from "react-dom";

import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import {clx} from "components/shared/utils";

import styles from './modal.module.css'


const modalRoot = document.getElementById("react-modals")!;
const bodyElement = document.getElementsByTagName("html")[0]!;


interface ModalProps{
    onClose: (() => void)
    extraClassContent?: string
}

export const Modal: FC<React.PropsWithChildren<ModalProps>> = ({
    onClose,
    extraClassContent= '',
    children, ...props
}) => {
    const modalRef= useRef<HTMLDialogElement>(null)
    const bodyRef = useRef(bodyElement)

    useEffect(() => {
        const bodyRefCurrent = bodyRef.current
        bodyRefCurrent.style.overflow = 'hidden'
        modalRef.current?.showModal()
        modalRef.current?.focus()

        return () => {
            bodyRefCurrent.style.overflow = ''
        }
    }, [bodyRef, modalRef])

    const handleCloseByKeyDown = (e:KeyboardEvent<HTMLInputElement | HTMLDialogElement>) =>{
        if (e.code === 'Escape')
            onClose()
    }

    const handleClose = () =>{
        onClose()
        modalRef.current?.close()
    }

    const handleClickBackdrop = (e:  SyntheticEvent<HTMLDialogElement>) =>{
        const target = e.currentTarget
        const rect = target.getBoundingClientRect();
        if (rect)
            if (target.clientTop < rect.top || target.clientTop > rect.bottom ||
                target.clientLeft < rect.left || target.clientLeft > rect.right) {
                modalRef.current?.close();
                onClose()
            }
    }

    return ReactDOM.createPortal(
        (
            <>
                <dialog className={styles.modal}
                    onClick={handleClickBackdrop}
                    onClose={handleClose}
                    onKeyPress={handleCloseByKeyDown}
                    ref={modalRef}
                    data-testid="modal_showed"
                >
                    <div className={clx(styles.modal_dialog, ['p-10'])}>
                        <div
                            className={styles.close_icon_content}
                            data-testid="modal_close"
                        >
                            <CloseIcon type="primary" onClick={handleClose}/>
                        </div>
                        <div className={clx(styles.modal_content, [extraClassContent])}>
                            {children}
                        </div>
                    </div>
                </dialog>
            </>
        ),
        modalRoot
    );
};