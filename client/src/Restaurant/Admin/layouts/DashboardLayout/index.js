import React, { useState, useEffect } from 'react';
// import { Outlet } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  Redirect,
} from "react-router-dom";
import { makeStyles } from '@material-ui/core';
import Adminroutes from '../../routes'
import NavBar from './NavBar';
import TopBar from './TopBar';
const useStyles = makeStyles((theme) => ({
  
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const DashboardLayout = () => {
  
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

 

  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
         <Adminroutes/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
