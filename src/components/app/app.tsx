import React, {useEffect, useState} from 'react';

import {Pages} from "components/pages";
import {fetchIngredients, IProduct, ProductsContext} from "components/entities/products";

import './app.module.css'



function App() {
    const [products, setProducts] = useState<IProduct[]>([])
    const [isLoading, setLoading] = useState(false)
    const [isError, setError] = useState(false)
    /* const detailError */

    useEffect(()=>{
        setLoading(true)
        setError(false)
        /*by task, here. loading*/
        fetchIngredients()
            .then((json) => setProducts(json))
            .catch(() => {
                setError(true)
            })
            .finally(() => setLoading(false));
    }, [])


    return (
        <ProductsContext.Provider value={products}>
            <Pages/>
        </ProductsContext.Provider>
    );
}

export default App;
