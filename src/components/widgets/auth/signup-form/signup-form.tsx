import React from 'react'

import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components"

import {
    ButtonLink,
    EmailInput,
    ErrorText
} from "components/shared/ui";
import {useForm} from "components/shared/hooks";

import {useHandleRegister} from "components/features/auth/register";

import styles from './signup-form.module.css'


export const SignupForm = ()=> {

    const [state, onChange] = useForm({
        name: '',
        email: '',
        password: '',
    })

    const [onRegister, response] = useHandleRegister(state)

    return (
        <>
            <ErrorText message={response.error?.data?.message} extraClass="mt-6"/>
            <form onSubmit={onRegister}>
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
                    required
                />
                <EmailInput
                    placeholder={'E-mail'}
                    onChange={onChange}

                    value={state.email}
                    name={'email'}
                    size={'default'}
                    extraClass="mt-6"
                    required
                />
                <PasswordInput
                    placeholder={'Пароль'}
                    onChange={onChange}
                    value={state.password}
                    name={'password'}
                    extraClass="mt-6"
                    required
                />
                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    extraClass={styles.submit + " mt-6"}
                >
                    Зарегистрироваться
                </Button>

                <div className={styles.footer + " mt-20"}>
                    <p className="text text_type_main-default text_color_inactive">
                        Уже зарегистрированы?
                        <ButtonLink type="secondary" size="large" to="/login">
                            Войти
                        </ButtonLink>
                    </p>
                </div>
            </form>
        </>
    );
}