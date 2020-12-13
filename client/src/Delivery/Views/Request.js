import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Typography, Card, Grid, Fab, Slide, Dialog,LinearProgress } from '@material-ui/core'
import { useStateValue } from '../StateProvider'
import { Clock, Maximize, Minus } from 'react-feather'
import QrReader from 'react-qr-reader'
import Alert from '@material-ui/lab/Alert';
import ReactPlaceholder from 'react-placeholder';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Request() {
    const history = useHistory()
    const [scanning, setScanning] = useState(false)
    const [deviceError, setDeviceError] = useState(false)
    const [connectionError, setConnectionError] = useState(false)
    const [requestList, setRequestList] = useState([])
    const [state, dispatch] = useStateValue()
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios.get('https://foodeopen.herokuapp.com/api/delivery/getRequest', {
            headers: {
                'auth-token': state.token
            }
        }).then((response) => {
            setRequestList(response.data)
            setIsLoading(false)
        }).catch((error) => {
            setIsLoading(false)
        })
    })

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setDeviceError(false)
        setConnectionError(false)
        setOpen(false);
    };

    const handleScan = (data) => {
       
        if(data){

            setDeviceError(false)
            setConnectionError(false)
            setScanning(true)

            if(data.length === 36)
            {
                axios.post('https://foodeopen.herokuapp.com/api/delivery/handTodelivery',{order_id:data},{
                    headers:{
                        'auth-token': state.token
                    }
                }).then((res)=>{
                    setScanning(false)
                    history.push(`/delivery/orderdetail?order_id=${data}`)
                    
                }).catch((err)=>{
                    setConnectionError(true)
                    setScanning(false)
                })

            }
        }
            
    }
    const handleError = err => {
        setDeviceError(true)
    }

  

    return (
        <div>

            {
                isLoading ? <div>
                       <Typography variant="subtitle1" style={{ marginTop: "16px", color: "rgb(226,55,68)", marginLeft: "8px", fontSize: "22px" }}>
                                        Requests
                            </Typography>


                    
                         {[{},{},{}].map((placeHolder, index) =>
                             
                                 <ReactPlaceholder key={index} style={{ width: "100%", height: "100px", borderRadius:"18px",marginBottom:"16px" }} type="rect" ready={false} showLoadingAnimation={true}  color='rgba(63,81,181,0.3)'/>


                           
                         )}
                     
               
                </div> :
                    <div>
                        {
                            (requestList.length <= 0) ?
                            <center style={{ marginTop: "30vh" }}>

                            <img width='150px' height="90px" src="/request.svg"/>
                            <Typography variant='h5'>
                                No delivery requests
                             </Typography>

                        </center> :
                                <div>
                                    <Typography variant="subtitle1" style={{ marginTop: "16px", color: "rgb(226,55,68)", marginLeft: "8px", fontSize: "22px" }}>
                                        Requests
                            </Typography>
                                    {
                                        requestList.map((item, index) =>
                                            <Card style={{ borderRadius: "18px", marginBottom: "16px" }}>
                                                <Grid container>
                                                    <Grid item xs={2} sm={1}>
                                                        <div style={{ width: "100%", background: "rgba(63,81,181,0.4)", height: "100%", display: "flex", alignItems: "center", borderBottomRightRadius: "18px" }}>


                                                            <h3 style={{ color: "#495057", marginLeft: "50%", transform: "translatex(-50%)" }} color="white" >{index + 1}</h3>

                                                        </div>

                                                    </Grid>

                                                    <Grid item xs={10} sm={11} style={{ padding: "8px" }}>
                                                        <Typography variant="body2" style={{ color: "#495057" }}>
                                                            {item.restaurant_name}

                                                        </Typography>
                                                        <Typography variant='caption' style={{ color: "gray" }}>
                                                            {item.address}
                                                        </Typography>

                                                    </Grid>
                                                </Grid>
                                                <div style={{ padding: "8px" }}>
                                                    <center>
                                                        <Typography style={{ color: "rgb(63,81,181)" }}>
                                                            <Clock style={{ transform: "translateY(2px)" }} size="16px" />&nbsp;
                                                    {(new Date(parseInt(item._id.substring(0, 8), 16) * 1000)).toLocaleTimeString()}&nbsp;,&nbsp;
                                                    {(new Date(parseInt(item._id.substring(0, 8), 16) * 1000)).toDateString()}
                                                        </Typography>
                                                    </center>
                                                </div>




                                            </Card>
                                        )
                                    }
                                    <Fab onClick={handleOpen} style={{ position: "fixed", bottom: "16px", right: "16px" }} color="primary">

                                        <Maximize size="32px" />
                                        <Minus style={{ position: "absolute" }} />

                                    </Fab>

                                    <Dialog
                                        TransitionComponent={Transition}
                                        style={{ background: "rgba(0,0,0,0.6)" }}
                                        fullWidth={true}
                                        maxWidth={'sm'}
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="responsive-dialog-title"
                                    >
                                        <div style={{padding:"12px"}}>
                                            <Typography style={{color:"rgb(63,81,181)"}}>
                                                Scan the QR code to connect to order
                                            </Typography>     
                                        </div>
                                        <LinearProgress hidden={!scanning} />
                                        <QrReader
                                            delay={300}
                                            onError={handleError}
                                            onScan={handleScan}
                                            style={{ width: '100%' }}
                                        />
                                        {deviceError && <Alert severity="error">No Camera found</Alert>}

                                        {connectionError && <Alert severity="warning">Something went wrong</Alert>}
                                    </Dialog>


                                </div>


                        }
                    </div>
            }
        </div>
    )
}

export default Request
