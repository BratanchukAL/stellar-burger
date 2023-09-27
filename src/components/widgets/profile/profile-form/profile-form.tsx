import React, {useEffect, useState} from 'react'

import {Button, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components"

import {
    EditInput,
    EmailInput,
    ErrorText
} from "components/shared/ui"
import {useForm} from "components/shared/hooks"

import {useGetProfileQuery} from "components/entities/profile";
import {useUpdateProfile} from "components/features/update-profile";

import styles from './profile-form.module.css'



export const ProfileForm = ()=> {
    const [toggleResetForm, setResetForm] = useState(false)
    const {data: profile, isLoading, error, refetch: refetchProfile} = useGetProfileQuery()

    const [state, onChange] = useForm(
        {
            name: '',
            email: '',
            password: '',
            ...profile
        }
    , [isLoading, toggleResetForm]);

    const [updateProfile, responseUpdate] = useUpdateProfile(state)

    useEffect(()=>{
        if (!responseUpdate.isLoading)
            refetchProfile()
    }, [responseUpdate])

    return (
        <>
            {(isLoading || responseUpdate.isLoading) && <div>Loading...</div>}
            <ErrorText message={(error as any)?.data?.message} extraClass="mt-6 mb-6"/>
            <ErrorText message={responseUpdate.error?.data?.message} extraClass="mb-6"/>
            <form onSubmit={updateProfile} className={styles.container_form}>
                <EditInput
                    placeholder={'Имя'}
                    onChange={onChange}
                    value={state.name}
                    name={'name'}
                    isIcon={true}
                    required
                />
                <EmailInput
                    placeholder={'E-mail'}
                    onChange={onChange}
                    value={state.email}
                    name={'email'}
                    isIcon={true}
                    extraClass="mt-6"
                    required
                />
                <PasswordInput
                    placeholder={'Пароль'}
                    onChange={onChange}
                    value={state.password}
                    name={'password'}
                    icon="EditIcon"
                    extraClass="mt-6"
                    required
                />
                <div className={styles.buttons}>
                    <Button
                        onClick={()=>setResetForm(!toggleResetForm)}
                        htmlType="button"
                        type="secondary"
                        size="medium"
                        extraClass="mt-6"
                    >
                        Отмена
                    </Button>
                    <Button
                        htmlType="submit"
                        type="primary"
                        size="medium"
                        extraClass="mt-6"
                    >
                        Сохранить
                    </Button>
                </div>
            </form>
        </>
    );
}