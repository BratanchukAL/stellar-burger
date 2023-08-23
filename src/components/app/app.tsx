import React, {useEffect, useState} from 'react';
import {Pages} from "components/pages";
import {ProductsContext} from "components/entities/products";

import './app.module.css'


function App() {
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [isError, setError] = useState(false)
    /* const detailError */

    useEffect(()=>{
        setLoading(true)
        setError(false)
        /*by task, here. loading*/
        fetch('/fixtures/products.json')
            .then((response)=>response.json())
            .then((json)=>json || [])
            .then((json)=>setData(json))
            .catch((reason) => setError(true))
            .finally(()=>setLoading(false))
    }, [data])


    return (
        <ProductsContext.Provider value={data}>
            <Pages/>
        </ProductsContext.Provider>
    );
}

export default App;
