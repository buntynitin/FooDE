import React from 'react';
import RegisterShop from './RestaurantRegister/RegisterShop'
import Login from './Login'
import Admin from './Admin/Admin'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  Redirect
} from "react-router-dom";
import NotFound from './NotFound'
import { useStateValue } from './StateProvider';

function RestaurantRoute() {
  const [state , dispatch] = useStateValue();
  const { path } = useRouteMatch();
  return (
    
    <Router>
     <Switch>
        <Route exact path={`${path}/`}>
        {state.isLoggedin?<Redirect
            to={{
              pathname: "/restaurant/admin/dashboard",
            }}
          />:<Login />}
          </Route>
          <Route path={`${path}/register`} >
          {state.isLoggedin?<Redirect
            to={{
              pathname: "/restaurant/admin/dashboard",
            }}
          />:<RegisterShop/>}
          </Route> 
          <Route path={`${path}/login`}>
            {state.isLoggedin?<Redirect
            to={{
              pathname: "/restaurant/admin/dashboard",
            }}
          />:<Login />}
             
          </Route>
          <Route path={`${path}/admin`}>
            {state.isLoggedin?<Admin />:<Redirect
            to={{
              pathname: "/restaurant/login",
            }}
          />}
          </Route>
          
        <Route path="*">
        <NotFound />
        </Route>
      
       
        </Switch>
    
    </Router>
   
  );
}

export default RestaurantRoute


