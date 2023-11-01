import React, {FC, useMemo} from 'react'

import {PriceWithCurrency, ThumbnailInCircle} from "components/shared/ui";

import {IProduct} from "../../models";

import styles from './products-long-composition.module.css'
import {clx} from "../../../../shared/utils";




interface IProductsLongCompositionProps {
    ids: string[]
    products: IProduct[]
}


export const ProductsLongComposition:FC<IProductsLongCompositionProps> = ({ids, products}) => {

    const {bunDoc, ingredientsDoc} = useMemo(()=>{
        const initial = {bunDoc: null as IProduct | null , ingredientsDoc: [] as IProduct[]}
        if (products.length && ids && ids.length)
            return ids.reduce((previousValue, currentValue, index: number) => {
                const product = products.find((p)=>p._id === currentValue)

                if (!product)
                    return previousValue

                if (product.type === 'bun')
                    previousValue.bunDoc = product
                else
                    previousValue.ingredientsDoc.push(product)

                return previousValue
            }
            , initial)

        return initial
    }, [products, ids])


    const cardPositions = useMemo(()=>{
        if (bunDoc)
            ingredientsDoc.unshift(bunDoc)

        const positions = ingredientsDoc as IProduct[]

        return positions.map((v, index)=>
            <div key={index} className={styles.card_position}>
                <div className={styles.card_position_caption}>
                    <ThumbnailInCircle image={v.image_mobile}/>
                    <p className="text text_type_main-default ml-4">{v.name}</p>
                </div>
                <PriceWithCurrency price={"4 x 551"} extraClassName="ml-4"/>
            </div>
        )
    }, [ingredientsDoc, bunDoc])


    return(
        <>
            <div className={clx(styles.content, [styles.box, "pr-6"])}>
                {cardPositions && cardPositions.length && cardPositions}
            </div>
        </>
    )
}