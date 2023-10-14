import React from 'react'

import {Spinner} from "components/shared/ui";

import {useAppSelector} from "components/providers/store";

import {selectIsLoading} from "components/entities/spinner";
import {selectText} from "components/entities/spinner";



export const SpinnerWidget = () => {
    const isLoading = useAppSelector(selectIsLoading)
    const text = useAppSelector(selectText)

    return (
        <>
            {isLoading && <Spinner text={text}/>}
        </>
    )
}