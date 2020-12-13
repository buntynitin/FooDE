import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from "react-router-dom";
import axios from 'axios'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Fab from '@material-ui/core/Fab';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Container from '@material-ui/core/Container'
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField'
import { v4 as uuidv4 } from 'uuid';
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button'
import { PhoneCall, Clock, Plus, Minus, X, Check, AlertCircle, Home, ShoppingBag, ShoppingCart } from 'react-feather'
import ReactPlaceholder from 'react-placeholder';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider'
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import { useStateValue as userState } from '../StateProvider';
import { useStateValue } from '../LocationStateProvider';
import SnackbarContent from '@material-ui/core/SnackbarContent'
import { Close } from '@material-ui/icons';
const placeHolders = [{}, {}, {}, {}, {}, {}, {}, {}, {},]
var order_id
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function Restaurant() {
    const location = useLocation()
    let history = useHistory()
    
    const [userinitialState] = userState()
    const [phone, setPhone] = useState('')
    const [phoneError, setPhoneError] = useState(false)
    const [state, dispatch] = useStateValue()
    // window.scrollTo(0, 0)
    const [open, setOpen] = useState(false)
    const [open1, setOpen1] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [open3, setOpen3] = useState(false)
    const [radiobutton, setRadiobutton] = useState('')
    const [restaurantdetail, setRestaurantdetail] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [paymentProcessing, setPaymentProcessing] = useState(false)
    const [hasError, setHasError] = useState(!(state.hasaddress ? true : false))
    const [basket, setBasket] = useState([])
    const [isShopOpened, setIsShopOpened] = useState(false)

    const [dialogopen, setDialogopen] = React.useState(false);

    const handledialogClickOpen = () => {
        setDialogopen(true);
        setOpen3(false)
    };

    const handledialogClose = () => {
        setDialogopen(false);
        setOpen3(true)
    };

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    //const [foodItems,setfoodItems] = useState([])
    useEffect(() => {
        if (!hasError) {
            order_id = uuidv4();
            axios.get(`https://foodeopen.herokuapp.com/api/restaurant/restaurantAlldetail?restaurant_id=${new URLSearchParams(location.search).get('id')}`)
                .then(function (response) {
                    if ( JSON.stringify(response.data) === '{}') {
                        setHasError(true)
                        return
                    }
                    setRestaurantdetail(response.data)
                    setIsLoading(false)
                    setIsShopOpened(!isOpened(response.data.openingtime, response.data.closingtime))
                }).catch(function (error) {
                    //setIsLoading(false)
                    setHasError(true)
                })
        }

    }, [location.search])

    const isOpened = (t1, t2) => {
        var hours = (new Date()).getHours().toString()
        if (hours.length === 1)
            hours = "0".concat(hours);
        var mins = (new Date()).getMinutes().toString()

        return ((`${hours}:${mins}` >= t1) && (`${hours}:${mins}` <= t2))
    }

    const itemExists = (_id) => {

        var result = false
        var i
        for (i = 0; i < basket.length; i++) {

            if (basket[i]._id === _id) {
                result = true
                break
            }
        }
        return result

    }


    const addtoBasket = (fooditem) => {
        setOpen3(true)
        fooditem["count"] = 1
        setBasket([...basket, fooditem])
        handleClick()

    }

    const getCount = (_id) => {

        var result
        var i
        for (i = 0; i < basket.length; i++) {

            if (basket[i]._id === _id) {
                result = basket[i].count
                break
            }
        }
        return result
    }

    const handleAdd = (_id) => {

        var i
        var newbasket = []
        for (i = 0; i < basket.length; i++) {
            newbasket = [...newbasket, basket[i]]

            if (basket[i]._id === _id) {
                newbasket[i].count += 1
            }
        }

        setBasket(newbasket)

    }

    const handleRemove = (_id) => {
        var i
        var newbasket = []

        for (i = 0; i < basket.length; i++) {



            if (basket[i].count === 1 && basket[i]._id === _id) {
                handleClick1()
                continue
            }

            newbasket = [...newbasket, basket[i]]
            if (basket[i]._id === _id) {
                newbasket[i].count -= 1
            }
        }

        setBasket(newbasket)

        if (basket.length === 1)
            setOpen3(false)


    }

    const getTotalamount = () => {
        var total = 0
        var i
        for (i = 0; i < basket.length; i++)
            total += basket[i].price * basket[i].count

        return total
    }

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleClick1 = () => {
        setOpen1(true);
    };

    const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen1(false);
    };

    const handleClick2 = () => {
        setOpen2(true);
    };

    const handleClose2 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen2(false);
    };

    const handleClick3 = () => {
        setOpen3(true);
    };

    const handleClose3 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen3(false);
    };



    return (
        <div>
            {hasError ?

                <center> <IconButton style={{ marginTop: "35vh", width: "60px", height: "60px", }} onClick={() => history.replace('home')}>
                    <Avatar style={{ width: "60px", height: "60px", backgroundColor: "#e71d36" }}>
                        <Home />
                    </Avatar>
                </IconButton>
                    <Typography
                        align="center"
                        color="textPrimary"
                        variant="h5"

                    >
                        Some Error occured
           </Typography>



                </center>
                :

                <div >
                    {isLoading ? <div style={{ maxHeight: "87vh", overflow: "hidden" }}> <ReactPlaceholder style={{ borderRadius: "18px", width: "100%", height: "240px" }} type="rect" ready={false} showLoadingAnimation={true} color='rgba(63,81,181,0.3)' />
                        <div style={{ marginTop: "24px" }} />


                        <Grid container spacing={3}>
                            {placeHolders.map((placeHolder, index) =>
                                <Grid item xs={12} md={4} sm={6} key={index} >
                                    <ReactPlaceholder style={{ borderRadius: "18px", width: "100%", height: "100px" }} type="rect" ready={false} showLoadingAnimation={true} color='rgba(63,81,181,0.3)' />


                                </Grid>
                            )}
                        </Grid>
                    </div>




                        :
                        <div style={{ marginBottom: "60px" }}>







                            <Card style={{ width: "100%", height: "240px", background: restaurantdetail.image ? `url(${restaurantdetail.image})` : "url(https://res.cloudinary.com/dez3yjolk/image/upload/v1606580112/fooditems/FoodAndDrinkDesign_1_yjvvep.svg)", backgroundRepeat: "no-repeat", backgroundSize: "cover", borderRadius: "18px" }}>
                                <div style={{ height: "100%", width: "100%", background: "rgba(255,255,255,0.9)" }}>
                                    <div style={{ position: "absolute", marginTop: "240px", paddingLeft: "16px", paddingBottom: "12px", transform: "translateY(-100%)" }}>
                                        <Typography variant="h4">
                                            {restaurantdetail.restaurantname}
                                        </Typography>
                                        <div style={{ flexDirection: "row", display: "flex" }}>
                                            {
                                                restaurantdetail.tags.map((tag, index) =>
                                                    <div key={tag.key}>
                                                        {
                                                            (index + 1 === restaurantdetail.tags.length) ? <Typography variant="body2">{tag.label}</Typography> :
                                                                <Typography variant="body2">{tag.label + ' |'}&nbsp;</Typography>

                                                        }



                                                    </div>
                                                )
                                            }
                                        </div>
                                        <Typography>
                                            <Clock size="13px" style={{ transform: "translateY(1px)", color: "green" }} />&nbsp;{restaurantdetail.openingtime}&nbsp;&nbsp;-&nbsp;&nbsp;<Clock style={{ transform: "translateY(1px)", color: "red" }} size="13px" />&nbsp;{restaurantdetail.closingtime}
                                        </Typography>
                                        <Typography variant="h6">
                                            <PhoneCall size="16px" style={{ color: "green" }} />&nbsp;<a style={{ textDecoration: "none", color: "rgb(63,81,181)" }} href={`tel:${restaurantdetail.mobile}`}>{restaurantdetail.mobile}</a>
                                        </Typography>
                                        <Typography variant="caption">
                                            {restaurantdetail.address}, {restaurantdetail.city}, {restaurantdetail.state} - {restaurantdetail.zipcode}
                                        </Typography>
                                    </div>

                                </div>

                            </Card>
                            <div style={{ marginTop: "24px", borderRadius: "18px" }} />
                            <Card style={{ borderRadius: "18px" }}>
                                <Grid container spacing={0}>
                                    <Grid item xs={2} sm={1}>
                                        <div style={{ width: "100%", height: "100%", background: "#16db93", display: "flex", alignItems: "center" }}>


                                            <Check style={{ marginLeft: "50%", transform: "translatex(-50%)" }} color="white" />

                                        </div>

                                    </Grid>
                                    <Grid item xs={10} sm={11} style={{ padding: "8px" }}>
                                        <Typography variant="body2" style={{ color: "#495057" }}>
                                            Delivering to - {state.currentaddress.address.formatted_address}

                                        </Typography>


                                    </Grid>
                                </Grid>

                            </Card>

                            <div style={{ marginTop: "24px" }} />
                            <Grid container spacing={3}>
                                {restaurantdetail.catalog.map((fooditem, index) =>


                                    <Grid item xs={12} md={4} sm={6} key={index}  >
                                        <Card className="hoverCard" style={{ borderRadius: "18px" }}>
                                            <div style={{ height: "100px" }}>
                                                <Grid container spacing={1}>

                                                    <Grid xs={3} item>

                                                        <img alt="" draggable={false} style={{ width: "100%", height: "100px", objectFit: fooditem.image ? "" : "cover" }} src={fooditem.image ? fooditem.image : "https://res.cloudinary.com/dez3yjolk/image/upload/v1606580112/fooditems/FoodAndDrinkDesign_1_yjvvep.svg"} />
                                                        <img alt="" draggable={false} style={{ position: "absolute", padding: "4px", width: "21px", heigth: "21px", transform: "translateX(-100%)" }} src={fooditem.isnonveg ? "/nveg.svg" : "/veg.svg"} />

                                                    </Grid>
                                                    <Grid xs={5} item style={{ paddingTop: "12px" }}>

                                                        <Typography variant="body1" style={{ color: "#343a40" }}>
                                                            {fooditem.name}
                                                        </Typography>
                                                        <Typography variant="button" style={{ color: "#495057" }} >
                                                            ₹ {fooditem.price}
                                                        </Typography>

                                                    </Grid>
                                                    <Grid xs={4} item style={{ paddingTop: "10px" }}>


                                                        {
                                                            itemExists(fooditem._id) ?
                                                                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                                                                    <Avatar style={{ margin: "0px 8px 8px 8px", width: "28px", height: "28px", backgroundColor: "#16db93" }}>
                                                                        <IconButton onClick={() => handleAdd(fooditem._id)}>
                                                                            <Plus color="white" />
                                                                        </IconButton>
                                                                    </Avatar>
                                                                    <div style={{ width: "100%", height: "100%" }}>

                                                                        <center><div style={{ transform: "translate(33%,-3px)", color: "#495057" }}><strong>{getCount(fooditem._id)}</strong></div></center>
                                                                    </div>
                                                                    <Avatar style={{ margin: "0px 8px 8px 8px", width: "28px", height: "28px", backgroundColor: "#e71d36" }}>
                                                                        <IconButton onClick={() => handleRemove(fooditem._id)}>
                                                                            {getCount(fooditem._id) === 1 ? <X color="white" /> : <Minus color="white" />}

                                                                        </IconButton>
                                                                    </Avatar>

                                                                </div> :
                                                                <center>
                                                                    <Button
                                                                        style={{ borderRadius: "18px", marginTop: "41px", transform: "translateY(-50%)", background: isShopOpened ? "gray" : "#16db93", color: "white" }}
                                                                        variant="contained"
                                                                        size="small"
                                                                        onClick={() => isShopOpened ? handleClick2() : addtoBasket(fooditem)}>
                                                                        <Plus size="14px" />&nbsp;Add
                                                                </Button>
                                                                </center>
                                                        }




                                                    </Grid>


                                                </Grid>
                                            </div>


                                        </Card>
                                    </Grid>

                                )
                                }
                            </Grid>

                        </div>

                    }
                </div>
            }
            <Snackbar

                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                autoHideDuration={1500}
                onClose={handleClose}

            >
                <SnackbarContent
                    style={{ background: "rgba(22,219,147,0.9)", borderRadius: "18px", transform: "translateY(100%)" }}
                    message={
                        <span style={{
                            display: "flex",
                            alignItems: "center"
                        }}>
                            <Check style={{ marginRight: "12px" }} />
                            {"Food item Added"}
                        </span>
                    }
                />

            </Snackbar>
            <Snackbar

                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open1}
                autoHideDuration={1500}
                onClose={handleClose1}

            >
                <SnackbarContent
                    style={{ background: "rgba(231,29,54,0.8)", borderRadius: "18px", transform: "translateY(100%)" }}
                    message={
                        <span style={{
                            display: "flex",
                            alignItems: "center"
                        }}>
                            <X style={{ marginRight: "12px" }} />
                            {"Food item Removed"}
                        </span>
                    }
                />

            </Snackbar>
            <Snackbar

                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open2}
                autoHideDuration={1500}
                onClose={handleClose2}

            >
                <SnackbarContent
                    style={{ background: "rgba(128,128,128,0.8)", borderRadius: "18px", transform: "translateY(100%)" }}
                    message={
                        <span style={{
                            display: "flex",
                            alignItems: "center"
                        }}>
                            <AlertCircle style={{ marginRight: "12px" }} />
                            {"Restaurant is closed"}
                        </span>
                    }
                />

            </Snackbar>
            <Snackbar


                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={open3}
                onClose={handleClose3}

            >

                <Fab onClick={() => handledialogClickOpen()} color="primary" variant="extended" aria-label="add">
                    <ShoppingCart />&nbsp;
       Order
      </Fab>
            </Snackbar>


            <Dialog fullScreen open={dialogopen} onClose={handledialogClose} TransitionComponent={Transition}>
                <AppBar style={{ position: "relative" }}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handledialogClose} aria-label="close">
                            <Close />
                        </IconButton>
                        <Typography variant="h6">
                            Checkout
            </Typography>
                    </Toolbar>
                </AppBar>

                <Container>
                <div style={{ paddingTop: "16px" }}>
                    <Typography
                        variant="h5"
                    >
                        Order Summary
        </Typography>
                    <Typography style={{ marginTop: "16px", fontSize: "18px" }} >
                        {restaurantdetail.restaurantname}
                    </Typography>
                    <Typography variant="caption" style={{ color: "#6c757d" }}>
                        {restaurantdetail.address}, {restaurantdetail.city}, {restaurantdetail.state} - {restaurantdetail.zipcode}
                    </Typography>
                    <Divider style={{ marginTop: "8px" }} />
                    <Grid container spacing={2}>
                        <Grid item md={8} sm={6} xs={12}>
                            <Typography style={{ marginTop: "16px", fontSize: "18px" }}>
                                Your Order
                            </Typography>

                            <Divider style={{ marginTop: "2px", marginBottom: "8px" }} />

                            {basket.map((item, index) =>
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
                                            <strong>₹{(getTotalamount() * 0.1 + getTotalamount() + getTotalamount() * 0.05).toFixed(2)}</strong>
                                        </Typography>

                                    </div>

                                </Grid>


                            </Grid>

                        </Grid>

                        <Grid item md={4} sm={6} xs={12}>
                            <Card style={{ background: "#f7f7ff", borderRadius: "18px", marginTop: "16px", padding: "16px" }}>
                                <Typography style={{ fontSize: "18px" }}>
                                    Select a payment method
                            </Typography>

                                <Divider style={{ marginTop: "2px", marginBottom: "8px" }} />
                                <Typography variant="subtitle1" style={{ color: "#343a40" }}>
                                    Delivering to - <strong>{userinitialState.name}</strong>
                                </Typography>
                                <Typography style={{ color: "#495057" }} variant="caption">

                                   {state.hasaddress? state.currentaddress.address.formatted_address : ""}


                                </Typography>


                                <form style={{ marginTop: "12px" }} autoComplete="off" onSubmit={(e) => {
                                    if (radiobutton === 'prepaid') {
                                        setPaymentProcessing(true)
                                        window.open('about:blank', 'Popup_Window', `width=${window.screen.availWidth},height=${window.screen.availHeight}`)
                                       
                                    }
                                    else (e.preventDefault())

                                }} target="Popup_Window" action="https://foodeopen.herokuapp.com/api/order" method="post">



                                    <TextField
                                        required
                                        size="small"
                                        fullWidth
                                        label="Mobile"
                                        name="phone"
                                        variant="outlined"
                                        type="Number"
                                        error={phoneError}
                                        value={phone}
                                        onChange={(e) => {
                                            setPhone(e.target.value)
                                            if (e.target.value.length !== 10 && e.target.value.length !== 0)
                                                setPhoneError(true)
                                            else setPhoneError(false)
                                        }}
                                        InputProps={

                                            {
                                                max: 9999999999,
                                                min: 1000000000,
                                                step: 1,
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <img src="/flag.svg" style={{ borderRadius: "4px" }} width="20px" height="15px" />&nbsp; {"+91"}
                                                    </InputAdornment>

                                                ),
                                            }}
                                    />

                                    <input hidden name="name" defaultValue={userinitialState.name.replace(/\s/g, '')} />
                                    <input hidden name="email" defaultValue={userinitialState.email} />
                                    <input hidden name="amount" defaultValue={(getTotalamount() * 0.1 + getTotalamount() + getTotalamount() * 0.05).toFixed(2)} />
                                    <input hidden name="orderobject" defaultValue={JSON.stringify(
                                        {
                                            restaurant_id : (new URLSearchParams(location.search).get('id')),
                                            restaurant_name : restaurantdetail.restaurantname,
                                            user_name : userinitialState.name,
                                            user_id : userinitialState._id,
                                            order_id,
                                            total_amount : (getTotalamount() * 0.1 + getTotalamount() + getTotalamount() * 0.05).toFixed(2),
                                            payment_type : 'PREPAID',
                                            address: state.currentaddress,
                                            payment_status : 'Payment initiated',
                                            order_status : 'Order Processing',
                                            basket,
                                        }

                                    )}
                                    
                                    />



                                    <FormLabel style={{ marginTop: "12px" }} component="legend">Payment options</FormLabel>


                                    <RadioGroup required value={radiobutton} onChange={(e) => setRadiobutton(e.target.value)} >
                                        <Grid container spacing={3}>
                                            <Grid item xs={5}>
                                                <FormControlLabel value="prepaid" control={<Radio />} label="Prepaid" />
                                            </Grid>
                                            <Grid item xs={7}>
                                                <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />

                                            </Grid>

                                        </Grid>


                                    </RadioGroup>
                                    <center style={{ marginTop: "12px" }}><Button onClick={async () => {
                                        if (phone.length === 10 && radiobutton) {
                                            
                                            if (radiobutton === 'cod') {
                                                setPaymentProcessing(true)
                                                const formdata ={
                                                    restaurant_id : (new URLSearchParams(location.search).get('id')),
                                                    restaurant_name : restaurantdetail.restaurantname,
                                                    user_name : userinitialState.name,
                                                    user_id : userinitialState._id,
                                                    order_id,
                                                    total_amount : (getTotalamount() * 0.1 + getTotalamount() + getTotalamount() * 0.05).toFixed(2),
                                                    phone:phone,
                                                    payment_type : 'COD',
                                                    address: state.currentaddress,
                                                    basket,
                                                    order_status : 'Order Processing'
                                                }
                                                axios.post('https://foodeopen.herokuapp.com/api/order/addOrder', formdata, {
                                                    headers: {
                                                        'auth-token': userinitialState.token
                                                    }
                                                }).then(function (response) {
                                                   
                                                    setPaymentProcessing(false)
                                                    history.replace(`/user/ordercallback?order_id=${order_id}`)   
                                                }).catch(function (err) {
                                                 
                                                    setPaymentProcessing(false)
                                                    history.replace(`/user/ordercallback?order_id=${order_id}`)
                                                    
                                                })

                                                return
                                            }
                                            
                                            await sleep(5000)
                                            history.replace(`/user/ordercallback?order_id=${order_id}`)
                                        }
                                    }

                                    } disabled={(phoneError || (phone.length === 10 && !radiobutton)) || paymentProcessing } type="submit" color="primary" variant="contained">Proceed</Button></center>
                                    <center>{!paymentProcessing?<div />:<img style={{height:"60px"}} src="/loading.svg" /> }</center>
                                </form>
                            </Card>


                        </Grid>
                    </Grid>



                </div>
                </Container>
            </Dialog>

        
        </div>
    )
}
