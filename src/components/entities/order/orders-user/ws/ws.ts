import {websocketMiddlewareBase} from "components/shared/middlewares";

import {AppDispatch, RootStateType} from "components/providers/store";
import {API_WS_PATH_USER_ALL_ORDERS, API_WS_URL} from "components/shared/configs/api";

import {ordersAllOfUserWSDisconnectAction, ordersAllOfUserWSStartAction} from "./actions";
import {onErrorActionThunk, onMessageActionThunk, onSuccessActionThunk, onClosedActionThunk} from "./thunks";



export const ordersAllOfUserWSMiddleware = websocketMiddlewareBase<AppDispatch, RootStateType>(
    API_WS_URL,
    API_WS_PATH_USER_ALL_ORDERS,

    ordersAllOfUserWSStartAction,
    ordersAllOfUserWSDisconnectAction,

    onSuccessActionThunk,
    onErrorActionThunk,
    onMessageActionThunk,
    onClosedActionThunk
)