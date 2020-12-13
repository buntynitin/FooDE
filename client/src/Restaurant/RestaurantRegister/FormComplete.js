import React, { Fragment } from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
    textAlign: "center",
    backgroundImage: "url(https://res.cloudinary.com/dez3yjolk/image/upload/v1604078530/samples/completion_noixt6.svg)",
    backgroundRepeat: "repeat",
    backgroundSize: "auto",
    minHeight: "100vh"
  },
  title: {
    padding: theme.spacing(5, 0)
  },
  subtitle: {
    color: theme.palette.primary.light
  },
}));

const FormComplete =  () => {
  const classes = useStyles();
  return (
    
       <Fragment >
      <div className={classes.root}>
      <Typography variant='h3' className={classes.title}>
        Congratulation! 
      </Typography>
      <Typography variant='h6' className={classes.subtitle}>
      You have been registered.
      </Typography>
      </div>
    </Fragment>
    
   
  );
};

export default FormComplete