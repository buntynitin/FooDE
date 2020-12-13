import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import DashboardLayout from './layouts/DashboardLayout';
import './mixins/chartjs';
import theme from './theme/index';

const Admin = () => {
  

  return (
   
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      
      <DashboardLayout />
     
    </ThemeProvider>
   
  );
};

export default Admin;
