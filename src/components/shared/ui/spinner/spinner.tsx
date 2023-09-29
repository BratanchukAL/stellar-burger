import React from 'react'
import {Overlay} from "../overlay/overlay";

export const Spinner = () => {
    return (
        <>
            <Overlay />
            <div className="lds-spinner"> </div>
        </>
    )
}