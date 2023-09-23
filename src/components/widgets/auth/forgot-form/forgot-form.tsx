import React, {ChangeEvent} from 'react'

import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components"

import {ButtonLink} from "components/shared/ui";

import styles from './forgot-form.module.css'


export const ForgotForm = ()=>{
    const [value, setValue] = React.useState('')
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    return(
        <>
            <EmailInput
                placeholder={'Укажите e-mail'}
                onChange={onChange}
                value={value}
                name={'email'}
                isIcon={false}
                extraClass="mt-6"
            />
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