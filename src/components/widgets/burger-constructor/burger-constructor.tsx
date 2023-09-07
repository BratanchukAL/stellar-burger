import React, {useMemo} from "react";

import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import {useAppSelector} from "components/providers/store";

import {IProduct, useGetProductsQuery} from "components/entities/products";
import {selectSelectedProductsState} from "components/entities/basket";

import {CardPosition} from "./card-position/card-position";
import {OrderDetails} from "./оrder-details/order-details";

import styles from './burger-constructor.module.css'




export const BurgerConstructor = () => {
    const price = 610
    const {data: products = []} = useGetProductsQuery()
    const {bun: selectedBun, ingredients: selectedIngredients} = useAppSelector(selectSelectedProductsState)


    // const selectedBunDoc = useMemo(()=>{
    //     if (products && selectedBun)
    //         return products.find((p)=>p._id === selectedBun)
    //     return null
    // }, [])

    const selectedIngredientsDoc = useMemo(()=>{
        if (products.length && selectedIngredients.length)
            return selectedIngredients.reduce((previousValue: IProduct[], currentValue, index: number):IProduct[] => {
                const found = {
                    ...products.find((p)=>p._id === currentValue.id)!,
                    uuid: currentValue.uuid
                }

                previousValue = previousValue.concat([found])
                return previousValue
            }
            ,[] as IProduct[])
        return []
    }, [products, selectedIngredients])

   return (
       <section>
           <div className={styles.content + ' pl-4 mb-10'} >
               <div className="pr-4">
                   {/*<CardPosition*/}
                   {/*    id={}*/}
                   {/*    type="top"*/}
                   {/*    isLocked={true}*/}
                   {/*    text="Краторная булка N-200i (верх)"*/}
                   {/*    price={200}*/}
                   {/*/>*/}
               </div>
               <div className={styles.box + ' pr-2'}>
                   {selectedIngredientsDoc.map((v, index)=>
                       <CardPosition
                           id={v._id}
                           index={index}
                           typeProduct={v.type}
                           key={v.uuid}
                           text={v.name}
                           price={v.price}
                           thumbnail={v.image}
                       />
                   )}
               </div>
               <div className="pr-4">
                   {/*<CardPosition*/}
                   {/*    type="bottom"*/}
                   {/*    isLocked={true}*/}
                   {/*    text="Краторная булка N-200i (низ)"*/}
                   {/*    price={200}*/}
                   {/*/>*/}
               </div>
           </div>
           <div className={styles.button_order}>
               <span className="mr-10">
                   <p className="text text_type_digits-medium">{price}&nbsp;
                   <CurrencyIcon type="primary" /></p>
               </span>
               <OrderDetails>
                   <Button htmlType={'button'}>Оформить заказ</Button>
               </OrderDetails>
           </div>
       </section>
   );
}