import React, { useContext, Fragment } from "react";
import { UserContext } from "./UserContext";
import { makeStyles } from "@material-ui/core/styles";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
//GENERAL
import {
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  Divider,
  Modal,
  Backdrop,
  Fade,
  IconButton,
  Paper
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  summary: {
    padding: theme.spacing(3),
    border: "1px solid #ddd",
    marginBottom: theme.spacing(2)
  }
}));
// SUMMARY COMPONENT
const UserSummary = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [prop] = useContext(UserContext);
  const { username, email, restaurantName, mobile, openingTime, closingTime, address, city, state, zipcode } = prop.user;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Grid container className={classes.summary}>
        <Grid item xs={12} >
          <Typography variant='h4'>Summary</Typography>

        </Grid>

        <Grid item xs={12}>

          <Typography variant='h6'>Owner</Typography>
          <Typography variant='body2'>{username}</Typography>

        </Grid>
        <Grid item xs={12}>
          <Divider light />
          <Typography variant='h6'>Email</Typography>
          <Typography variant='body2'>{email}</Typography>

        </Grid>

        <Grid item xs={12}>
          <Divider />
          <Typography variant='h6'>Restaurant Name</Typography>
          <Typography variant='body2'>{restaurantName}</Typography>

        </Grid>

        <Grid item xs={12}>
          <Divider />
          <Typography variant='h6'>Phone</Typography>
          <Typography variant='body2'>{mobile}</Typography>

        </Grid>

        <Grid item xs={12}>
          <Divider light />
          <Typography variant='h6'>Restaurnat Timing</Typography>
          <Typography variant='body2'>{openingTime} - {closingTime}</Typography>
        </Grid>

        <Grid item xs={12}>
          <Divider light />
          <Typography variant='h6'>Address</Typography>
          <Typography variant='body2'>{address}, {city}, {state} - {zipcode}</Typography>

        </Grid>

      </Grid>
      <Grid container>
        <Grid item xs={10}>
          <FormControlLabel
            control={
              <Checkbox
                checked={prop.user.acceptTerms}
                required
                color='primary'
                name='acceptTerms'
              />
            }
            label='I accept terms and conditions'
          />
        </Grid>
        <Grid item xs={2}>
          <IconButton onClick={handleOpen}>
            <OpenInNewIcon />
          </IconButton>
        </Grid>

      </Grid>
      <Modal
        
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open} style={{outline:"0",marginTop:"10vh"}}>
          <center><Paper style={{width:"80vw",height:"80vh" }}>
            <h2 id="transition-modal-title">Terms and Conditions</h2>
            <p id="transition-modal-description" style={{wordWrap: "break-word"}}>
            Sample Terms and conditions
            </p>
          </Paper></center>
        </Fade>
      </Modal>
    </Fragment>
  );
};

export default UserSummary