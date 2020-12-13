import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import { useStateValue } from '../../../StateProvider';
import {Typography,Grid,Card,Divider, Fab,Slide, Dialog,  TextField, Select, MenuItem,Button,Input,InputLabel,DialogTitle,DialogContent,FormControl,DialogActions} from '@material-ui/core'
import { MessageSquare, X, ArrowRightCircle } from 'react-feather'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert';
import ReactPlaceholder from 'react-placeholder';
import QRCode from 'qrcode'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

var messagesEnd

export default function OrderDetailView() {
    const location = useLocation()
    const [qrcanvas, setQrcanvas] = useState('')
    const [state] = useStateValue()
    const [newMessage, setNewMessage] = useState('')
    const [order, setOrder] = useState({})
    const [hasError,setHasError] = useState(false)
    const [open, setOpen] = useState(false)
    const [open1, setOpen1] = useState(false)
    const [load, setLoad] = useState(false)
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

    


    if(orderStatus === "Order Confirmed")
    {
        axios.post('https://foodeopen.herokuapp.com/api/delivery/sendDeliveryrequest',{},{
            headers:{
                'auth-token' : state.token
            }
        }).then(()=>{
            const myobj = {order_id:order.order_id,order_status:'Order Confirmed',change_payment : false}
            axios.post('https://foodeopen.herokuapp.com/api/order/changestatus',myobj,{
                headers: {
                    'auth-token': state.token
                }
            }).then((response) => {
                setSubmitting(false)
                setOpen1(false)

            }).catch((err) => {
                setstatusError(true)
                setSubmitting(false)
            });

        }).catch((e)=>{
            if(e.response.data.error === 'No nearby delivery agent'){
                setStatusMessage('No nearby delivery agent')
                setstatusError(true)
                setSubmitting(false)

            }
            else{
            setstatusError(true)
            setSubmitting(false)
            }
        })

        return 

    }



    const obj = ((order.payment_type === 'PREPAID' && order.payment_status === 'Payment Success') && orderStatus === 'Order Cancelled')?
                    {order_id:order.order_id,order_status:orderStatus,change_payment : true}:
                    {order_id:order.order_id,order_status:orderStatus,change_payment : false}
    axios.post('https://foodeopen.herokuapp.com/api/order/changestatus',obj,{
                
                headers: {
                    'auth-token': state.token
                }
            }).then((response) => {
                setSubmitting(false)
                
                setOpen1(false)

            }).catch((err) => {
                setstatusError(true)
                setSubmitting(false)
            });

  }

  const handleSend = () =>{
      
    if(newMessage.replace(/\s/g,'') === '')
        return
    else{
        
        setLoad(true)
        
        const obj = {order_id: order.order_id ,by:'restaurant',message:newMessage}
        axios.post('https://foodeopen.herokuapp.com/api/order/addMessage',obj,{
                
                headers: {
                    'auth-token': state.token
                }
            }).then((response) => {

                scrollToBottom();
                setLoad(false)
                setNewMessage('')
                
            
            }).catch((err) => {
               scrollToBottom();
               setLoad(false)
               setNewMessage('')
               
            });

    }
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
              axios.get(`https://foodeopen.herokuapp.com/api/order/getOrderbyid?order_id=${new URLSearchParams(location.search).get('order_id')}`,{
                headers: {
                    'auth-token': state.token
                }
            }).then((response) => {
                
                setOrder(response.data)
                QRCode.toString(response.data.order_id,(err,url)=>{
                    setQrcanvas(url)
                })
                setHasError(false)

            }).catch((err) => {
                setHasError(true)    
            });

          }else{
             
              setHasError(true)
          }
    })
    return (
        <div style={{ marginLeft:"16px",marginRight:"16px",marginBottom:"80px"}}>
            { ((JSON.stringify(order).replace(/\s/g,'') === '{}') && !hasError)?
        // <center><img style={{marginTop:"35vh"}} width='200px' height="130px" src="/loading.svg" alt=""/>
        // <Typography style={{transform:"translateY(-40px)"}}>
        //     Getting Order detail ..
        // </Typography>
       
        // </center>
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
          <Fab onClick={handleClickOpen} color="primary" style={{position:"fixed",bottom:"16px",right:"16px"}}>
            {open?<X />:<MessageSquare />}
        </Fab>
       
        <Grid container spacing={2}>
        <Grid item sm={6} xs={12}>
        <Card style={{marginTop: "16px",padding:"16px", borderRadius:"18px"}} >
        <Typography style={{ fontSize: "18px" }}>
               Order Detail 
            </Typography>
            {
                (qrcanvas === '')?<div />
                : <center><div style={{width:"100px",height:"100px"}} dangerouslySetInnerHTML={{ __html: qrcanvas }}>
                </div></center>
            }
           
            {/* <Divider style={{ marginTop: "2px", marginBottom: "8px" }}/> */}

            <Card style={{padding:"8px", marginBottom:"8px"}} variant="outlined">
            <Grid container spacing={0}>
                <Grid item xs={4}>
                    <Typography style={{color: "#6c757d"}}>
                        Customer name
                    </Typography>

                </Grid>
                <Grid item xs={8}>
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
        <Typography variant="h4" style={{padding:"16px"}}>
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
                // input={<Input />}
              >
                
                <MenuItem disabled value={"Order Processing"}>Order Processing</MenuItem>
                <MenuItem disabled={!(order.order_status === "Order Processing")} value={"Order Confirmed"}>Order Confirmed</MenuItem>
                <MenuItem disabled={!(order.order_status === "Order Confirmed")} value={"Preparing your meal"}>Preparing your meal</MenuItem>
                <MenuItem disabled={!(order.order_status === "Preparing your meal")} value={"Awaiting delivery agent"}>Awaiting delivery agent</MenuItem>
                <Divider />
                <MenuItem disabled={!(order.order_status === "Order Processing")} value={"Order Cancelled"}>Order Cancelled</MenuItem>
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
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
          
      
     
           
          
        <div style={{width:"342px", height:"80vh",background:"url(https://res.cloudinary.com/dez3yjolk/image/upload/v1607089644/samples/chatbackground_tjkimh.svg)"}}>
        <div style={{padding:"16px 8px 8px 8px"}}>
            <Typography variant='h5' style={{color:"rgb(63,81,181)"}}>
               Chat<MessageSquare />
            </Typography>
            <Divider style={{background:"rgb(63,81,181)", marginBottom:"12px"}}/>
            <div className='chatbox' style={{height:"60vh",overflow:"hidden", overflowY:"auto"}}>
            {
                
               
                order.custom_chat.map((mssge,index)=>
                
                    <div key={index}>
                   { (mssge.by === 'user')?
                   <div  style={{display:"flex", flexDirection:"column", alignItems:"flex-start"}}>
                    <Card style={{maxWidth:"70%",padding:"8px", marginBottom:"12px", borderTopRightRadius:"18px",borderBottomLeftRadius:"18px",borderBottomRightRadius:"18px",background:"rgba(63,81,181,0.8)"}}>
                <Typography style={{color:"white"}}>
                    {mssge.message}
                </Typography>
            </Card></div>:
            <div style={{display:"flex", flexDirection:"column", alignItems:"flex-end"}}>
            <Card style={{maxWidth:"70%",padding:"8px", marginBottom:"12px",borderTopRightRadius:"18px",borderBottomLeftRadius:"18px",borderTopLeftRadius:"18px", background:"rgba(63,81,181,0.8)"}}>
                <Typography style={{color:"white"}}>
                {mssge.message}
                </Typography>
            </Card>
            </div>
               
                
                 
                }
                </div>
                )
                
            }
            <div style={{ float:"left", clear: "both" }}
             ref={(el) => { messagesEnd = el; }}>
        </div>
        
            </div>
            
            

        </div>

        <Grid container style={{width:"100%", position:"absolute",bottom:"0px"}}>
            <Grid item xs={10}>         
           <TextField
           
           fullWidth
           variant='outlined'
           size='small'
           value={newMessage}
           onChange={(e)=>{
               setNewMessage(e.target.value)
           }}
           placeholder='Type a message'>
           </TextField>
           </Grid>
           <Grid item xs={2}>
           <div style={{width:"100%",background:"rgba(63,81,181,0.2)", height:"100%", display:"flex",alignItems:"center", borderRadius:"4px"}}>

                                       
                                        <ArrowRightCircle className="sendButton" onClick={()=>handleSend()} style={{marginLeft:"50%", transform:"translatex(-50%)"}} color={load?"gray":"rgb(63,81,181)"} />
                                         
                                          
                                           
                                          
            </div>


           </Grid>
           </Grid>
           </div>
     
      
      </Dialog>
            
        </div>
        
       }
       </div>
       
   </div>
   
    
    }


        </div>
    )
}
