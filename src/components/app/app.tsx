import React from 'react';

import {withProviders} from "components/providers";

import {Pages} from "components/pages";

import './app.module.css'


const App = () => {

    return (
        <Pages/>
    );
}

export default withProviders(App);
