import {ReturnSliceActionsType} from "components/shared/utils";

import {basketSlice} from "./basket/slice";
import {reducersProducts, TypedActionsFromProducts} from "./products";
import {sessionSlice} from "./session";
import {spinnerSlice} from "./spinner";

import {ordersAllWSDisconnectAction, ordersAllWSStartAction} from "./order";



export const reducersEntities = {
    [spinnerSlice.name]: spinnerSlice.reducer,
    [basketSlice.name]:  basketSlice.reducer,
    [sessionSlice.name]: sessionSlice.reducer,
    ...reducersProducts,
}


//typing actions
export type TypedActionsFromEntities =
    TypedActionsFromProducts |
    ReturnSliceActionsType<typeof spinnerSlice.actions> |
    ReturnSliceActionsType<typeof basketSlice.actions> |
    ReturnSliceActionsType<typeof sessionSlice.actions> |

    ReturnType<typeof ordersAllWSStartAction> |
    ReturnType<typeof ordersAllWSDisconnectAction>
