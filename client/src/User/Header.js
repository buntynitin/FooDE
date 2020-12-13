import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { useStateValue } from './StateProvider';
import {
    Link
  } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [state , dispatch] = useStateValue();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
         
          <img style={{height:"35px" ,width:"35px"}}
      alt="Logo"
      src="/userlogo.svg"
    
    />
          <Typography variant="h6" className={classes.title}>
            &nbsp;&nbsp;FooDE
          </Typography>
          {
              state.isLoggedin?<div/>:
              <Link style={{textDecoration:"none", color:"white"}} to="/user/login"><Button variant="contained" style={{background:"rgba(255,255,255,0.1)",color:"white"}}>Login</Button></Link>
          }
          
          
          
        </Toolbar>
      </AppBar>
    </div>
  );
}