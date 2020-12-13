import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, Grid, Typography, Popover } from '@material-ui/core'
import { Info } from 'react-feather'
import ReactPlaceholder from 'react-placeholder';
function NearBy({ address }) {
    const [restaurantList, setRestaurantList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    useEffect(() => {
        setIsLoading(true)
        axios.get(`https://foodeopen.herokuapp.com/api/restaurant/restaurantList?latitude=${address.latitude}&longitude=${address.longitude}`)
            .then(function (response) {
                setRestaurantList(response.data)
                setIsLoading(false)
            }).catch(function (error) {
                setIsLoading(false)
            })
    }, [address])

    return (
        <div>
            {
                isLoading ?  <div>
                <Typography variant="subtitle1" style={{ marginTop: "16px", color: "rgb(226,55,68)", marginBottom: "2px", marginLeft: "8px", fontSize: "22px" }}>
                                        Nearby Restaurants
                </Typography>
                <Grid container spacing={2}>
                     {[{},{},{},{},{},{}].map((placeHolder, index) =>
                         <Grid item xs={12} key={index} >
                             <ReactPlaceholder style={{ borderRadius: "18px", width: "100%", height: "63px" }} type="rect" ready={false} showLoadingAnimation={true} color='rgba(63,81,181,0.3)' />


                         </Grid>
                     )}
                 </Grid>
             </div> :
                    <div>
                        {
                            (restaurantList.length <= 0) ? <div>
                            <center style={{marginTop:"20vh"}}>
                        
                        <img  width='200px' height="130px" src="/norestaurant.svg" alt=""/>
                        <Typography  variant='h5'>
                             No nearby Restaurant
                        </Typography>          
                        <Typography  variant='caption'>
                             You won't be receiving delivery requests
                        </Typography>    
                        </center>
                        </div> :
                                <div>
                                    <Typography variant="subtitle1" style={{ marginTop: "16px", color: "rgb(226,55,68)", marginBottom: "2px", marginLeft: "8px", fontSize: "22px" }}>
                                        Nearby Restaurants&nbsp;&nbsp;<Info size="18px" style={{transform:"translateY(2px)"}} aria-describedby={id} onClick={handleClick} />
                            </Typography>
                                    <Popover
                                        id={id}
                                        open={open}
                                        anchorEl={anchorEl}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'center',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'center',
                                        }}
                                    >
                                        <div style={{background:"white",padding:"8px",color:"black"}}>
                                        <Typography variant='caption' >You will be getting delivery request from these restaurants</Typography>
                                             </div>
                                       
                                    </Popover>
                                    {/* <Typography variant="caption">
                                        You are getting delivery request from following restaurants
                            </Typography> */}
                                    {restaurantList.map((item, index) =>
                                        <Card style={{ borderRadius: "18px", marginBottom: "16px" }} key={index} >
                                            {/* <MapPin size="12px" style={{ color: "rgb(63,81,181)" }} />
&nbsp;
Home - {state.hasaddress?state.currentaddress.address.formatted_address:""} */}

                                            <Grid container spacing={0}>
                                                <Grid item xs={2} sm={1}>
                                                    <div style={{ width: "100%", background: "rgba(63,81,181,0.4)", height: "100%", display: "flex", alignItems: "center" }}>


                                                        <h3 style={{ color: "#495057", marginLeft: "50%", transform: "translatex(-50%)" }} color="white" >{index+1}</h3>

                                                    </div>

                                                </Grid>

                                                <Grid item xs={10} sm={11} style={{ padding: "8px" }}>
                                                    <Typography variant="body2" style={{ color: "#495057" }}>
                                                        {item.restaurantname}

                                                    </Typography>
                                                    <Typography variant="caption" style={{ color: "#6c757d" }}>
                                                        {item.address}, {item.city}, {item.state} - {item.zipcode}
                                                    </Typography>


                                                </Grid>

                                            </Grid>
                                        </Card>
                                    )}
                                </div>
                        }
                    </div>
            }
        </div>
    )
}

export default NearBy
