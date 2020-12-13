


import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from "@material-ui/core/Typography";
import Success from './Success'
import ErrorIcon from "@material-ui/icons/Error";
import Header from './Header'
const useStyles = makeStyles((theme) => ({
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
        background: "#edf2f4",
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
    },
    formdiv: {
        padding: 0,

        [theme.breakpoints.up("sm")]: {
            padding: theme.spacing(15, 20, 0, 20)
        }
    },
    form: {
        padding: theme.spacing(3)
    },
    register: {
        padding: theme.spacing(2, 0, 0, 0)
    },
    message: {
        display: "flex",
        alignItems: "center"
      },
      error: {
        backgroundColor: theme.palette.error.dark
      },
      icon: {
        marginRight: theme.spacing(1)
      }
}));

function Register() {


    const classes = useStyles();
    const [isSubmitting, setIsSubmitting] = React.useState(false);
  
    const [accountCreated, setAccountCreated] = React.useState(false);
    const [loginError, setLoginError] = React.useState('');
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [showPassword1, setShowPassword1] = React.useState(false)
    const [showPassword2, setShowPassword2] = React.useState(false)
    const [matchPassword, setMatchPassword] = React.useState(true)
    const [open, setOpen] = React.useState(false);
    const [snackmessage, setSnackmessage] = React.useState('');
    const handleClickShowPassword1 = () => {
        setShowPassword1(!showPassword1)
    };

    const handleCloseSnackbar = () => {
        setOpen(false);
      };

    const handleMouseDownPassword1 = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword2 = () => {
        setShowPassword2(!showPassword2)
    };

    const handleMouseDownPassword2 = (event) => {
        event.preventDefault();
       
    };

    
    const handleSubmit = (e) => {
        setLoginError('')
        
        e.preventDefault()
        if(password !== confirmPassword){
            setMatchPassword(false)
            setSnackmessage('Passwords not matching')
            setOpen(true);
            return 
        }
        setIsSubmitting(true)
        axios.post('https://foodeopen.herokuapp.com/api/user/register', {
        name,email,password
      }).then(function (response) {
        setIsSubmitting(false)
        setAccountCreated(true)

        }).catch(function (error){
            setIsSubmitting(false)
            if (error.message === "Network Error")
            setLoginError('Network Error')
          else
            setLoginError(error.response.data.error);

        })

     
    }

    return (
        <div>
            <Header />
            <Grid container className={classes.root}>

                <Grid item className={classes.header} xs={12} md={4} style={{ borderRadius: "0px 0px 30px 30px" }}>
                    <center>
                        <img style={{ width: "150px", height: "150px" }} alt="" src="https://res.cloudinary.com/dez3yjolk/image/upload/v1603378441/samples/kisspng-catering-food-computer-icons-logo-event-management-catering-5abf487cd18447_qcrvwi.png" />
                    </center>
                    <Typography variant='h4' className={classes.title}>
                        Sign Up
          </Typography>

                </Grid>
                
                <Grid item xs={12} md={8}>
                {accountCreated? <Success />:
                    <div className={classes.formdiv}>
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
              {snackmessage}
            </span>
          }
        />
      </Snackbar>
                         
                        <form className={classes.form} autoComplete="off" onSubmit={handleSubmit}>
                            
                            <TextField


                                label='Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                variant='outlined'
                                margin='normal'
                                // InputLabelProps={{
                                //   shrink: true
                                // }}
                                required
                                inputProps={{
                                    minLength: 6,
                                    maxLength: 255
                                }}

                                fullWidth
                            />
                            <div style={{marginBottom:"8px"}} />

                            <TextField
                                // placeholder='Type your email here'

                                label='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type='email'
                                variant='outlined'
                                margin='normal'

                                required
                                fullWidth
                            />
                            <div style={{marginBottom:"8px"}} />
                            
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={6}>
                            <FormControl variant="outlined" fullWidth margin='normal'>
                                <InputLabel>Password</InputLabel>
                                <OutlinedInput
                                    name='password'
                                    label='Password'
                                    type={showPassword1 ? 'text' : 'password'}
                                    variant='outlined'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword1}
                                                onMouseDown={handleMouseDownPassword1}
                                                edge="end"
                                            >
                                                {showPassword1 ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    required
                                    inputProps={{
                                        minLength: 6,
                                        maxLength: 255
                                    }}

                                />


                            </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <FormControl variant="outlined" fullWidth margin='normal' style={{ marginBottom: '10px' }}>
                                             <InputLabel>Confirm</InputLabel>
                                             <OutlinedInput
                                                label='Confirm'
                                                name='confirmpassword'
                                                value={confirmPassword}
                                                onChange={(e) => {
                                                //     if(e.target.value !== password)
                                                //     {
                                                //     e.target.setCustomValidity('Passwords not matching')
                                                //     }
                                                //     else 
                                                //     { e.target.setCustomValidity('')
                                                // }
                                                    setMatchPassword('true')
                                                    setConfirmPassword(e.target.value)
                                                }}
                                                type={showPassword2 ? 'text' : 'password'}
                                                variant='outlined'
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword2}
                                                            onMouseDown={handleMouseDownPassword2}
                                                            edge="end"
                                                        >
                                                            {showPassword2 ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                required
                                                error={!matchPassword}
                                                
                                            />
                                        </FormControl>
                                        </Grid>
                                        </Grid>
                                        <div style={{marginBottom:"16px"}} />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                disabled={isSubmitting}

                            >

                                

                                Sign Up
          </Button>

          





                            {/* {loginError && (
        <Alert style={{ marginTop: "16px" }} severity="error">{loginError}</Alert>
      )} */}

{loginError && (
        <Alert style={{ marginTop: "16px" }} severity="error">{loginError}</Alert>
      )}
                        </form>


                    </div>
}

                </Grid>

            </Grid>

        </div>
    );
}

export default Register
