import {combineReducers, configureStore} from '@reduxjs/toolkit'
import logger from 'redux-logger'

import {baseApi} from "components/shared/api";
import {reducersEntities} from "components/entities";

import {invalidateAccessTokenListener} from "components/features/auth/refresh-token";


//Reducers
const rootReducers = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    ...reducersEntities
})

// Configures store
export const store = configureStore({
    reducer: rootReducers,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(
            logger,
            baseApi.middleware,
            invalidateAccessTokenListener.middleware
        ),
})


//Typing
// Infer the `RootStateType` and `AppDispatch` types from the store itself
export type RootStateType = ReturnType<typeof rootReducers>
export type AppDispatch = typeof store.dispatch