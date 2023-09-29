import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    isLoading: false,
};

export const spinnerSlice = createSlice({
    name: 'spinner',
    initialState,
    reducers: {
        start: (state) => {
            state.isLoading = true
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