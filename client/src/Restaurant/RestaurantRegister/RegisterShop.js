import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Header from '../Header'
//REGISTER FORM
import RegisterForm from "./RegisterForm";
//HEADER
import Typography from "@material-ui/core/Typography";
//CONTEXT
import UserContextProvider from "./UserContext";
const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "100vh",
    alignContent: "stretch",
    [theme.breakpoints.down("sm")]: {
      alignContent: "flex-start"
    }
  },
  header: {
    padding: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    background:"#edf2f4",
    // background: "linear-gradient(to right, #fc00ff, #00dbde)", 
    [theme.breakpoints.down("sm")]: {
      flexGrow: 1
    }
  },
  title: {
    color: "#fffff",
    marginBottom: theme.spacing(1)
  },
  subtitle: {
    color: theme.palette.primary.light
  },
  toolbar: {
    justifyContent: "center"
  }
}));
function RegisterShop() {
  const classes = useStyles();
  return (
    <UserContextProvider>
      <Header />
      <Grid container className={classes.root}>
        <Grid item className={classes.header} xs={12} md={4} style={{borderRadius:"0px 0px 30px 30px"}}>
        <center>
          <img style={{width:"150px", height:"150px"}} alt="" src="https://res.cloudinary.com/dez3yjolk/image/upload/v1603378441/samples/kisspng-catering-food-computer-icons-logo-event-management-catering-5abf487cd18447_qcrvwi.png" />
          </center>
          <Typography variant='h4' className={classes.title}>
            Registration
          </Typography>
          <Typography variant='h6' className={classes.subtitle}>
            Grow your business with us
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <RegisterForm />
        </Grid>
      </Grid>
    </UserContextProvider>
  );
}

export default RegisterShop;