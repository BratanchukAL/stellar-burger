import {RootStateType} from "components/providers/store";

import {IBasket} from "./models";

export const selectSelectedProductsState = (state: RootStateType): IBasket => state.basket.data
