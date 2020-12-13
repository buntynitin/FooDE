import React, { useEffect, useState } from 'react'
import { useStateValue } from '../StateProvider';
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { Clock } from 'react-feather'
import { Grid, Card, Box, CardActionArea, Typography, Divider } from '@material-ui/core'
import ReactPlaceholder from 'react-placeholder';
function OrderView() {
    const history = useHistory()
    const [state, dispatch] = useStateValue();
    const [orderList, setOrderList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        axios.get('https://foodeopen.herokuapp.com/api/delivery/getDeliveryorders', {
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
    }, [])



    return (
        <div>
            {
                isLoading ?
                    <Box>
                        <Typography variant="h5" style={{ color: "rgb(63,81,181)", marginTop: "18px", marginLeft: "8px", marginBottom: "8px" }}>
                            Orders
                    </Typography>

                        
                            <Grid container spacing={3}>
                                {[{}, {}, {}, {}, {}, {}].map((placeHolder, index) =>
                                    <Grid item xs={12} md={4} sm={6} key={index} >
                                        <ReactPlaceholder style={{ width: "100%", borderRadius: "18px", height: "100px" }} type="rect" ready={false} showLoadingAnimation={true} color='rgba(63,81,181,0.3)' />


                                    </Grid>
                                )}
                            </Grid>
                   
                    </Box>
                    :
                    <div>
                        {
                            (hasError || (orderList.length <= 0)) ? <div>
                                <center style={{ marginTop: "35vh" }}>

                                    <img width='200px' height="130px" src="/order.svg" alt="loading" />
                                    <Typography variant='h5'>
                                        No orders to show
                                     </Typography>

                                </center>
                            </div> :
                                <Box>
                                    <Typography variant="h5" style={{ color: "rgb(63,81,181)", marginTop: "18px", marginLeft: "8px", marginBottom: "8px" }}>
                                        Orders
                                    </Typography>

                                    <Grid container spacing={3}>
                                        {orderList.map((item, index) =>
                                            <Grid item md={4} sm={6} xs={12} key={index}>
                                                <CardActionArea style={{borderRadius:"18px"}} onClick={() => history.push(`orderdetail?order_id=${item.order_id}`)} className="hoverCard" >
                                                    <Card style={{ padding: "12px", borderRadius:"18px" }}>

                                                        <center>
                                                            <Typography style={{ color: "#6c757d" }}>
                                                                🔖&nbsp;Order ID
                                                            </Typography>



                                                            <Typography variant='caption' style={{ transform: "translateY(20%)" }}>
                                                                {item.order_id}
                                                            </Typography>
                                                        </center>


                                                        <Divider style={{ marginTop: "8px" }} />
                                                        <center>
                                                        <Typography style={{ color: "rgb(63,81,181)" }}>
                                                            <Clock style={{ transform: "translateY(2px)" }} size="16px" />&nbsp;
                                                    {(new Date(parseInt(item._id.substring(0, 8), 16) * 1000)).toLocaleTimeString()}&nbsp;,&nbsp;
                                                     {(new Date(parseInt(item._id.substring(0, 8), 16) * 1000)).toDateString()}
                                                        </Typography>
                                                        </center>



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

export default OrderView

