import {ReturnSliceActionsType} from "components/shared/utils";

//OrdersAll
import { selectIsStreamingOrdersAll, selectOrdersAll } from "./orders-all/selectors";

import {ordersAllSlice, ordersAllActions} from "./orders-all/slice";
import {ordersAllWSDisconnectAction, ordersAllWSStartAction} from "./orders-all/ws/actions";


//Orders of User
import { selectOrdersAllOfUser } from "./orders-user/selectors";

import {ordersAllOfUserSlice, ordersAllOfUserActions} from "./orders-user/slice";
import {
    ordersAllOfUserWSDisconnectAction,
    ordersAllOfUserWSReconnectAction,
    ordersAllOfUserWSStartAction
} from "./orders-user/ws/actions";


//OrdersAll
export {ordersAllSlice}
export {ordersAllActions}
export {ordersAllWSStartAction}
export {ordersAllWSDisconnectAction}
export {selectIsStreamingOrdersAll}
export {selectOrdersAll}
export {ordersAllWSMiddleware} from "./orders-all/ws/ws";


//Orders of User
export {ordersAllOfUserSlice}
export {ordersAllOfUserActions}
export {ordersAllOfUserWSStartAction}
export {ordersAllOfUserWSDisconnectAction}
export {selectOrdersAllOfUser}
export {ordersAllOfUserWSMiddleware} from "./orders-user/ws/ws";


export type TypedActionsFromOrder =
    ReturnSliceActionsType<typeof ordersAllActions> |
    ReturnType<typeof ordersAllWSStartAction> |
    ReturnType<typeof ordersAllWSDisconnectAction> |

    ReturnSliceActionsType<typeof ordersAllOfUserActions> |
    ReturnType<typeof ordersAllOfUserWSStartAction> |
    ReturnType<typeof ordersAllOfUserWSDisconnectAction> |
    ReturnType<typeof ordersAllOfUserWSReconnectAction>