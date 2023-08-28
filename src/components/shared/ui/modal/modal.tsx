import React, {FC, KeyboardEvent, useEffect, useRef} from "react";
import ReactDOM from "react-dom";

import styles from './modal.module.css'


const modalRoot = document.getElementById("react-modals")!;
const bodyElement = document.getElementsByTagName("body")[0]!;

interface ModalProps{

}

export const Modal: FC<React.PropsWithChildren<ModalProps>> = ({children, ...props}) => {
    const bodyRef = useRef(bodyElement)

    useEffect(()=>{
        bodyRef.current.style.overflow = 'hidden'

        return ()=> {
            bodyRef.current.style.overflow = ''
        }
    },[bodyRef])

    const handleCloseByKeyDown = (e:KeyboardEvent<HTMLInputElement>) =>{
        if (e.code === 'Escape')
            bodyRef.current.style.overflow = ''
    }

    return ReactDOM.createPortal(
            (
                <>
                    <div  className={styles.overlay} > </div>
                    <div className={styles.modal} onKeyDown={handleCloseByKeyDown} tabIndex={-1}>
                        <div className={styles.modal_dialog} >
                            hello
                            {children}
                            fdsfs hello
                            {children}
                            fdsfs hello
                            {children}
                            fdsfs hello
                            {children}
                            fdsfs hello
                            {children}
                            fdsfs hello
                            {children}
                            fdsfs hello
                            {children}
                            fdsfs
                        </div>
                    </div>
                </>
            ),
            modalRoot
        );
}