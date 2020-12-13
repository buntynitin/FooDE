import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';
import TextField from '../components/TextField';

function Copyright() {
  return (
    <React.Fragment>
      {'© '}
      <Link color="inherit" href="/">
        FooDE
      </Link>{' '}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.secondary.light,
  },
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
  },
  iconsWrapper: {
    height: 120,
  },
  icons: {
    display: 'flex',
  },
  icon: {
    width: 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.warning.main,
    marginRight: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.warning.dark,
    },
  },
  list: {
    margin: 0,
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  language: {
    marginTop: theme.spacing(1),
    width: 150,
  },
}));

export default function AppFooter() {
  const classes = useStyles();

  return (
    <Typography component="footer" className={classes.root}>
      <Container className={classes.container}>
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <Grid
              container
              direction="column"
              justify="flex-end"
              className={classes.iconsWrapper}
              spacing={2}
            >
              <Grid item className={classes.icons}>
                <a className={classes.icon}>
                  <img src="/appFooterFacebook.png" alt="" />
                </a>
                <a className={classes.icon}>
                  <img src="/appFooterTwitter.png" alt="" />
                </a>
                <a href="https://github.com/buntynitin/FooDE" className={classes.icon}>
                  <img width="25px" height="25px" src="/github.png" alt="" />
                </a>
              </Grid>
              <Grid item>
                <Copyright />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            
            <Typography variant="h6" marked="left" gutterBottom>
              Links
            </Typography>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                <Link href="/restaurant">FooDE-Business</Link>
              </li>
              <li className={classes.listItem}>
                <Link href="/delivery">FooDE-Delivery</Link>
              </li>
              <li className={classes.listItem}>
                <Link href="https://app.swaggerhub.com/apis/buntynitin/foode_API/1.0.0">API Docs</Link>
              </li>
            </ul>
            
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}