import React from 'react';
import Login from './Login'
import Home from './Home'
import Register from './Register'
import Orders from './Orders'
import Profile from './Profile'
import OrderCallback from './OrderCallback'
import { useStateValue } from './StateProvider';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  Redirect
} from "react-router-dom";
import NotFound from './NotFound'

function UserRoute() {
  const { path } = useRouteMatch();
  const [state , dispatch] = useStateValue();
  return (
    
    <Router>
     <Switch>
       
        <Route exact path={`${path}/`}>
        <Redirect
            to={{
              pathname: `${path}/login`,
            }}
          />
          </Route>

          <Route path={`${path}/login`}>
          {state.isLoggedin?<Redirect
            to={{
              pathname: `${path}/home`,
            }}
          />:<Login />}
          </Route>

          <Route path={`${path}/home`}>
          {!state.isLoggedin?<Redirect
            to={{
              pathname: `${path}/login`,
            }}
          />:<Home />}
          </Route>

          <Route path={`${path}/orders`}>
          {!state.isLoggedin?<Redirect
            to={{
              pathname: `${path}/login`,
            }}
          />:<Orders />}
          </Route>
          
          <Route path={`${path}/orderdetail`}>
          {!state.isLoggedin?<Redirect
            to={{
              pathname: `${path}/login`,
            }}
          />:<Orders orderdetailview={true} />}
        </Route>



          <Route path={`${path}/profile`}>
          {!state.isLoggedin?<Redirect
            to={{
              pathname: `${path}/login`,
            }}
          />:<Profile />}
          </Route>


          <Route path={`${path}/register`}>
          {state.isLoggedin?<Redirect
            to={{
              pathname: `${path}/home`,
            }}
          />:<Register />}
        </Route>

        <Route path={`${path}/restaurant`}>
          {!state.isLoggedin?<Redirect
            to={{
              pathname: `${path}/login`,
            }}
          />:<Home restaurantview={true} />}
        </Route>

        <Route path={`${path}/ordercallback`}>
        {!state.isLoggedin?<Redirect
            to={{
              pathname: `${path}/login`,
            }}
          />:<OrderCallback />}

          
        </Route>

    
          
        <Route path="*">
        <NotFound />
        </Route>
      
       
        </Switch>
    
    </Router>
   
  );
}

export default UserRoute


