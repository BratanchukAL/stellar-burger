import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const isActionOfRTKQuery = (action: any, ends: string) => action.type.startsWith('api/') && action.type.endsWith(ends)

const initialState = {
    isLoading: false,
    text: 'Загрузка...'
};

export const spinnerSlice = createSlice({
    name: 'spinner',
    initialState,
    reducers: {
        start: (state, action: PayloadAction<string>) => {
            state.isLoading = true
            state.text = action?.payload || ""
        },

        stop: () => initialState,
    },
    extraReducers: (builder) =>
        builder
            .addMatcher((action)=> isActionOfRTKQuery(action, '/pending'), (state) => {
                state.isLoading = true
            })
            .addMatcher((action)=> isActionOfRTKQuery(action, '/fulfilled'), () => initialState)
            .addMatcher((action)=> isActionOfRTKQuery(action, '/rejected'), () => initialState)
})

export const {actions: spinnerActions} = spinnerSlice