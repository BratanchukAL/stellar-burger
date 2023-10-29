import {combineReducers, configureStore} from '@reduxjs/toolkit'
import logger from 'redux-logger'
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import {baseApi} from "components/shared/api";

import {reducersEntities} from "components/entities";
import {ordersAllWSMiddleware} from "components/entities/order";



//Reducers
export const rootReducers = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    ...reducersEntities
})


// Configures store
export const store = configureStore({
    reducer: rootReducers,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(
            logger,
            baseApi.middleware,
            ordersAllWSMiddleware
        ),
})

//
export const persistedStore = persistStore(store)