import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { v4 as uuid4 } from 'uuid';

import {IBasket, ISetIngredient} from "./models";

const initialState = {
    data: {
        bun: null,
        ingredients: [
            {
                id:"643d69a5c3f7b9001cfa0945",
                uuid:"643d69a5c3f7b9001cfa09450",
            },
            {
                id:"643d69a5c3f7b9001cfa0944",
                uuid:"643d69a5c3f7b9001cfa09441",
            },
        ],
    } as IBasket
}

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        add: {
            reducer: (state, action: PayloadAction<ISetIngredient>)=>{
                state.data.ingredients = state.data.ingredients.concat([action.payload])
            },
            prepare: (id: string) => {
                const uuid = uuid4()
                return { payload: { id, uuid } }
            },
        },
        addBun(state, action: PayloadAction<string>){
            state.data.bun = action.payload
        },
        move(state, action: PayloadAction<{fromIndex: number, toIndex: number}>){
            const ingredients = [...state.data.ingredients];
            const {fromIndex, toIndex} = action.payload

            const fromElement = ingredients[fromIndex]
            ingredients.splice(fromIndex, 1);
            ingredients.splice(toIndex, 0, fromElement)
            state.data.ingredients = ingredients;
        },
    }
})

export const { actions: basketActions } = basketSlice;