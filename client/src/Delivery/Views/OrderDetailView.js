import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import { useStateValue } from '../StateProvider';
import {Typography,Grid,Card,Divider, Fab,Slide, Dialog, Select, MenuItem,Button,DialogContent,DialogActions} from '@material-ui/core'
import NavigationIcon from '@material-ui/icons/Navigation';
import axios from 'axios'
import Alert from '@material-ui/lab/Alert';
import Navigation from '../Navigation'
import ReactPlaceholder from 'react-placeholder';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

var messagesEnd

function OrderDetailView() {
    const location = useLocation()
    const [state] = useStateValue()
    const [order, setOrder] = useState({})
    const [hasError,setHasError] = useState(false)
    const [open, setOpen] = useState(false)
    const [open1, setOpen1] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [orderStatus, setOrderStatus] = useState('')
    const [statusError,setstatusError] = useState(false)
    const [statusMessage, setStatusMessage] = useState('Something went wrong')
    const scrollToBottom = () => {
        messagesEnd.scrollIntoView();
      }


  const handleClickOpen = () => {
    setOpen(true);
    
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen1 = () => {
    setstatusError(false)
    setOrderStatus('')
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOrderStatus('')
    setOpen1(false);
  };

  const handleSave = () =>{
      setStatusMessage('Something went wrong')
      setstatusError(false)
      if(orderStatus === '')
        return
      setSubmitting(true)


    const obj = {order_id:order.order_id,order_status:orderStatus,change_payment : false}
    axios.post('https://foodeopen.herokuapp.com/api/order/changestatus',obj,{
                
                headers: {
                    'auth-token': state.token
                }
            }).then((response) => {
                const neworder = order
                neworder['order_status'] = 'Delivered'
                setOrder(neworder)
                setSubmitting(false)
                setOpen1(false)

            }).catch((err) => {
                setstatusError(true)
                setSubmitting(false)
            });

  }

  

    const getTotalamount = () => {
        var total = 0
        var i
        for (i = 0; i < order.basket.length; i++)
            total += order.basket[i].price * order.basket[i].count

        return total
    }

    useEffect(()=>{
        if(messagesEnd)scrollToBottom();
    },[open])

    useEffect(() => {
        
        
        
        if(new URLSearchParams(location.search).get('order_id'))
          {
              axios.get(`https://foodeopen.herokuapp.com/api/order/getOrderbyidv2?order_id=${new URLSearchParams(location.search).get('order_id')}`,{
                headers: {
                    'auth-token': state.token
                }
            }).then((response) => {
                console.log(response.data)
                setOrder(response.data)
                
                setHasError(false)

            }).catch((err) => {
                setHasError(true)    
            });

          }else{
             
              setHasError(true)
          }
    },[])
    return (
        <div style={{ marginBottom:"80px"}}>
            { ((JSON.stringify(order).replace(/\s/g,'') === '{}') && !hasError)?
        <div style={{marginTop:"16px"}}>
        <Grid container spacing={2}>
                         
                                <Grid item xs={12} sm={6} >
                                    <ReactPlaceholder style={{ borderRadius: "18px", width: "100%", height: "450px" }} type="rect" ready={false} showLoadingAnimation={true} color='rgba(63,81,181,0.3)' />


                                </Grid>
                                <Grid item xs={12} sm={6} >

                                <ReactPlaceholder style={{ borderRadius: "18px", width: "100%", height: "450px" }} type="rect" ready={false} showLoadingAnimation={true} color='rgba(63,81,181,0.3)' />
                                </Grid>
                        </Grid>
                        <ReactPlaceholder style={{position:"fixed",bottom:"16px",right:"16px",width: "56px", height: "56px" }} type="round" ready={false} showLoadingAnimation={true} color='rgba(63,81,181,0.3)' />
                        </div>:
        <div>
       
    <div>
       {hasError?
         <center><img style={{marginTop:"35vh"}} width='200px' height="130px" src="/order.svg" alt=""/>
         <Typography variant='h5'>
             No such Order
         </Typography>
        
         </center>:
      <div>
        {
            (order.order_status === 'In Transit') &&
            <Fab onClick={handleClickOpen} color="primary" style={{position:"fixed",bottom:"16px",right:"16px"}}>
            <NavigationIcon style={{fontSize:"36px"}} />
            </Fab>
        }
          
       
        <Grid container spacing={2}>
        <Grid item sm={6} xs={12}>
        <Card style={{marginTop: "16px",padding:"16px", borderRadius:"18px"}} >
        <Typography style={{ fontSize: "18px" }}>
               Order Detail 
            </Typography>
           <div style={{marginBottom:"6px"}} />
            <Card style={{padding:"8px", marginBottom:"8px"}} variant="outlined">
            <Grid container spacing={0}>
                <Grid item xs={6}>
                    <Typography style={{color: "#6c757d"}}>
                        Customer name
                    </Typography>

                </Grid>
                <Grid item xs={6}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <Typography variant='body2' style={{transform:"translateY(20%)"}}>
                        {order.user_name}
                </Typography>
                </div>
                </Grid>

            </Grid>
            </Card>
            
            <Card style={{padding:"8px", marginBottom:"8px"}} variant="outlined">
            <Grid container spacing={0}>
                <Grid item xs={4}>
                    <Typography style={{color: "#6c757d"}}>
                        Delivery Address
                    </Typography>

                </Grid>
                <Grid item xs={8}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <Typography variant='caption'>
                        {order.address.address.formatted_address}
                </Typography>
                </div>
                </Grid>

            </Grid>
            </Card>
           
            <Card style={{padding:"8px", marginBottom:"8px"}} variant="outlined">
            <Grid container spacing={0}>
                <Grid item xs={4}>
                    <Typography style={{color: "#6c757d"}}>
                        Amount
                    </Typography>

                </Grid>
                <Grid item xs={8}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <Typography variant='body2' style={{transform:"translateY(20%)"}}>
                        ₹{order.total_amount}
                </Typography>
                </div>
                </Grid>

            </Grid>
            </Card>

        

            <Card style={{padding:"8px", marginBottom:"8px"}} variant="outlined">
            <Grid container spacing={0}>
                <Grid item xs={4}>
                    <Typography style={{color: "#6c757d"}}>
                        Payment type
                    </Typography>

                </Grid>
                <Grid item xs={8}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <Typography variant='body2' style={{transform:"translateY(20%)"}}>
                        {order.payment_type}
                </Typography>
                </div>

                </Grid>

            </Grid>
            </Card>
            { (order.payment_type === 'PREPAID')?
            <div>
                <Card style={{padding:"8px", marginBottom:"8px" }} variant="outlined">
            <Grid container spacing={0}>
                <Grid item xs={4}>
                    <Typography style={{color: "#6c757d"}}>
                        Payment status
                    </Typography>

                </Grid>
                <Grid item xs={8}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <Typography variant='body2' style={{transform:"translateY(20%)", color: `${(order.payment_status === 'Payment failed')?'#e63946':'black'}`}} >

                        {order.payment_status}
                </Typography>
                </div>
                </Grid>
                
              
            </Grid>
            </Card>
            </div>
            :
            <div />
            }
          
            <Card style={{padding:"8px", marginBottom:"8px"}} variant="outlined">
            <Grid container spacing={0}>
                <Grid item xs={4}>
                    <Typography style={{color: "#6c757d"}}>
                        Date
                    </Typography>

                </Grid>
                <Grid item xs={8}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <Typography variant='body2' style={{transform:"translateY(20%)"}}>
                {(new Date(order.time)).toDateString()}
                </Typography>
                </div>

                </Grid>

            </Grid>
            </Card>

            <Card style={{padding:"8px", marginBottom:"8px"}} variant="outlined">
            <Grid container spacing={0}>
                <Grid item xs={4}>
                    <Typography style={{color: "#6c757d"}}>
                        Time
                    </Typography>

                </Grid>
                <Grid item xs={8}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <Typography variant='body2' style={{transform:"translateY(20%)"}}>
                {(new Date(order.time)).toLocaleTimeString()}
                </Typography>
                </div>

                </Grid>

            </Grid>
            </Card>

            <Card style={{padding:"8px", marginBottom:"8px"}} variant="outlined">
            <Grid container spacing={0}>
                <Grid item xs={4}>
                    <Typography style={{color: "#6c757d"}}>
                        Order status
                    </Typography>

                </Grid>
                {
                    (order.order_status === 'Order Cancelled')?
                    <Grid item xs={8}>
                         <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <Typography variant='body2' style={{transform:"translateY(20%)",color:'red'}}>
                {order.order_status}
                </Typography>
                </div>
                </Grid>:
                <Grid container xs={8}>
                 <Grid item xs={6}>
                 <center>
                 <Typography variant='body2' style={{transform:"translateY(20%)"}}>
                         {order.order_status}
                 </Typography>
                 
             
                 </center>
                 </Grid>
                 <Grid item xs={6}>
                 <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                     <Button size="small" color="primary" variant="outlined" onClick={handleClickOpen1} >Update</Button>
                     </div>
                 </Grid>
            
             </Grid>
                }
                </Grid>
            </Card>


        

        </Card>
        </Grid>
        <Grid item sm={6} xs={12}>
            <Card style={{marginTop: "16px",padding:"16px", borderRadius:"18px"}}>
            <Typography style={{ fontSize: "18px" }}>
               Food Items
            </Typography>

            <Divider style={{ marginTop: "2px", marginBottom: "8px" }} />

            {order.basket.map((item, index) =>
                <div>
                    <div style={{ fontSize: "16px", color: "#343a40" }}>
                        <img alt="" draggable={false} style={{ width: "12px", heigth: "12px" }} src={item.isnonveg ? "/nveg.svg" : "/veg.svg"} />
                &nbsp;
                {item.name}



                    </div>

                    <Grid container>
                        <Grid item xs={10}>
                            <div style={{ display: "flex", alignItems: "flex-end" }}>
                                <div style={{ padding: "1px", borderRadius: "2px", width: "24px", background: "rgba(63,81,181,0.2)", borderWidth: "1.5px", borderStyle: "solid", borderColor: "rgb(63,81,181)" }}>
                                    <center>{item.count}</center>
                                </div>
                                <Typography variant="caption" style={{ fontSize: "13px", marginLeft: "12px", color: "#343a40" }}>X&nbsp;&nbsp;₹{item.price}</Typography>
                            </div>

                        </Grid>
                        <Grid item xs={2}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                                <Typography variant="caption" style={{ fontSize: "13px", color: "#343a40" }}>
                                    ₹{(item.price * item.count).toFixed(2)}
                                </Typography>

                            </div>

                        </Grid>
                    </Grid>





                    <Divider style={{ marginTop: "20px", marginBottom: "8px" }} />



                </div>


            )}
            <Grid container>
                <Grid item xs={10}>
                    <Typography style={{ color: "#495057" }}>
                        Item total
                       </Typography>

                </Grid>
                <Grid item xs={2}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                        <Typography style={{ color: "#495057" }}>
                            ₹{getTotalamount().toFixed(2)}
                        </Typography>

                    </div>

                </Grid>
                <Grid item xs={10}>
                    <Typography variant="caption" style={{ fontSize: "13px", color: "#6c757d" }}>
                        Taxes(5%)
                       </Typography>

                </Grid>
                <Grid item xs={2}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                        <Typography variant="caption" style={{ fontSize: "13px", color: "#6c757d" }}>
                            ₹{(getTotalamount() * 0.05).toFixed(2)}
                        </Typography>

                    </div>

                </Grid>
                <Grid item xs={10}>
                    <Typography variant="caption" style={{ fontSize: "13px", color: "#6c757d" }}>
                        Delivery Charge(10%)
                       </Typography>

                </Grid>
                <Grid item xs={2}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", color: "#6c757d" }}>
                        <Typography variant="caption" style={{ fontSize: "13px" }}>
                            ₹{(getTotalamount() * 0.1).toFixed(2)}
                        </Typography>

                    </div>

                </Grid>


            </Grid>

            <Divider style={{ marginTop: "8px" }} />
            <Grid container>
                <Grid item xs={10}>
                    <Typography style={{ color: "#495057" }}>
                        Grand Total
                       </Typography>

                </Grid>
                <Grid item xs={2}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                        <Typography style={{ color: "#495057" }} >
                            <strong>₹{order.total_amount}</strong>
                        </Typography>

                    </div>

                </Grid>


            </Grid>
            </Card>
        </Grid>
        </Grid>


        <Dialog disableBackdropClick disableEscapeKeyDown open={open1} onClose={handleClose1}>
        <Typography variant="h6" style={{padding:"16px"}}>
            Update Order status
        </Typography>
        <Divider />
       
        <center><DialogContent style={{width:"300px"}}>
          
               
              <Select
                style={{width:"100%"}}
                id="demo-dialog-select"
                value={orderStatus}
                onChange={(e)=> setOrderStatus(e.target.value)}
                variant="outlined"
              >
                
                <MenuItem disabled value={"In Transit"}>In Transit</MenuItem>
                <MenuItem disabled={!(order.order_status === "In Transit")} value={"Delivered"}>Delivered</MenuItem>
               
               
              </Select>

              {statusError && (
                <div>
                    <br></br>
                <Alert severity="error">{statusMessage}</Alert>
                </div>
            )}
          
        </DialogContent>
        </center>
        <DialogActions>
          <Button onClick={handleClose1}>
            Cancel
          </Button>
          <Button disabled={submitting} onClick={handleSave} color="primary" variant="contained"> 
            Save
          </Button>
        </DialogActions>
      </Dialog>

        <Dialog
        open={open}
        fullWidth = {'sm'}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
           {
            (order.order_status === 'In Transit') &&
          <Navigation room_id={order.order_id} 
          lat1={order.address.lat}
          long1={order.address.long}
          lat2={order.restaurant[0].coordinates[1]}
          long2={order.restaurant[0].coordinates[0]}
          />
           }
      </Dialog>
            
        </div>
        
       }
       </div>
       
   </div>
   
    
    }


        </div>
    )
}

export default OrderDetailView
