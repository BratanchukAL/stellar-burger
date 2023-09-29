import React from 'react'
import {useSelector} from "react-redux";

import {Spinner} from "components/shared/ui";
import {selectIsLoading} from "components/entities/spinner";



export const SpinnerWidget = () => {
    const isLoading = useSelector(selectIsLoading)
    return (
        <>
            {isLoading && <Spinner />}
        </>
    )
}