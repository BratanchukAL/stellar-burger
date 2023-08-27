import React, {useEffect, useState} from 'react';
import {Pages} from "components/pages";
import {ProductsContext} from "components/entities/products";

import './app.module.css'


function App() {
    const [products, setProducts] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [isError, setError] = useState(false)
    /* const detailError */

    useEffect(()=>{
        setLoading(true)
        setError(false)
        /*by task, here. loading*/
        fetch('/fixtures/products.json')
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
