import {ReturnSliceActionsType} from "components/shared/utils";

import {IngredientDetailsSlice} from "./ingredient-details/persist";

export { useGetProductsQuery } from "./api/api";
export type { IProduct } from "./models";



export const reducersProducts = {
    [IngredientDetailsSlice.name]: IngredientDetailsSlice.reducer
}


//typing actions
export type TypedActionsFromProducts =
    ReturnSliceActionsType<typeof IngredientDetailsSlice.actions>