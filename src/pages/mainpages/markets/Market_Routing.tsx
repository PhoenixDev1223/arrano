/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React from 'react';
import {Switch, Route} from 'react-router-dom';  
import Market from './Market';
import market_details from "./Market_details";
import Coin_hook from "./coin_hooks"

import Footer from "../../../components/layouts/Footer";
 
 export default function Market_Routing(){  
    return (  
     <> 
        <Switch>
              <Route path="/market/bsc/:id" component={Coin_hook} />  
              <Route path="/market/:id" component={market_details} />  
              <Route path="/" component={Market} />  
        </Switch>  
        <Footer />
        </>
    ) 
} 
 
