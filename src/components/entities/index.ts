import {basketSlice} from "./basket/slice";
import {reducersProducts} from "./products";
import {sessionSlice} from "./session";
import {spinnerSlice} from "./spinner";

export const reducersEntities = {
    [spinnerSlice.name]: spinnerSlice.reducer,
    [basketSlice.name]: basketSlice.reducer,
    [sessionSlice.name]: sessionSlice.reducer,
    ...reducersProducts,
}