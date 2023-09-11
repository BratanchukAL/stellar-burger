import {IProduct} from "../models";

export type ProductDto = {
    success: boolean
    data: IProduct[]
}