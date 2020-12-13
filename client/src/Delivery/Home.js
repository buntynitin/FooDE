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
    Package,
    Settings,
} from 'react-feather';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import ProfileCard from './ProfileCard'
import HomeView from './Views/HomeView'
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
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    closeMenuButton: {
        marginRight: 'auto',
        marginLeft: 0,
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
function Home() {
    const Categories = [{ 'text': 'Home', 'url': '/delivery/home', 'active': true, icon: HomeIcon },
    { 'text': 'Orders', 'url': '/delivery/orders', 'active': false, icon: Package },
    { 'text': 'Settings', 'url': '/delivery/settings', 'active': false, icon: Settings }
    ]
    let history = useHistory();

    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen)
    }


    const drawer = (
        <div>
            <ProfileCard />

            <div style={{ marginTop: "16px" }} />


            {Categories.map((item, index) => (
                <Button key={index}
                    fullWidth
                    className={classes.button}
                    disableFocusRipple={true}
                    disableElevation={true}
                    disableTouchRipple={true}
                    disableRipple={true}
                    style={item.active ? { color: "rgb(63,81,181)", alignItems: "left" } : { color: "gray" }}
                    disabled={item.active}
                    onClick={() => {

                        history.replace(item.url)
                    }}
                ><item.icon className={classes.icon}
                    size="20" />
                    {item.text}
                </Button>
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
                    <img style={{ height: "35px", width: "35px" }}
                        alt="Logo"
                        src="/userlogo.svg"

                    />
                    <Typography variant="h6" className={classes.title}>
                        &nbsp;&nbsp;FooDE Delivery
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
                <HomeView />
            </div>
        </div>
    );
}
Home.propTypes = {
    container: PropTypes.object,
};
export default Home;
