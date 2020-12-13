import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useStateValue } from '../StateProvider'
import { Card, Typography, Grid, IconButton, Avatar } from '@material-ui/core'
import Switch from '@material-ui/core/Switch';
import Request from './Request'
import ReactPlaceholder from 'react-placeholder';
import { ArrowRight } from 'react-feather'
import axios from 'axios'
function HomeView() {
    const history = useHistory()
    const [state, dispatch] = useStateValue()
    const [deliveryAgent, setDeliveryAgent] = useState({})
    const [isAccepting, setIsAccepting] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    const [toggleDisable, setToogleDisable] = useState(false)
    useEffect(() => {
        axios.get('https://foodeopen.herokuapp.com/api/delivery/getUserdetail', {
            headers: {
                'auth-token': state.token
            }
        }).then((response) => {
            setDeliveryAgent(response.data)
            setIsAccepting(response.data.isaccepting)
            setIsLoading(false)
        }).catch((error) => {
            setIsLoading(false)
            setHasError(true)
        })


    }, [])

    const handleChange = (e) => {
        setToogleDisable(true)
        axios.post(`https://foodeopen.herokuapp.com/api/delivery/updateAccepting?isaccepting=${e.target.checked}`, {}, {
            headers: {
                'auth-token': state.token
            }
        }).then(() => {
            setIsAccepting(!e.target.checked)
            setToogleDisable(false)
        }).catch(() => {
            setToogleDisable(false)
        })
    }

    return (
        <div>
            {
                isLoading ?<div style={{ marginTop: "16px" }} >
                         <Grid container>
                             <Grid item xs={12} sm={6}></Grid>
                                <Grid item xs={12} sm={6}>
                                 <ReactPlaceholder style={{ borderRadius: "18px", width: "100%", height: "100px"}} type="rect" ready={false} showLoadingAnimation={true} color='rgba(63,81,181,0.3)' />
                                 </Grid>
                             </Grid>
                         </div>
                      
                    : <div>
                        {
                            (hasError || !deliveryAgent.address) ? 
                            <center style={{ marginTop: "35vh" }}>

                                    <img width='150px' height="90px" src="/cancel.svg"/>
                                    <Typography variant='h5'>
                                        Somthing went wrong
                                     </Typography>

                                </center>
                                :
                                <div>
                                    {
                                        !(deliveryAgent.address.hasaddress) ?  <center style={{ marginTop: "40vh" }}>
                                    
                                        <Typography variant='h5'>
                                            Welcome to FooDE delivery
                                         </Typography>
                                        <br></br>
                                         
                                         <IconButton onClick={() => history.replace("/delivery/settings")}>
                                         <Avatar style={{background:"rgb(63,81,181)"}}>
                                             <ArrowRight style={{color:"white"}} />
                                             </Avatar>
                                         </IconButton>
                                         
                                    </center> :
                                            <div style={{ marginTop: "16px" }}>

                                                <Grid container>

                                                    <Grid item xs={12} sm={6}></Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <Card raised={true} style={{ padding: "16px", borderRadius: "18px" }}>
                                                            <center>
                                                                <Switch
                                                                    checked={isAccepting}
                                                                    onChange={handleChange}
                                                                    name="checkedA"
                                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                                    color="primary"
                                                                />
                                                                <Typography variant='subtitle1' style={{ color: `${isAccepting ? '#16db93' : '#e71d36'}` }}>
                                                                    {`You are  ${isAccepting ? '' : 'not'} accepting delivery requests`}
                                                                </Typography>
                                                            </center>
                                                        </Card>
                                                    </Grid>
                                                </Grid>

                                                <Request />
                                            </div>
                                    }
                                </div>
                        }
                    </div>
            }
        </div>
    )
}

export default HomeView
