import React from 'react';
import DashboardView from './views/reports/DashboardView';
import NotFoundView from './views/errors/NotFoundView';
import ProductListView from './views/product/ProductListView';
import SettingsView from './views/settings/SettingsView';
import OrderListView from './views/order/OrderListView';
import OrderDetailView from './views/order/OrderDetailView';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  Redirect,
} from "react-router-dom";


// const routes = [
//   {
//     path: '/',
//     element: <DashboardLayout />,
//     children: [
      
//       { path: 'account', element: <AccountView /> },
//       { path: 'customers', element: <CustomerListView /> },
//       { path: 'dashboard', element: <DashboardView /> },
//       { path: 'products', element: <ProductListView /> },
//       { path: 'settings', element: <SettingsView /> },
//       { path: '404', element: <NotFoundView /> },
//       { path: '/', element: <Navigate to="/dashboard" /> },
//       { path: '*', element: <Navigate to="/404" /> },
//     ]
//   },
 
// ];

function Adminroutes() {
  
  const { path } = useRouteMatch();
  return (
 
     <Router>
     <Switch>
        

        


          <Route exact path={`${path}/`}>
          <Redirect
            to={{
              pathname: `${path}/dashboard`,
            }}
          />
              
          </Route>

          <Route path={`${path}/dashboard`} component={DashboardView}/>
          {/* <DashboardView />
              
          </Route> */}
          <Route path={`${path}/products`} component={ProductListView} />
          {/* <ProductListView />
              
          </Route> */}
          <Route path={`${path}/settings`} component={SettingsView} />
          {/* <SettingsView />
              
          </Route> */}

          <Route path={`${path}/orders`} component={OrderListView} />  

          <Route path={`${path}/orderdetail`} component={OrderDetailView} />  

          <Route path="*">
        <NotFoundView />
        </Route>
          {/* <Route path={`${path}/login`}>
            {state.isLoggedin?<Redirect
            to={{
              pathname: "/restaurant/managementconsole",
            }}
          />:<Login />}
             
          </Route>
          <Route path={`${path}/managementconsole`}>
            {state.isLoggedin?<Admin />:<Redirect
            to={{
              pathname: "/restaurant/login",
            }}
          />}
          </Route>
          
        <Route path="*">
        <h1>404-restaurant</h1>
        </Route> */}
      
       
        </Switch>
    
    </Router>
   

  );
}


export default Adminroutes;
