import {basketSlice} from "./basket/slice";

export const reducersEntities = {
    [basketSlice.name]: basketSlice.reducer
}