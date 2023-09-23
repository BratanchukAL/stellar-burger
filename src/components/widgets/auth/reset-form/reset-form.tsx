import React, {ChangeEvent} from 'react'

import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components"

import {ButtonLink} from "components/shared/ui";

import styles from './reset-form.module.css'


export const ResetForm = ()=>{
    const [value, setValue] = React.useState('')
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    return(
        <>
            <PasswordInput
                placeholder={'Введите новый пароль'}
                onChange={onChange}
                value={value}
                name={'new_password'}
                extraClass="mt-6"
            />
            <Input
              type={'text'}
              placeholder={'Введите код из письма'}
              onChange={onChange}

              value={value}
              name={'code_email'}
              error={false}
              // ref={inputRef}

              errorText={'Ошибка'}
              size={'default'}
              extraClass="mt-6"
            />
            <Button
                htmlType="button"
                type="primary"
                size="medium"
                extraClass={styles.submit + " mt-6"}
            >
                Сохранить
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