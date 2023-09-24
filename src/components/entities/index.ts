import {basketSlice} from "./basket/slice";
import {reducersProducts} from "./products";
import {sessionSlice} from "./session";

export const reducersEntities = {
    [basketSlice.name]: basketSlice.reducer,
    [sessionSlice.name]: sessionSlice.reducer,
    ...reducersProducts,
}