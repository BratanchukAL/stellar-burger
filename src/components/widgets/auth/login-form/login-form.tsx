import React, {ChangeEvent} from 'react'

import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components"

import {ButtonLink} from "components/shared/ui";

import styles from './login-form.module.css'


export const LoginForm = ()=>{
    const [value, setValue] = React.useState('')
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    return(
        <>
            <EmailInput
                onChange={onChange}
                value={value}
                name={'email'}
                isIcon={false}
                extraClass="mt-6"
            />
            <PasswordInput
                onChange={onChange}
                value={value}
                name={'password'}
                extraClass="mt-6"
            />
            <Button
                htmlType="button"
                type="primary"
                size="medium"
                extraClass={styles.submit + " mt-6"}
            >
                Войти
            </Button>

            <div className={styles.footer + " mt-20"}>
                <p className="text text_type_main-default text_color_inactive">
                    Вы — новый пользователь?
                    <ButtonLink  type="secondary" size="large" to="/register">
                        Зарегистрироваться
                    </ButtonLink>
                </p>
                <p className="text text_type_main-default text_color_inactive mt-4">
                    Забыли пароль?
                    <ButtonLink  type="secondary" size="large" to="/forgot-password">
                        Восстановить пароль
                    </ButtonLink>
                </p>
            </div>
        </>
    )
}