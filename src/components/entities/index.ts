import {ReturnSliceActionsType} from "components/shared/utils";

import {basketSlice} from "./basket";
import {reducersProducts, TypedActionsFromProducts} from "./products";
import {sessionSlice} from "./session";
import {spinnerSlice} from "./spinner";
import {ordersAllFeedSlice, TypedActionsFromOrder} from "./order";




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
    TypedActionsFromOrder |
    ReturnSliceActionsType<typeof spinnerSlice.actions> |
    ReturnSliceActionsType<typeof basketSlice.actions> |
    ReturnSliceActionsType<typeof sessionSlice.actions>
