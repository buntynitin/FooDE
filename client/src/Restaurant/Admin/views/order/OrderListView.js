import React,{useEffect, useState} from 'react'
import { useStateValue } from '../../../StateProvider';
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import { Grid,Card,Box, CardActionArea,Typography, Divider } from '@material-ui/core'
import ReactPlaceholder from 'react-placeholder';
function OrderListView() {
    const history = useHistory()
    const [state, dispatch] = useStateValue();
    const [orderList, setOrderList] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const [hasError,setHasError] = useState(false)

    useEffect(() => {
    axios.get('https://foodeopen.herokuapp.com/api/order/getRestaurantorder', {
      headers: {
        'auth-token': state.token
      }
    }).then(function (response) {
        setOrderList((response.data).reverse())
        setHasError(false)
        setIsLoading(false)
      
    }).catch(function (err) {
        setHasError(true)
        setIsLoading(false)

  })
})



    return (
        <div>
        {
        isLoading?
        <Box m={3}>
         {/* <center><img style={{marginTop:"35vh"}} width='200px' height="130px" src="/loading.svg" alt="loading"/>
        <Typography style={{transform:"translateY(-40px)"}}>
            Getting your Orders ..
        </Typography>
        </center> */}
        
        <Typography variant="h3" style={{color:"rgb(63,81,181)", marginTop:"18px", marginLeft:"8px", marginBottom:"8px"}}>
                        Your Orders
                    </Typography>

                 <div style={{height:"82vh", borderRadius:"4px", overflow:"hidden"}}>
                    <Grid container spacing={3}>
                         {[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}].map((placeHolder, index) =>
                             <Grid item xs={12} md={4} sm={6} key={index} >
                                 <ReactPlaceholder style={{ width: "100%",borderRadius:"4px", height: "148px" }} type="rect" ready={false} showLoadingAnimation={true} />


                             </Grid>
                         )}
                     </Grid>
                 </div>
        </Box>
        :
        <div>
            {
                (hasError || (orderList.length <= 0))? <div>
                    <center style={{marginTop:"30vh"}}>
                
                <img  width='200px' height="130px" src="/order.svg" alt="loading"/>
                <Typography  variant='h5'>
                     No orders to show
                </Typography>
               
                </center>
                </div>:
                <Box m={3}>
                    <Typography variant="h3" style={{color:"rgb(63,81,181)", marginTop:"18px", marginLeft:"8px", marginBottom:"8px"}}>
                        Your Orders
                    </Typography>
                 
            <Grid container spacing={3}>
                {orderList.map((item,index)=>
                <Grid item md={4} sm={6} xs={12} key={index}>
                     <CardActionArea onClick={() => history.push(`orderdetail?order_id=${item.order_id}`) } className="hoverCard" >
                    <Card style={{padding:"12px"}}>
                   
                 <center>
                 <Typography style={{color: "#6c757d"}}>
                     🔖&nbsp;Order ID
                 </Typography>

            

         <Typography variant='caption' style={{transform:"translateY(20%)" }}>
                     {item.order_id}
             </Typography>
             </center>
        
      <Divider style={{marginTop:"8px"}} />
         <Grid container spacing={0}>
             
             <Grid item xs={6}>
                 <Typography style={{color: "#6c757d"}}>
                     📦&nbsp;Status
                 </Typography>

             </Grid>
             <Grid item xs={6}>
             <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
             <Typography variant='body2' style={{transform:"translateY(20%)",color:`${(item.order_status === 'Order Cancelled')? '#e63946':'black'}` }}>
                     {item.order_status}
             </Typography>
             </div>

             </Grid>
            
         </Grid>

         <Grid container spacing={0}>
             
             <Grid item xs={6}>
                 <Typography style={{color: "#6c757d"}}>
                 📅&nbsp;Date
                 </Typography>

             </Grid>
             <Grid item xs={6}>
             <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
             <Typography variant='body2' style={{transform:"translateY(20%)" }}>
             {(new Date(item.time)).toDateString()}
             </Typography>
             </div>

             </Grid>
            
         </Grid>

         <Grid container spacing={0}>
             
             <Grid item xs={6}>
                 <Typography style={{color: "#6c757d"}}>
                     🕝&nbsp;Time
                 </Typography>

             </Grid>
             <Grid item xs={6}>
             <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
             <Typography variant='body2' style={{transform:"translateY(20%)" }}>
             {(new Date(item.time)).toLocaleTimeString()}
             </Typography>
             </div>

             </Grid>
            
         </Grid>
         
                    </Card>
                    </CardActionArea>
                    </Grid>
                )
                
                }
                

                </Grid>
                </Box>

          
            }
            
            
        </div>
        }
     </div>
    )
}

export default OrderListView
