import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
  Typography

} from '@material-ui/core';
import ReactPlaceholder from 'react-placeholder';
import AddIcon from '@material-ui/icons/Add';
import Page from '../../components/Page';
// import Toolbar from './Toolbar';
import ProductCard from './ProductCard';
import { useStateValue } from '../../../StateProvider';
import Upload from './Upload'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    
  },
  productCard: {
    height: '100%'
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
  paper:{
    marginTop:theme.spacing(2),
    padding : theme.spacing(1),
  }
}));



function ProductListView() {
  const classes = useStyles();
  const [products, setProducts] = useState([])
  const [state, dispatch] = useStateValue();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [isnonveg, setIsnonveg] = useState(false);
  const [open, setOpen] = useState(false);
  const [image,setImage] = useState('')
  const [isSubmitting,setIsSubmitting] = useState(false)
  const [isLoading,setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setImage('');
    setIsnonveg(false);
    setName('');
    setPrice('');
  };


  const handelAddItem = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formdata = {"name":name,"price":parseFloat(price),"isnonveg":isnonveg,"image":image}
    axios.post('https://foodeopen.herokuapp.com/api/restaurant/addFood', formdata, {
      headers: {
        'auth-token': state.token
      }
    }).then(function (response) {
      setIsSubmitting(false);
      handleClose();
      
    }).catch(function (err) {
      setIsSubmitting(false);
      console.log(err)

  })
    
    
    
    
  }
  useEffect(() => {
    axios.get(`https://foodeopen.herokuapp.com/api/restaurant/restaurantDetail?owner_id=${state._id}`

    ).then(function (response) {

      axios.get(`https://foodeopen.herokuapp.com/api/restaurant/restaurantCatalog?restaurant_id=${response.data._id}`

      ).then(function (res) {
        setProducts(res.data)
        setIsLoading(false)
        setHasError(false)
 
      }).catch(function (err) {
        setIsLoading(false)
        setHasError(true)

      })



    }).catch(function (error) {
      setIsLoading(false)
      setHasError(true)
    })
  }, [products])
  return (
    // <div>
    //     {items.map((item,index) =>


    //         <li key={index}>{item.name}</li>
    //     )}
    // </div>
    <Page
      className={classes.root}
      title="Products"
    >

      
      {
        isLoading?
        <Box m={3}>
        <Grid container spacing={3}>
                            {[{},{},{},{},{},{},{},{},{}].map((placeHolder, index) =>
                                <Grid item md={6} lg={4} xs={12} key={index} >
                                    <ReactPlaceholder style={{ borderRadius: "4px", width: "100%", height: "265px" }} type="rect" ready={false} showLoadingAnimation={true} />


                                </Grid>
                            )}
                        </Grid>
                        </Box>
        :

        <div>
          {hasError?<div>
                    <center style={{marginTop:"30vh"}}>
                
                <img draggable={false} width='80px' height="80px" src="/cancel.svg" alt=""/>
                <Typography  variant='h5'>
                     Something went wrong
                </Typography>
               
                </center>
                </div>:
           <Container style={{marginBottom:"56px"}} maxWidth={false}>
        <Fab className={classes.fab}  color="primary" onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="responsive-dialog-title">
        {"Add food item"}
        
        </DialogTitle>
        <Divider />
          <form onSubmit={handelAddItem} autoComplete="off">
            <DialogContent>
              <TextField
                variant="outlined"
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
                label="Food name"
                name="name"

              />
              <TextField
                label='Price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                name='price'
                type='number'
                variant='outlined'
                margin='normal'
                required
                inputProps={{
                  min: 0,
                  step: 0.001
                }}
                fullWidth
              />
              <Paper className={classes.paper}>
                <h4 style={{margin:"8px"}}>Upload Image</h4>
                
              <Upload setimage={setImage} />
              </Paper>
              

              <FormControlLabel
                control={
                  <Checkbox
                    checked={isnonveg}
                    onChange={(e) => setIsnonveg(e.target.checked)}
                    color='primary'
                    name='isnonveg'
                  />
                }
                label='Non-Veg.'
              />

            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                close
          </Button>
              <Button disabled={isSubmitting} type="submit" color="primary" variant="contained" autoFocus>
                Submit
          </Button>
            </DialogActions>
          </form>
        </Dialog>
        {(products.length <= 0)?
         <div>
         <center style={{marginTop:"30vh"}}>
     
     <img  width='200px' height="130px" src="/food.svg" alt="loading"/>
     <Typography  variant='h5'>
          No Food items to show
     </Typography>
    
     </center>
     </div>:
     <Box mt={3}>
     <Grid
       container
       spacing={3}
     >


       {products.map((product) => (
         <Grid
           item
           key={product._id}
           lg={4}
           md={6}
           xs={12}
         >
           <ProductCard
             className={classes.productCard}
             product={product}
             token={state.token}

           />
         </Grid>
       ))}


     </Grid>
   </Box>
 
        }
        
      </Container> 
          
          }
        </div>
     
      }
      
    </Page>
  )
}


export default ProductListView




