import {ReturnSliceActionsType} from "components/shared/utils";

//OrdersAll
import { selectIsStreamingOrdersAll, selectOrdersAll } from "./orders-all/selectors";

import {ordersAllSlice} from "./orders-all/slice";
import {ordersAllWSDisconnectAction, ordersAllWSStartAction} from "./orders-all/ws/actions";


//Orders of User
import { selectIsStreamingOrdersAllOfUser, selectOrdersAllOfUser } from "./orders-user/selectors";

import {ordersAllOfUserSlice} from "./orders-user/slice";
import {ordersAllOfUserWSDisconnectAction, ordersAllOfUserWSStartAction} from "./orders-user/ws/actions";


//OrdersAll
export {ordersAllSlice}
export {ordersAllWSStartAction}
export {ordersAllWSDisconnectAction}
export {selectIsStreamingOrdersAll}
export {selectOrdersAll}
export {ordersAllWSMiddleware} from "./orders-all/ws/ws";


//Orders of User
export {ordersAllOfUserSlice}
export {ordersAllOfUserWSStartAction}
export {ordersAllOfUserWSDisconnectAction}
export {selectIsStreamingOrdersAllOfUser}
export {selectOrdersAllOfUser}
export {ordersAllOfUserWSMiddleware} from "./orders-user/ws/ws";


export type TypedActionsFromOrder =
    ReturnSliceActionsType<typeof ordersAllSlice.actions> |
    ReturnType<typeof ordersAllWSStartAction> |
    ReturnType<typeof ordersAllWSDisconnectAction> |

    ReturnSliceActionsType<typeof ordersAllOfUserSlice.actions> |
    ReturnType<typeof ordersAllOfUserWSStartAction> |
    ReturnType<typeof ordersAllOfUserWSDisconnectAction>