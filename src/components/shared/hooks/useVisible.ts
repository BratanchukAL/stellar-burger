import {useCallback, useState} from "react";

type TypeHandleClose = () => void;
type TypeHandleOpen = () => void;
type TypeIsOpen = boolean;

export const useVisible = (isOpenDefault: boolean):[TypeIsOpen,TypeHandleClose, TypeHandleOpen] =>{
    const [isOpen, setVisible] = useState(isOpenDefault)

    const handleClose = useCallback((): void =>{
        setVisible(false)
    }, [])

    const handleOpen = useCallback((): void => {
        setVisible(true)
    }, [])

    return [isOpen, handleClose, handleOpen]
}