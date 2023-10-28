import {websocketMiddlewareBase} from "components/shared/middlewares";

import {API_WS_PATH_ALL_ORDERS, API_WS_URL} from "components/shared/configs/api";

import {ordersAllWSDisconnectAction, ordersAllWSStartAction} from "./actions";
import {onErrorActionThunk, onMessageActionThunk, onSuccessActionThunk, onClosedActionThunk} from "./thunks";


export const ordersWSMiddleware = websocketMiddlewareBase(
    API_WS_URL,
    API_WS_PATH_ALL_ORDERS,

    ordersAllWSStartAction,
    ordersAllWSDisconnectAction,

    onSuccessActionThunk,
    onErrorActionThunk,
    onMessageActionThunk,
    onClosedActionThunk
)