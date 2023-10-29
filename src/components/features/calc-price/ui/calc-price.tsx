import React, {FC, useMemo} from 'react'

import {PriceWithCurrency} from "components/shared/ui";

import {IProduct} from "components/entities/products";

import {useCalcPrice} from "../hooks";




interface ICalcPriceProps {
    ids: string[]
    products: IProduct[]

    size?: "medium" | "default" | "large" | undefined
}


export const CalcPrice:FC<ICalcPriceProps> = ({ids, products, size}) => {

    const {selectedBunDoc, selectedIngredientsDocs} = useMemo(()=>{
        const initial = {selectedBunDoc: {} as IProduct, selectedIngredientsDocs: [] as IProduct[]}

        if (products.length && ids.length)
            return ids.reduce((previousValue, currentValue, index: number) => {
                const product = products.find((p)=>p._id === currentValue)

                if (!product)
                    return previousValue

                if (product.type === 'bun')
                    previousValue.selectedBunDoc = product
                else
                    previousValue.selectedIngredientsDocs = previousValue.selectedIngredientsDocs.concat([product])

                return previousValue
            }
            , initial)

        return initial
    }, [products, ids])


    const totalPrice = useCalcPrice(selectedBunDoc, selectedIngredientsDocs)


    return(
        <>
            <PriceWithCurrency price={totalPrice} size={size}/>
        </>
    )
}