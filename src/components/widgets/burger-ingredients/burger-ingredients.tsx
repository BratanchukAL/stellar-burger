import React, {useMemo} from "react"

import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";

import {CategoryProduct} from "./category-product/category-product";
import {CardProduct} from "./card-product/card-product";

import {useAppSelector} from "components/providers/store";
import {selectSelectedProductsState} from "components/entities/basket";
import { useGetProductsQuery } from "components/entities/products";

import {useTabScroll} from "./hooks/useTabScroll";

import styles from './burger-ingredients.module.css'



export const BurgerIngredients = () => {
    const [currentTab, scrollRef, categoriesRefs, onClickTabCategory] = useTabScroll('bun', 70)
    const {bun: selectedBun, ingredients: selectedIngredients} = useAppSelector(selectSelectedProductsState)

    const {
        data: products = [],
        // isLoading,
        // isSuccess,
        // isError,
        // error
    } = useGetProductsQuery()

    const categoriesData = useMemo(()=>[
        {
            name: 'bun',
            lang: 'Булки'
        },{
            name: 'sauce',
            lang: 'Соусы'
        },{
            name: 'main',
            lang: 'Начинки'
        },
    ], [])

    const productsElements = useMemo(()=> categoriesData.map((category, index)=>{
        const productsOfCat = products.filter((v)=>v.type===category.name)

        return (
            <div key={category.name} ref={el => categoriesRefs.current[category.name] = el! }>
                <CategoryProduct  title={category.lang} extraClass={'mb-10'}>
                    {
                        productsOfCat.map((prod => {
                            // Counter products
                            const count = selectedIngredients.filter((v)=>v.id===prod._id).length +
                                (selectedBun === prod._id ? 1 : 0)

                            return (
                                <CardProduct key={prod._id}
                                    id={prod._id}
                                    productType={prod.type}
                                    count={count}
                                    price={prod.price}
                                    caption={prod.name}
                                    image={prod.image_large}
                                    details={prod}
                                    extraClass={'mr-3 ml-3 mb-4 mt-4'}
                                />
                            )
                        }))
                    }
                </CategoryProduct>
            </div>
        )
    }), [categoriesData, products, categoriesRefs, selectedBun, selectedIngredients])

    return (
        <section>
            <div className={styles.tabs_content}>
                {
                    categoriesData.map((v)=>
                        <Tab key={v.name}
                             value={v.name}
                             active={currentTab === v.name}
                             onClick={onClickTabCategory}>
                            {v.lang}
                        </Tab>
                    )
                }
            </div>

            <div className={styles.box + ' mt-10'} ref={scrollRef}>
                { productsElements }
            </div>
        </section>
    );
};