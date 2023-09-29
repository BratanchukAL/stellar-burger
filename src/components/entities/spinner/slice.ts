import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {
    isLoading: false,
    text: 'Загрузка...'
};

export const spinnerSlice = createSlice({
    name: 'spinner',
    initialState,
    reducers: {
        start: (state, action?: PayloadAction<string>) => {
            state.isLoading = true
            state.text = action?.payload || ""
        },

        stop: () => initialState,
    },
    extraReducers: (builder) =>
        builder
            .addMatcher((action)=> action.type.endsWith('/pending'), (state) => {
                state.isLoading = true
            })
            .addMatcher((action)=> action.type.endsWith('/fulfilled'), (state) => {
                state.isLoading = false
            })
            .addMatcher((action)=> action.type.endsWith('/rejected'), (state) => {
                state.isLoading = false
            })
})

export const {actions: spinnerActions} = spinnerSlice