import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React, {useEffect} from 'react';
import ProductCategories from './modules/views/ProductCategories';
import ProductSmokingHero from './modules/views/ProductSmokingHero';
import AppFooter from './modules/views/AppFooter';
import ProductHero from './modules/views/ProductHero';
import ProductValues from './modules/views/ProductValues';
import ProductCTA from './modules/views/ProductCTA';
import ProfileCards from './ProfileCards'
import axios from 'axios';
function Index() {

 useEffect(() => {
    axios.get('https://foodeopen.herokuapp.com/api/restaurant/allrestaurantList').then(()=>{}).catch(()=>{})
  },[])

  return (
    <React.Fragment>
      <ProductHero />
      <ProductValues />
      <ProductCategories />
	<ProfileCards />
      <ProductCTA />
      <ProductSmokingHero />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);