import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {
    Home as HomeIcon,
    ShoppingBag,
    User,
    Clipboard,
    ArrowLeft
  } from 'react-feather';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button, colors, Divider } from '@material-ui/core';
import { NavLink as RouterLink,Link,Redirect,useHistory } from 'react-router-dom';
import HomeView from './Views/HomeView'
import RestaurantView from './Views/RestaurantView'
import ProfileCard from './ProfileCard'
const drawerWidth = 256;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(2),
        
    },
    icon: {
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(2)
      },
      button: {
        color: theme.palette.text.secondary,
        justifyContent: 'flex-start',
        letterSpacing: 0,
        padding: '10px 8px',
        textTransform: 'none',
        width: '100%'
      },
      
  
}));
function Home({ restaurantview }) {
    const Categories = [{ 'text': 'Home', 'url': '/user/home', 'active': true, icon:HomeIcon },
    { 'text': 'Orders', 'url': '/user/orders', 'active': false, icon:ShoppingBag },
    { 'text': 'Profile', 'url': '/user/profile', 'active': false, icon:User }
    ]
    let history = useHistory();
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    function onOpen(){
        setMobileOpen(!mobileOpen)
    }
    
    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen)
    }

    function handlemyDrawer()
     { 
        setMobileOpen(false)
    }

    const drawer = (
        <div>
           
        <ProfileCard />
        
        <div style={{marginTop:"16px" }} />
            

            {Categories.map((item, index) => (
                <div>
                    {(restaurantview && item.active)?
                     <Button key={index}
                     fullWidth
                     className={classes.button}
                     disableFocusRipple={true}
                     disableElevation={true}
                     disableTouchRipple={true}
                     disableRipple={true}
                     style={(item.active && !restaurantview )?{color:"rgb(63,81,181)"}:{color:"gray"}}
                     disabled={item.active && !restaurantview}
                     //  component={RouterLink}
                     // to={item.url}
                     onClick={() => {
                             if(restaurantview && item.active)
                             history.goBack()
                             else
                             history.replace(item.url)
                     }}
                 >
                     {(restaurantview && item.active)?<ArrowLeft className={classes.icon}
                 size="20"/>:<item.icon className={classes.icon}
                 size="20"/>}
                     
                     {item.text}
                 </Button>
                    :<div />}
                {!restaurantview?
                     <Button key={index}
                     fullWidth
                     className={classes.button}
                     disableFocusRipple={true}
                     disableElevation={true}
                     disableTouchRipple={true}
                     disableRipple={true}
                     style={(item.active && !restaurantview )?{color:"rgb(63,81,181)"}:{color:"gray"}}
                     disabled={item.active && !restaurantview}
                     //  component={RouterLink}
                     // to={item.url}
                     onClick={() => {
                             if(restaurantview && item.active)
                             history.goBack()
                             else
                             history.replace(item.url)
                     }}
                 >
                     {(restaurantview && item.active)?<ArrowLeft className={classes.icon}
                 size="20"/>:<item.icon className={classes.icon}
                 size="20"/>}
                     
                     {item.text}
                 </Button>
                    :<div />}
               
                {restaurantview && item.active?
                <Button
                className={classes.button}
                size="small"
                style={{color:"rgb(63,81,181)", textTransform:"none"}}
                fullWidth
                disabled
                >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Clipboard className={classes.icon}
                size="16"/>{"Catalog"}
                </Button>:
                <div />
            }
                </div>
                //   <ListItem button key={text}>
                //       <Button>{text}</Button>
                //     <ListItemText primary={text} />
                //   </ListItem>
            ))}
            </div>

 
    );
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <img style={{height:"35px" ,width:"35px"}}
      alt="Logo"
      src="/userlogo.svg"
    
    />
          <Typography variant="h6" className={classes.title}>
            &nbsp;&nbsp;FooDE
          </Typography>
                </Toolbar>
            </AppBar>

            <nav className={classes.drawer}>
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <SwipeableDrawer
                        
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onOpen={handleDrawerToggle}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        
                        {drawer}
                    </SwipeableDrawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <SwipeableDrawer
                    
                        className={classes.drawer}
                        variant="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        open={mobileOpen}
                        onOpen={handleDrawerToggle}
                        onClose={handleDrawerToggle}
                    >   
                        <div className={classes.toolbar} />
                        {drawer}
                    </SwipeableDrawer>
                </Hidden>
            </nav>
            <div className={classes.content}>
                <div className={classes.toolbar} />
                {!restaurantview?<HomeView handlemyDrawer={handlemyDrawer} /> :<RestaurantView />}
            </div>
        </div>
    );
}
Home.propTypes = {
    container: PropTypes.object,
};
export default Home;
