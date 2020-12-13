import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import axios from 'axios';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  DialogContentText
} from '@material-ui/core';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1),
   
  }
}));

const ProductCard = ({ className, product, token, ...rest }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () =>{
    axios.post('https://foodeopen.herokuapp.com/api/restaurant/deleteFood', {
      "_id":product._id
    }, {
      headers: {
        'auth-token': token
      }
    }).then(function (response) {
      
      setOpen(false);
      
    }).catch(function (err) {

      console.log(err)

  })
    
    
  };
 

  return (
    
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      
      
      <CardContent>
        <Box
          display="flex"
          justifyContent="center"
          mb={3}
        >
          
          
              <Avatar
            style={{height:"100px",width:"100px", borderRadius:"5px"}}
            alt="product"
            draggable={false}
            src={product.image}
            variant="square"
             >
             <FastfoodIcon />
             </Avatar>
          
  

        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {product.name}
        </Typography>
        
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid
          container
          justify="space-between"
          spacing={2}
        >
          <Grid
            className={classes.statsItem}
            item
          >
            
              
                
                {
                    product.isnonveg?<img draggable={false} style={{width:"22px",height:"22px"}} src="/nveg.svg"/>:
                    <img draggable={false} style={{width:"22px",height:"22px"}} src="/veg.svg"/>
                }
                
                
         
            
            
          </Grid>
          
          <Grid
            className={classes.statsItem}
            item
          >
            <h3>₹</h3>&nbsp;
            <Typography
              color="textSecondary"
              display="inline"
              variant="body2"
            >
              

              {product.price}
              
              
            </Typography>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            <IconButton onClick={handleClickOpen}>
              <DeleteForeverIcon style={{color:"red"}} />
            </IconButton>
            <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The food item will be removed from your inventory.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            close
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default ProductCard;

