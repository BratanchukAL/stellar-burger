import React, {ChangeEvent, FC, PropsWithChildren} from 'react'

import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components"

import {ButtonLink} from "components/shared/ui";

import styles from './layout-form.module.css'

interface LayoutFormProps {

}
//TODO: Не забыть удалить или внедрить
export const LayoutForm: FC<PropsWithChildren>= ({children}) =>{

    return(
        <>
            {children}
            <Button
                htmlType="button"
                type="primary"
                size="medium"
                extraClass={styles.submit + " mt-6"}
            >
                Восстановить
            </Button>

            <div className={styles.footer + " mt-20"}>
                <p className="text text_type_main-default text_color_inactive mt-4">
                    Вспомнили пароль?
                    <ButtonLink  type="secondary" size="large" to="/login">
                        Войти
                    </ButtonLink>
                </p>
            </div>
        </>
    )
}

export const LayoutFormFooter: FC<PropsWithChildren>= ({children}) =>{
    return(
        <div className={styles.footer + " mt-20"}>
            {children}
        </div>
    )
}