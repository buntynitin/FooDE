import React, { useContext } from "react";
//GENERAL
import { TextField, Grid } from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
//CONTEXT
import { UserContext } from "./UserContext";

const UserDetail = props => {
  const [state] = useContext(UserContext);
  const { user, errors } = state;
  const [showPassword1, setShowPassword1] = React.useState(false)
  const [showPassword2, setShowPassword2] = React.useState(false)

  const handleClickShowPassword1 = () => {
    setShowPassword1(!showPassword1)
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
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          // placeholder='Type your username here'
          name='username'
          label='Name'
          value={user.username}
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
          error={!!errors["username"]}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          // placeholder='Type your email here'
          name='email'
          label='Email'
          value={user.email}
          type='email'
          variant='outlined'
          margin='normal'
          error={!!errors["email"]}
          required
          fullWidth
        />
      </Grid>



      <Grid item xs={12} lg={6}>
        <FormControl variant="outlined" fullWidth margin='normal'>
          <InputLabel>Password</InputLabel>
          <OutlinedInput
            name='password'
            label='Password'
            value={user.password}
            type={showPassword1 ? 'text' : 'password'}
            variant='outlined'
         
           
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
            error={!!errors["password"]}
            inputProps={{
              minLength: 6,
              maxLength: 255
            }}

          />


        </FormControl>


      </Grid>
      <Grid item xs={12} lg={6}>
        <div>
        <FormControl variant="outlined" fullWidth margin='normal' style={{marginBottom:'10px'}}>
          <InputLabel>Confirm Password</InputLabel>
          <OutlinedInput
            label='Confirm Password'
            name='confirmPassword'
            value={user.confirmPassword}
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
            error={!!errors["confirmPassword"]}
            inputProps={{
              minLength: 6,
              maxLength: 255
            }}
          />
        </FormControl>
        </div>
      </Grid>
    </Grid>
  );
};


export default UserDetail