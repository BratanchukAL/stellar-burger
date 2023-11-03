import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IIngredientDetails} from "./models";
import {IProduct} from "../models";


type TIngredientDetailsState = {
    data: IIngredientDetails
}

// Persisted
const initialState:TIngredientDetailsState = {
    data: {
        isOpen: false,
        details: {}
    } as IIngredientDetails
}


export const slice = createSlice({
    name: 'ingredientDetails',
    initialState,
    reducers: {
        add(state, action: PayloadAction<IProduct>){
            state.data.isOpen = true
            state.data.details = action.payload
        },
        clean(state){
            state.data.isOpen = false
            state.data.details = {} as IProduct
        },
    }
})


export const { actions: ingredientDetailsActions } = slice;