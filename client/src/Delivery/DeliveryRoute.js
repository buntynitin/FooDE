import React from 'react';
import { useStateValue } from './StateProvider';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  Redirect
} from "react-router-dom";
import Map from './Map'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import NotFoundView from './Views/NotFoundView'
import Settings from './Settings'
import Order from './Order'

function DeliveryRoute() {
  const [state , dispatch] = useStateValue();
  const { path } = useRouteMatch();
  return (
    
    <Router>
     <Switch>
       
        {/* <Route exact path={`${path}/`}>
        <Home />
        </Route>

        <Route exact path={`${path}/client`}>
        <Map
            width='100%'
            height='100vh'
            room_id=''
            lat1={25.74845914147879}
            long1={82.68236956214577}
            lat2={25.731331140802624}
            long2={82.69782598938866}
            

            
            
            />
        </Route> */}


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

          <Route path={`${path}/settings`}>
          {!state.isLoggedin?<Redirect
            to={{
              pathname: `${path}/login`,
            }}
          />:<Settings />}
          </Route>

          <Route path={`${path}/orders`}>
          {!state.isLoggedin?<Redirect
            to={{
              pathname: `${path}/login`,
            }}
          />:<Order />}
          </Route>


          <Route path={`${path}/orderdetail`}>
          {!state.isLoggedin?<Redirect
            to={{
              pathname: `${path}/login`,
            }}
          />:<Order isDetailView={true} />}
          </Route>

          <Route path={`${path}/register`}>
          {state.isLoggedin?<Redirect
            to={{
              pathname: `${path}/home`,
            }}
          />:<Register />}
        </Route>
          
          <Route path="*">
            <NotFoundView />
          </Route>
      
       
        </Switch>
    
    </Router>
   
  );
}

export default DeliveryRoute

