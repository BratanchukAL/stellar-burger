import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const actionIsRTKQuery = (action:any, ends: string) => action.type.startsWith('api/') && action.type.endsWith(ends)

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
            .addMatcher((action)=> actionIsRTKQuery(action, '/pending'), (state) => {
                state.isLoading = true
            })
            .addMatcher((action)=> actionIsRTKQuery(action, '/fulfilled'), () => initialState)
            .addMatcher((action)=> actionIsRTKQuery(action, '/rejected'), () => initialState)
})

export const {actions: spinnerActions} = spinnerSlice