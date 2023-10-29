import {ReturnSliceActionsType} from "components/shared/utils";

//OrdersAll
import { selectIsStreamingOrdersAll, selectOrdersAll } from "./orders-all/selectors";

import {ordersAllFeedSlice} from "./orders-all/slice";
import {ordersAllWSDisconnectAction, ordersAllWSStartAction} from "./orders-all/ws/actions";

export {ordersAllWSMiddleware} from "./orders-all/ws/ws";

export {ordersAllFeedSlice}
export {ordersAllWSStartAction}
export {ordersAllWSDisconnectAction}
export {selectIsStreamingOrdersAll}
export {selectOrdersAll}

//




export type TypedActionsFromOrder =
    ReturnSliceActionsType<typeof ordersAllFeedSlice.actions> |
    ReturnType<typeof ordersAllWSStartAction> |
    ReturnType<typeof ordersAllWSDisconnectAction>