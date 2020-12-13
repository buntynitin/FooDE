import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
  },
  images: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    position: 'relative',
    display: 'block',
    padding: 0,
    borderRadius: 0,
    height: '40vh',
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
      height: 100,
    },
    '&:hover': {
      zIndex: 1,
    },
    '&:hover $imageBackdrop': {
      opacity: 0.15,
    },
    '&:hover $imageMarked': {
      opacity: 0,
    },
    '&:hover $imageTitle': {
      border: '4px solid currentColor',
    },
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px 14px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});

function ProductCategories(props) {
  const { classes } = props;

  const images = [
    {
      url:
        'https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/sites/2/2016/01/mastkalandar-f.jpg?w=1200&h=628&fill=blur&fit=fill',
      title: 'North Indian',
      width: '40%',
    },
    {
      url:
        'https://blog.travelkhana.com/food/wp-content/uploads/sites/5/2017/04/South-Indian-Thali-3-1024x589.jpg',
      title: 'South Indian',
      width: '20%',
    },
    {
      url:
        'https://img.traveltriangle.com/blog/wp-content/uploads/2018/02/FotoJetcoverindianrest.jpg',
      title: 'Punjabi',
      width: '40%',
    },
    {
      url:
        'https://www.telegraph.co.uk/content/dam/food-and-drink/2018/02/08/TELEMMGLPICT000152301301_trans_NvBQzQNjv4Bqq02eeg-XwukYXuRTyZZrsxKi2sT3vi7ux2-RDZwC4QA.jpeg?imwidth=450',
      title: 'Chinese',
      width: '38%',
    },
    {
      url:
        'https://www.bodybuilding.com/images/2015/December/is-mexican-food-healthy_05.jpg',
      title: 'Mexican',
      width: '38%',
    },
    {
      url:
        'https://www.nrn.com/sites/nrn.com/files/styles/article_featured_standard/public/burger_0.gif?itok=1dIeFxgf',
      title: 'Continental',
      width: '24%',
    },
  ];

  return (
    <Container className={classes.root} component="section">
      <Typography variant="h4" marked="center" align="center" component="h2">
        For all tastes and all desires
      </Typography>
      <div className={classes.images}>
        {images.map((image) => (
          <ButtonBase
            key={image.title}
            className={classes.imageWrapper}
            style={{
              width: image.width,
            }}
          >
            <div
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image.url})`,
              }}
            />
            <div className={classes.imageBackdrop} />
            <div className={classes.imageButton}>
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className={classes.imageTitle}
              >
                {image.title}
                <div className={classes.imageMarked} />
              </Typography>
            </div>
          </ButtonBase>
        ))}
      </div>
    </Container>
  );
}

ProductCategories.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductCategories);