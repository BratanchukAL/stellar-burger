import {RootStateType} from "components/providers/store";

export const selectSelectedProductsState = (state: RootStateType) => state.basket.data
