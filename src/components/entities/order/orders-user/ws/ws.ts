import {websocketMiddlewareBase} from "components/shared/middlewares/websocket-middleware-base";

import {AppDispatch, RootStateType} from "components/providers/store";
import {API_WS_PATH_USER_ALL_ORDERS, API_WS_URL} from "components/shared/configs/api";

import {selectAccessToken} from "components/entities/session";

import {
    ordersAllOfUserWSDisconnectAction,
    ordersAllOfUserWSReconnectAction,
    ordersAllOfUserWSStartAction
} from "./actions";
import {onErrorActionThunk, onMessageActionThunk, onSuccessActionThunk, onClosedActionThunk} from "./thunks";



export const selectAccessTokenWithoutBearer = (state: RootStateType): { accessToken: string } => ({
    accessToken: selectAccessToken(state).replace('Bearer ', '')
})


export const ordersAllOfUserWSMiddleware = websocketMiddlewareBase<AppDispatch, RootStateType>({
    baseUrl: API_WS_URL,
    path: API_WS_PATH_USER_ALL_ORDERS,

    wsStartAction: ordersAllOfUserWSStartAction,
    wsDisconnectAction: ordersAllOfUserWSDisconnectAction,

    onSuccessAction: onSuccessActionThunk,
    onErrorAction: onErrorActionThunk  ,
    onMessageAction: onMessageActionThunk ,
    onClosedAction: onClosedActionThunk ,

    wsReconnectAction: ordersAllOfUserWSReconnectAction,
    selectAccessToken: selectAccessTokenWithoutBearer
})