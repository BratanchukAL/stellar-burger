import React, {useEffect, useState} from 'react';
import {Pages} from "components/pages";
import {IProduct, ProductsContext} from "components/entities/products";

import './app.module.css'


// configs
const API_URL = '/fixtures/products.json'


function App() {
    const [products, setProducts] = useState<IProduct[]>([])
    const [isLoading, setLoading] = useState(false)
    const [isError, setError] = useState(false)
    /* const detailError */

    useEffect(()=>{
        if (products.length) return
        setLoading(true)
        setError(false)
        /*by task, here. loading*/
        fetch(API_URL)
            .then((response)=>{
                if (!response.ok)
                    throw new Error(`HTTP error: ${response.status}`);
                return response.json()
            })
            .then((json)=>json || [])
            .then((json)=>setProducts(json))
            .catch((reason) => setError(true))
            .finally(()=>setLoading(false))
    }, [products])


    return (
        <ProductsContext.Provider value={products}>
            <Pages/>
        </ProductsContext.Provider>
    );
}

export default App;
