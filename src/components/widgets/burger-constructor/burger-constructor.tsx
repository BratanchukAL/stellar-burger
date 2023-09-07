import React, {useCallback, useMemo} from "react";

import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import {useAppDispatch, useAppSelector} from "components/providers/store";

import {useDropItem} from "components/shared/hooks";

import {IProduct, useGetProductsQuery} from "components/entities/products";
import {basketActions, selectSelectedProductsState} from "components/entities/basket";

import {CardPosition} from "./card-position/card-position";
import {OrderDetails} from "./оrder-details/order-details";

import styles from './burger-constructor.module.css'



export const BurgerConstructor = () => {
    const price = 610
    const {data: products = []} = useGetProductsQuery()
    const {bun: selectedBun, ingredients: selectedIngredients} = useAppSelector(selectSelectedProductsState)

    const dispatch = useAppDispatch()
    const handleDropItem = useCallback((id: string)=>{
        const found = products.find((p)=>p._id === id)

        if (found && found.type === 'bun')
            dispatch(basketActions.addBun(id))
        else
            dispatch(basketActions.add(id))
    }, [])

    const [dropRef] = useDropItem(['bun', 'sauce', 'main'], handleDropItem)

    const selectedBunDoc = useMemo(()=>{
        if (products && selectedBun)
            return products.find((p)=>p._id === selectedBun)
        return null
    }, [products, selectedBun])

    const selectedIngredientsDocs = useMemo(()=>{
        if (products.length && selectedIngredients.length)
            return selectedIngredients.reduce((previousValue: IProduct[], currentValue, index: number):IProduct[] => {
                const found = {
                    ...products.find((p)=>p._id === currentValue.id)!,
                    uuid: currentValue.uuid
                }
                if(found.type === 'bun')
                    return previousValue

                previousValue = previousValue.concat([found])
                return previousValue
            }
            ,[] as IProduct[])
        return []
    }, [products, selectedIngredients])

   return (
       <section>
           <div className={styles.content + ' pl-4 mb-10'} ref={dropRef as React.RefObject<HTMLDivElement>}>
               <div className="pr-4">
                   {selectedBunDoc && <CardPosition
                       id={selectedBunDoc._id}
                       index={0}
                       typeProduct={selectedBunDoc.type}
                       text={`${selectedBunDoc.name} (верх)`}
                       price={selectedBunDoc.price}
                       thumbnail={selectedBunDoc.image}
                       type="top"
                       isLocked={true}
                   />}
               </div>
               <div className={styles.box + ' pr-2'}>
                   {selectedIngredientsDocs.map((v, index)=>
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
                  {selectedBunDoc && <CardPosition
                       id={selectedBunDoc._id}
                       index={0}
                       typeProduct={selectedBunDoc.type}
                       text={`${selectedBunDoc.name} (низ)`}
                       price={selectedBunDoc.price}
                       thumbnail={selectedBunDoc.image}
                       type="bottom"
                       isLocked={true}
                   />}
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