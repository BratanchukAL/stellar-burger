import React, {ChangeEvent} from 'react'

import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components"

import {ButtonLink} from "components/shared/ui";

import styles from './signup-form.module.css'


export const SignupForm = ()=> {
    const [value, setValue] = React.useState('')
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    return(
        <>
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={onChange}

              value={value}
              name={'name'}
              error={false}
              // ref={inputRef}

              errorText={'Ошибка'}
              size={'default'}
              extraClass="mt-6"
            />
            <EmailInput
                placeholder={'E-mail'}
                onChange={onChange}
                value={value}
                name={'email'}
                isIcon={false}
                extraClass="mt-6"
            />
            <PasswordInput
                placeholder={'Пароль'}
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
                Зарегистрироваться
            </Button>

            <div className={styles.footer + " mt-20"}>
                <p className="text text_type_main-default text_color_inactive">
                    Уже зарегистрированы?
                    <ButtonLink  type="secondary" size="large" to="/login">
                        Войти
                    </ButtonLink>
                </p>
            </div>
        </>
    )
}