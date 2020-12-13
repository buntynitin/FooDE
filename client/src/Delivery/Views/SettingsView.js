import React, { useEffect, useState } from 'react'
import { Button, Divider, Dialog, Slide, Typography, Snackbar, SnackbarContent, Card, CardActionArea, Grid } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useStateValue } from '../StateProvider'
import { MapPin } from 'react-feather'
import axios from 'axios'
import Map from './Map'
import ReactPlaceholder from 'react-placeholder';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import InfoIcon from '@material-ui/icons/Info';
import NearBy from './NearBy'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
function SettingsView() {
    const [state, dispatch] = useStateValue()
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false)
    const [address, setAddress] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    const [saveLoading, setsaveLoading] = useState(false)
    const [message, setMessage] = useState('Something went wrong')

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        dispatch({
            type: "LOGOUT",
        })

    }
    const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen1(false);
    };

    const handleOpen = () => {
        setOpen(true);
    }

    useEffect(() => {
        axios.get('https://foodeopen.herokuapp.com/api/delivery/getUserdetail', {
            headers: {
                'auth-token': state.token
            }
        }).then((response) => {
            setAddress(response.data.address)
            setIsLoading(false)
        }).catch((error) => {
            setIsLoading(false)
            setHasError(true)
        })

    }, [])


    const handleAdd = () => {
        setsaveLoading(true)
        setMessage("Something went wrong")
        navigator.geolocation.getCurrentPosition(
            (position) => {

                axios.get(`https://foodeopen.herokuapp.com/api/delivery/geocode?lat=${position.coords.latitude}&long=${position.coords.longitude}`,
                )
                    .then(function (response) {

                        const addressobj = {
                            formatted_address: response.data.results[0].formatted_address,
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        }

                        axios.post('https://foodeopen.herokuapp.com/api/delivery/updateLocation', addressobj, {
                            headers: {
                                'auth-token': state.token
                            }
                        }).then((res) => {

                            setAddress({
                                hasaddress: true,
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                                formatted_address: response.data.results[0].formatted_address

                            })
                            setsaveLoading(false)
                        }).catch(() => {
                            setsaveLoading(false)
                            setOpen1(true)

                            // handleClose()
                        })


                    }).catch(function (error) {
                        setsaveLoading(false)
                        setOpen1(true)
                    })

            },
            (error) => {
                setMessage('Location access disabled')
                setsaveLoading(false)
                setOpen1(true)
            },
            { enableHighAccuracy: true },
        );

    }


    return (
        <div>


            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", marginTop: "16px" }}>
                <Button style={{borderRadius:"18px"}} variant='contained' color="primary" onClick={handleLogout}>
                    Logout&nbsp;<ExitToAppIcon size="16px" />
                </Button>
            </div>
            <Divider style={{ marginTop: "16px", marginBottom: "16px" }} />
            <Dialog
                TransitionComponent={Transition}
                style={{ background: "rgba(0,0,0,0.6)" }}
                fullWidth={true}
                maxWidth={'sm'}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >


                {/* <DialogContentText>
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText> */}
                <Map handleClose={handleClose} address={address} setAddress={setAddress} />


            </Dialog>

            <Snackbar

                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={open1}
                autoHideDuration={2000}
                onClose={handleClose1}

            >
                <SnackbarContent
                    style={{ background: "rgb(231,29,54)", borderRadius: "18px" }}
                    message={
                        <span style={{
                            display: "flex",
                            alignItems: "center"
                        }}>
                            <InfoIcon style={{ marginRight: "12px" }} />
                            {message}
                        </span>
                    }
                />

            </Snackbar>
            <div style={{ marginTop: "16px" }} />
            {
                isLoading ?
              
                             <ReactPlaceholder style={{ borderRadius: "18px", width: "100%", height: "70px" }} type="rect" ready={false} showLoadingAnimation={true} color='rgba(63,81,181,0.3)' />

             :

                    <div>
                        {
                            hasError ? <div>
                            <center style={{marginTop:"28vh"}}>
                        
                        <img  width='100px' height="65px" src="/cancel.svg" alt=""/>
                        <Typography  variant='h5'>
                             Somethong went wrong
                        </Typography>             
                        </center>
                        </div> :
                                <div>
                                    {
                                        address.hasaddress ?
                                            <div>
                                                {/* {address.formatted_address}
                             <button onClick={handleOpen} >Update Address</button> */}

                                                <CardActionArea onClick={handleOpen} style={{ borderRadius: "18px" }} >
                                                    <Card style={{ color: "gray", borderRadius: "18px" }} raised={true} >
                                                        <Grid container spacing={0}>
                                                        <Grid item xs={10} sm={11} style={{ padding: "16px" }}>
                                                                <Typography variant="body2" style={{ color: "#495057" }}>
                                                                    {address.formatted_address}

                                                                </Typography>


                                                            </Grid>
                                                            <Grid item xs={2} sm={1}>
                                                                <div style={{ width: "100%", background: "rgb(63,81,181)", height: "100%", display: "flex", alignItems: "center" }}>


                                                                    <MapPin style={{ marginLeft: "50%", transform: "translatex(-50%)" }} color="white" />

                                                                </div>

                                                            </Grid>
                                                            
                                                        </Grid>
                                                    </Card>
                                                </CardActionArea>
                                                <NearBy address={address} />
                                            </div> :
                                            <div>
                                                <center style={{ marginTop: "20vh" }}>

                                                    <img width='200px' height="130px" src="/map.svg" alt="loading" />
                                                    <Typography variant='h5'>
                                                        Add your Address to go
                         </Typography>
                                                    <br></br>
                                                    <Button variant='contained' color='primary'
                                                        style={{borderRadius:"18px"}}
                                                        disabled={saveLoading}
                                                        onClick={handleAdd}
                                                    >
                                                        Add Now&nbsp;<GpsFixedIcon style={{ fontSize: "18px" }} />
                                                    </Button>

                                                </center>
                                            </div>

                                    }

                                </div>
                        }

                    </div>
            }





        </div>
    )
}

export default SettingsView
