import {IngredientDetailsSlice} from "./ingredient-details/slice";

export { useGetProductsQuery } from "./api/api";
export type { IProduct } from "./models";

export const reducersProducts = {
    [IngredientDetailsSlice.name]: IngredientDetailsSlice.reducer
}