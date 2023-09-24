import React, {ChangeEvent} from 'react'

import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components"

import {ButtonLink} from "components/shared/ui";
import {useForm} from "components/shared/hooks";

import {useHandleRegister} from "components/features/auth/register";

import styles from './signup-form.module.css'


export const SignupForm = ()=> {

    const [state, onChange] = useForm({
        name: '',
        email: '',
        password: '',
    })

    const [onRegister] = useHandleRegister(state)

    return(
        <>
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={onChange}

              value={state.name}
              name={'name'}
              error={false}

              errorText={'Ошибка'}
              size={'default'}
              extraClass="mt-6"
            />
            <Input
              type={'text'}
              placeholder={'E-mail'}
              onChange={onChange}

              value={state.email}
              name={'email'}
              error={false}

              errorText={'Ошибка'}
              size={'default'}
              extraClass="mt-6"
            />
            <PasswordInput
                placeholder={'Пароль'}
                onChange={onChange}
                value={state.password}
                name={'password'}
                extraClass="mt-6"
            />
            <Button
                htmlType="button"
                type="primary"
                size="medium"
                extraClass={styles.submit + " mt-6"}
                onClick={onRegister}
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