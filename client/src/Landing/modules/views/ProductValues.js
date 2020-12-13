import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';

const styles = (theme) => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    backgroundColor: theme.palette.secondary.light,
  },
  container: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(30),
    display: 'flex',
    position: 'relative',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  image: {
    height: 55,
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
  },
});

function ProductValues(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <img
          src="https://res.cloudinary.com/dez3yjolk/image/upload/v1607743523/samples/productCurvyLines_puecgu.png"
          className={classes.curvyLines}
          alt=""
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src="/norestaurant.svg"
                alt=""
              />
              <Typography variant="h6" className={classes.title}>
                From the best Restaurants
              </Typography>
              <center>
              <Typography variant="h5">
                {'We serve you food from the best restaurants around you'}
                {', rely on our service without fear'}
              </Typography>
              </center>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src="/map.svg"
                alt=""
              />
              <Typography variant="h6" className={classes.title}>
                Live Delivery Tracking
              </Typography>
              <center>
              <Typography variant="h5">
                {'Take food in your control with our pin point accurate tracking system'}
               
              </Typography>
              </center>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src="/chat.svg"
                alt=""
              />
              <Typography variant="h6" className={classes.title}>
                Chat with Restaurant
              </Typography>
              <center>
              <Typography variant="h5">
                {'Get your order customized without hassles with our integrated messenger'}
                
              </Typography>
              </center>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

ProductValues.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductValues);