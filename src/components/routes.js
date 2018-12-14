import React from 'react';
import { Route, Switch } from 'react-router-dom';

import allProducts from './pages/allProducts';
import addProduct from './pages/addProduct';
import editProduct from './pages/editProduct';

const Routes = () => {
    return(
        <Switch>
            <Route path="/" exact component={allProducts}/>
            <Route path="/add" exact component={addProduct}/>
            <Route path="/edit" exact component={editProduct}/>
        </Switch>
    )
};

export default Routes;