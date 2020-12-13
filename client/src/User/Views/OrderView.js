import React, {useEffect,useState} from 'react'
import { useStateValue } from '../StateProvider'
import {Grid,Card, CardActionArea, Typography, Button} from '@material-ui/core'
import axios from 'axios'
import ReactPlaceholder from 'react-placeholder';
import { useHistory } from 'react-router-dom'
export default function OrderView() {
    const [state] = useStateValue()
    const [orderList,setOrderList] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const [hasError,setHasError] = useState(false)
    const history = useHistory()
    useEffect(() => {
        axios.get('https://foodeopen.herokuapp.com/api/order/getOrderbyuserid',{
            headers: {
                'auth-token': state.token
            }
        }
        
        ).then(function (response){
            setIsLoading(false)
            setHasError(false)
            setOrderList(response.data)

        }).catch(function(error){
            setIsLoading(false)
            setHasError(true)
            

        })
        
    })
    return (
        <div>
           {
           isLoading?
           <div>
            {/* <center><img style={{marginTop:"35vh"}} width='200px' height="130px" src="/loading.svg" alt="loading"/>
           <Typography style={{transform:"translateY(-40px)"}}>
               Getting your Orders ..
           </Typography>
           </center> */}
           <Typography variant="h5" style={{color:"rgb(63,81,181)", marginTop:"18px", marginLeft:"8px", marginBottom:"8px"}}>
                           Your Orders
                       </Typography>

                    <div style={{height:"82vh", borderRadius:"18px", overflow:"hidden"}}>
                       <Grid container spacing={3}>
                            {[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}].map((placeHolder, index) =>
                                <Grid item xs={12} md={4} sm={6} key={index} >
                                    <ReactPlaceholder style={{ borderRadius: "18px", width: "100%", height: "100px" }} type="rect" ready={false} showLoadingAnimation={true} color='rgba(63,81,181,0.3)' />


                                </Grid>
                            )}
                        </Grid>
                    </div>
           </div>
           :
           <div>
               {
                   hasError? <div>
                       <center style={{marginTop:"30vh"}}>
                   
                   <img  width='200px' height="130px" src="/order.svg" alt="loading"/>
                   <Typography  variant='h5'>
                        No orders to show
                   </Typography>
                   <br></br>
                   <Button variant='outlined' color='primary' onClick={()=> history.replace('home') }>
                       Order Now
                   </Button>
                   
                   </center>
                   </div>:
                   <div>
                       <Typography variant="h5" style={{color:"rgb(63,81,181)", marginTop:"18px", marginLeft:"8px", marginBottom:"8px"}}>
                           Your Orders
                       </Typography>
                    
               <Grid container spacing={3}>
                   {orderList.map((item,index)=>
                   <Grid item md={4} sm={6} xs={12}>
                        <CardActionArea onClick={() => history.push(`orderdetail?order_id=${item.order_id}`)} style={{borderRadius:"18px"}} className="hoverCard" >
                       <Card style={{borderRadius:"18px", height:"100px", padding:"16px"}}>
                      
                       <Grid container spacing={0}>
                
                <Grid item xs={6}>
                    <Typography style={{color: "#6c757d"}}>
                        🍽&nbsp;Restaurant
                    </Typography>

                </Grid>
                <Grid item xs={6}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <Typography variant='body2' style={{transform:"translateY(20%)" }}>
                        {item.restaurant_name}
                </Typography>
                </div>

                </Grid>
               
            </Grid>

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
                    📅&nbsp;Ordered on
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
            
                       </Card>
                       </CardActionArea>
                       </Grid>
                   )
                   
                   }
                   

                   </Grid>
                   </div>

             
               }
               
               
           </div>
           }
        </div>
    )
}
