import React from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { useStateValue } from './StateProvider';
import  { useHistory } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Container, IconButton, Avatar, Grid, Divider, Card } from '@material-ui/core'
import { Home, ArrowLeft } from 'react-feather'
import ReactPlaceholder from 'react-placeholder';
function OrderCallback() {
    const history = useHistory()
    const [order,setOrder] = React.useState({})
    const [hasError,setHasError] = React.useState(false)
    const [state] = useStateValue()
    const getTotalamount = () => {
        var total = 0
        var i
        for (i = 0; i < order.basket.length; i++)
            total += order.basket[i].price * order.basket[i].count

        return total
    }
    React.useEffect(() => {
        axios.get(`https://foodeopen.herokuapp.com/api/order/getOrderbyid?order_id=${new URLSearchParams(location.search).get('order_id')}`,{
            headers: {
                'auth-token': state.token
            }
        }).then(function (response){
           
            setHasError(false)
            setOrder(response.data)
            
       

        }).catch(function(error){
            
            setHasError(true)
        })

    })
    

    const location = useLocation()
    return (
        <div>
             <AppBar position="static">
   <Toolbar>
   <IconButton style={{marginLeft:"-12px",marginRight:"16px"}} onClick={()=> history.goBack()}>
       <ArrowLeft color="white" />
   </IconButton>
    
     <img style={{height:"35px" ,width:"35px"}}
 alt="Logo"
 src="/userlogo.svg"

/>
     <Typography variant="h6" style={{flexGrow:1}}>
       &nbsp;&nbsp;FooDE
     </Typography>
    
     
     
     
   </Toolbar>
 </AppBar>
        { ((JSON.stringify(order).replace(/\s/g,'') === '{}') && !hasError)?
        // <center><img style={{marginTop:"35vh"}} width='200px' height="130px" src="/loading.svg" alt="loading"/>
        // <Typography style={{transform:"translateY(-40px)"}}>
        //     Getting Order status ..
        // </Typography>
       
        // </center>
        <Container>
            <div style={{marginTop:"16px"}} />
          <center>  <ReactPlaceholder style={{ borderRadius: "18px", width: "100%", height: "100px" }} type="rect" ready={false} showLoadingAnimation={true} color='rgba(63,81,181,0.3)' />
       
          </center>
        <div style={{marginTop:"26px"}}/>
        <Grid container spacing={2}>
                        
                                <Grid item xs={12} sm={6}>
                                    <ReactPlaceholder style={{ borderRadius: "18px", width: "100%", height: "360px" }} type="rect" ready={false} showLoadingAnimation={true} color='rgba(63,81,181,0.3)' />


                                </Grid>
                                 <Grid item xs={12} sm={6}>
                                 <ReactPlaceholder style={{ borderRadius: "18px", width: "100%", height: "360px" }} type="rect" ready={false} showLoadingAnimation={true} color='rgba(63,81,181,0.3)' />


                             </Grid>
                      
                        </Grid>
            </Container>:
        <div>
       
    <Container>
       {hasError?
       <center> <IconButton style={{ marginTop: "35vh", width: "60px", height: "60px", }} onClick={() => history.goBack()}>
       <Avatar style={{ width: "60px", height: "60px", backgroundColor: "#e71d36" }}>
           <Home />
       </Avatar>
   </IconButton>
       <Typography
           align="center"
           color="textPrimary"
           variant="h5"

       >
           Order Not placed ! 
</Typography>



   </center>:
      <div>
        <center style={{marginTop:"8px"}}>
            <img className='shakeImage' src='/topi.svg' height='100px' alt='orderPlaced' />
            <Typography variant='body2'>
                Order placed
            </Typography>
        </center>
        <Grid container spacing={2}>
        <Grid item sm={6} xs={12}>
        <Card style={{marginTop: "16px",padding:"16px", borderRadius:"18px"}} >
        <Typography style={{ fontSize: "18px" }}>
               Order Detail
            </Typography>
            <Divider style={{ marginTop: "2px", marginBottom: "8px" }}/>
            <Card style={{padding:"8px", marginBottom:"8px"}} variant="outlined">
            <Grid container spacing={0}>
                
                <Grid item xs={6}>
                    <Typography style={{color: "#6c757d"}}>
                        Restaurant
                    </Typography>

                </Grid>
                <Grid item xs={6}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <Typography variant='body2' style={{transform:"translateY(20%)" }}>
                        {order.restaurant_name}
                </Typography>
                </div>

                </Grid>
               
            </Grid>
            </Card>
            <Card style={{padding:"8px", marginBottom:"8px"}} variant="outlined">
            <Grid container spacing={0}>
                <Grid item xs={6}>
                    <Typography style={{color: "#6c757d"}}>
                        Amount
                    </Typography>

                </Grid>
                <Grid item xs={6}>
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
                <Grid item xs={6}>
                    <Typography style={{color: "#6c757d"}}>
                        Payment type
                    </Typography>

                </Grid>
                <Grid item xs={6}>
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
                <Grid item xs={6}>
                    <Typography style={{color: "#6c757d"}}>
                        Payment status
                    </Typography>

                </Grid>
                <Grid item xs={6}>
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
                <Grid item xs={6}>
                    <Typography style={{color: "#6c757d"}}>
                        Order status
                    </Typography>

                </Grid>
                <Grid item xs={6}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <Typography variant='body2' style={{transform:"translateY(20%)" ,color: `${(order.order_status === 'Order Cancelled')?'#e63946':'black'}`}}>
                        {order.order_status}
                </Typography>
                </div>
                </Grid>

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
        </div>
        
       }
       </Container>
       
   </div>
   
    
    }
    </div>

       
    )
}
export default OrderCallback
