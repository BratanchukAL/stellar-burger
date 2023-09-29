import {combineReducers, configureStore} from '@reduxjs/toolkit'
import logger from 'redux-logger'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import {baseApi} from "components/shared/api";
import {reducersEntities} from "components/entities";

import {invalidateAccessTokenListener} from "components/features/auth/refresh-token";


const persistConfig = {
    key: 'root',
    storage,
    whitelist: [
        'session',
        'ingredientDetails'
    ],
}


//Reducers
export const rootReducers = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    ...reducersEntities
})

// Configures store
export const store = configureStore({
    reducer: persistReducer(
      persistConfig,
      rootReducers
    ) as unknown as typeof rootReducers,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(
            logger,
            baseApi.middleware,
            invalidateAccessTokenListener.middleware  // needs redux-saga
        ),
})

export const persistedStore = persistStore(store)