import {useMemo} from "react";

import {IProduct} from "components/entities/products";


export const useCalcPrice = (selectedBunDoc:IProduct | null, selectedIngredientsDocs:IProduct[], deps:any = []):number => {
    return useMemo(() => {
        let total = 0
        if (!selectedBunDoc && !selectedIngredientsDocs.length)
            return total

        if (selectedBunDoc)
            total = selectedBunDoc.price * 2

        if (selectedIngredientsDocs.length)
            total = selectedIngredientsDocs.reduce((previousValue: number, currentProd: IProduct): number => {
                previousValue += currentProd.price
                return previousValue
            }, total)

        return total
    }, [selectedIngredientsDocs, selectedBunDoc])
}