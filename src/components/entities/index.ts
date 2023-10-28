import {ReturnSliceActionsType} from "components/shared/utils";

import {basketSlice} from "./basket/slice";
import {reducersProducts, TypedActionsFromProducts} from "./products";
import {sessionSlice} from "./session";
import {spinnerSlice} from "./spinner";

import {ordersAllFeedSlice} from "./order";
import {ordersAllWSDisconnectAction, ordersAllWSStartAction} from "./order";



export const reducersEntities = {
    [spinnerSlice.name]: spinnerSlice.reducer,
    [basketSlice.name]:  basketSlice.reducer,
    [sessionSlice.name]: sessionSlice.reducer,
    [ordersAllFeedSlice.name]: ordersAllFeedSlice.reducer,
    ...reducersProducts,
}


//typing actions
export type TypedActionsFromEntities =
    TypedActionsFromProducts |
    ReturnSliceActionsType<typeof spinnerSlice.actions> |
    ReturnSliceActionsType<typeof basketSlice.actions> |
    ReturnSliceActionsType<typeof sessionSlice.actions> |


    ReturnSliceActionsType<typeof ordersAllFeedSlice.actions> |
    ReturnType<typeof ordersAllWSStartAction> |
    ReturnType<typeof ordersAllWSDisconnectAction>
