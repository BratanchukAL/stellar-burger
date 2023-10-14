import {RootStateType} from "components/providers/store";

import {IIngredientDetails} from "./models";



export const selectCurrentIngredientDetailsState = (state: RootStateType): IIngredientDetails => state.ingredientDetails.data;