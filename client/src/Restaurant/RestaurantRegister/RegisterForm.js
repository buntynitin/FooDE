import React, { Fragment, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
//MY MODULES
import UserPreferences from "./UserPreferences";
import UserDetails from "./UserDetails";
import UserSummary from "./UserSummary";
import FormComplete from "./FormComplete";

//GENERAL
import { Box, Snackbar, SnackbarContent } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import ErrorIcon from "@material-ui/icons/Error";
//STEPPER
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";

//FORM
import Button from "@material-ui/core/Button";
//CONTEXT
import { UserContext } from "./UserContext";
import axios from 'axios'

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(8, 12)
    },
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(4, 6)
    }
  },
  center: {
    textAlign: "center"
  },
  content: {
    padding: theme.spacing(2, 0, 0, 0)
  },
  buttonsContainer: {
    margin: theme.spacing(2, 0)
  },
  button: {
    marginRight: theme.spacing(2)
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  message: {
    display: "flex",
    alignItems: "center"
  },
  icon: {
    marginRight: theme.spacing(1)
  }
}));

const steps = ["Owner Details", "Restaurant details", "Summary"];

//MAIN COMPONENT
const RegisterForm = props => {
  const [completed, setCompleted] = React.useState(false);
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [errors] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [ownerError, setOwnerError] = React.useState('');
  const [state, setState] = useContext(UserContext);
  const [thisuser] = useContext(UserContext);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };


  const handleCloseSnackbar = () => {
    setOpen(false);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (activeStep < steps.length - 1) handleNext();
    else {
      setIsSubmitting(true);
      setOwnerError('');
      axios.post('https://foodeopen.herokuapp.com/api/restaurant/registerOwner', {
        username: thisuser.user.username,
        email: thisuser.user.email,
        password: thisuser.user.password,
      })
        .then(function (response) {
          axios.post('https://foodeopen.herokuapp.com/api/restaurant/addRestaurant', {
            owner_id: response.data.owner_id,
            restaurantname: thisuser.user.restaurantName,
            mobile: parseInt(thisuser.user.mobile),
            image: thisuser.user.image,
            openingtime: thisuser.user.openingTime,
            closingtime: thisuser.user.closingTime,
            tags: thisuser.user.tags,
            address: thisuser.user.address,
            city: thisuser.user.city,
            state: thisuser.user.state,
            zipcode: parseInt(thisuser.user.zipcode),
            coordinates: thisuser.user.coordinates
          }).then(function (response) {
            setIsSubmitting(false);
            setCompleted(true);
          }).catch(function (error) {
            setIsSubmitting(false);
            if (error.message === "Network Error")
              setOwnerError("Network Error");
            else
              setOwnerError(error.response.data.error);
          })
        }).catch(function (error) {
          setIsSubmitting(false);
          if (error.message === "Network Error")
            setOwnerError("Network Error");
          else
            setOwnerError(error.response.data.error);
        })
      console.log(thisuser.user)

    }
  };

  const getStepContent = step => {
    switch (step) {
      case 0:
        return <UserDetails />;
      case 1:
        return <UserPreferences />;
      case 2:
        return <UserSummary />;
      default:
        return "Unknown step";
    }
  };

  const handleError = e => {
    errors[e.target.name] = e.target.validationMessage;
    setState({ ...state, errors: { ...errors } });
    setOpen(true);
  };

  const handleChange = e => {
    //PASSWORD MATCHING
    if (
      e.target.name === "confirmPassword" &&
      e.target.value !== state.user.password
    ) {
      e.target.setCustomValidity("Passwords are not matching");
    } else {
      e.target.setCustomValidity("");
    }
    if (e.target.name === "password") {
      const confirm = e.target.form.querySelector(
        "input[name='confirmPassword']"
      );
      // WHEN WE CHANGE PASSWORD, WE WANT TO VALIDATE CONFIRM PASSWORD AS WELL
      if (e.target.value === state.user.confirmPassword) {
        delete errors[confirm.name];
        confirm.setCustomValidity("");
      } else {
        confirm.setCustomValidity("Passwords are not matching");
        errors[confirm.name] = confirm.validationMessage;
      }
    }
    if (e.target.validity.valid) {
      //OTHER ELEMENTS
      delete errors[e.target.name];
    } else {
      errors[e.target.name] = e.target.validationMessage;
    }
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setState({
      ...state,
      user: { ...state.user, [e.target.name]: value },
      errors: { ...errors }
    });
  };

  return (
    <Fragment>
      {!completed && (
        <Box className={classes.root}>
          <Stepper activeStep={activeStep} orientation='vertical'>
            {steps.map((label, index) => {
              const labelProps = {};


              return (
                <Step key={index}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                  <StepContent>
                    <form
                      autoComplete="off"
                      onSubmit={handleSubmit}
                      onInvalid={handleError}
                      onChange={handleChange}
                      className={classes.content}
                    >
                      {getStepContent(activeStep)}
                      <div className={classes.buttonsContainer}>
                        <Button
                          disabled={activeStep === 0}
                          className={classes.button}
                          variant='contained'
                          onClick={handleBack}
                        >
                          Back
                        </Button>
                        {activeStep < steps.length - 1 && (
                          <Button
                            type='submit'
                            className={classes.button}
                            variant='contained'
                            color='primary'
                          >
                            Next
                          </Button>
                        )}
                        {activeStep === steps.length - 1 && (
                          <Button
                            type='submit'
                            className={classes.button}
                            variant='contained'
                            color='primary'
                            disabled={isSubmitting ? true : false}

                          >
                            Submit
                          </Button>
                        )}
                      </div>
                    </form>
                  </StepContent>
                </Step>
              );
            })}
          </Stepper>
        </Box>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        resumeHideDuration={3000}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        open={open}
      >
        <SnackbarContent
          className={(classes.error, classes.error)}
          message={
            <span className={classes.message}>
              <ErrorIcon className={classes.icon} />
              {"Please correct the data"}
            </span>
          }
        />
      </Snackbar>



      {ownerError && (
        <Alert style={{ margin: "20px" }} severity="error">{ownerError}</Alert>
      )}
      {completed && (
        <Box className={(classes.root, classes.center)}>
          <FormComplete />
        </Box>
      )}
    </Fragment>
  );
};

export default RegisterForm 