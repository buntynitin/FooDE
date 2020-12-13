import React from 'react';
import './App.css';
import Home from './Landing/Home'
import RestaurantRoute from './Restaurant/RestaurantRoute'
import UserRoute from './User/UserRoute'
import DeliveryRoute from './Delivery/DeliveryRoute'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { StateProvider } from './Restaurant/StateProvider'
import { UserStateProvider } from './User/StateProvider'
import { LocationStateProvider } from './User/LocationStateProvider'
import { DeliveryStateProvider } from './Delivery/StateProvider'
import reducer, { initialState } from './Restaurant/reducer';
import userreducer, { userinitialState } from './User/reducer';
import deliveryreducer,{ deliveryinitialState } from './Delivery/reducer'
import locationreducer, { locationinitialState } from './User/locationreducer';
import NotFound from './NotFound'
function App() {
  return (
    <Router>
          <Switch>
          <Route exact path="/">
          <Home />
          </Route>
          
          <Route path="/restaurant">
          <StateProvider initialState={ initialState } reducer={reducer}>
          <RestaurantRoute />
          </StateProvider>
          </Route> 

          <Route path='/delivery'>
            <DeliveryStateProvider initialState={ deliveryinitialState } reducer={deliveryreducer} >
              <DeliveryRoute />
            </DeliveryStateProvider>
            
          </Route>

          <Route path="/user">
          <UserStateProvider initialState={ userinitialState } reducer={userreducer}>
          <LocationStateProvider initialState={ locationinitialState } reducer={locationreducer}>
          <UserRoute />
          </LocationStateProvider>
          </UserStateProvider>
          
          </Route> 
          
          <Route path="*">
          <NotFound />
          </Route>
          </Switch>
       
    </Router>
  );
}

export default App;


