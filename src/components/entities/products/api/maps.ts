import {IProduct} from "../models";
import {ProductDto} from "./types";

export function mapProducts(dto: ProductDto): IProduct[] {
    return dto.data;
}