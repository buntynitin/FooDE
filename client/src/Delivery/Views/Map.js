import React from 'react';
import ReactMapGL, { Marker, ScaleControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography' 
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import InfoIcon from '@material-ui/icons/Info';
import GpsFixedIcon from '@material-ui/icons/GpsFixed'
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import axios from 'axios'
import Button from '@material-ui/core/Button'
import PersonPinIcon from '@material-ui/icons/PersonPin';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { useStateValue } from '../StateProvider'



function Map({handleClose,address, setAddress}) {
  const [savedisabled,setsavedisabled] = React.useState(false)
  const [open1, setOpen1] = React.useState(false)
  const [message,setMessage] = React.useState('Something went wrong')
  const [state,dispatch] = useStateValue()
  const [isloading,setIsloading] = React.useState(false)
  const [add, setAdd] =  React.useState(address)
  const [newadd, setNewadd] = React.useState(address)
  const [restaurantList, setRestaurantList] = React.useState([])
  const [theme,setTheme] = React.useState('streets-v11')
  const [viewport, setViewport] = React.useState({
    width: '100%',
    height: '70vh',
    latitude: newadd.latitude,
    longitude: newadd.longitude,
    zoom: 13
  });

  const handleClose1 = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setOpen1(false);
};

  React.useEffect(() => {
    axios.get('https://foodeopen.herokuapp.com/api/restaurant/allrestaurantList')
        .then(function (response) {
            setRestaurantList(response.data)
        }).catch(function (error) {
        })
},[])


const chageTheme = () =>{
  (theme === 'streets-v11') ?
  setTheme('dark-v10'):
  setTheme('streets-v11')
}



  const hadleRecenter = () => {

    setViewport({
      width: '100%',
      height: '70vh',
      latitude: add.latitude,
      longitude: add.longitude,
      zoom: 13
    })
    setNewadd(add)

    // setNewlat(props.latitude)
    // setNewlong(props.longitude)
    // setNewadd(props.address)
  }

  const getcurrentAddress = () => {
    setIsloading(true)
    axios.get(`https://foodeopen.herokuapp.com/api/delivery/geocode?lat=${viewport.latitude}&long=${viewport.longitude}`,
    )
      .then(function (response) {
        setNewadd({
            hasaddress: true,
            formatted_address : response.data.results[0].formatted_address,
            latitude: viewport.latitude,
            longitude: viewport.longitude
        })
        setIsloading(false)

      }).catch(function (error) {
        setMessage("Something went wrong")
        setOpen1(true)
        setIsloading(false)
      })





  }

  const saveAddress = () => {

    const addressobj = {
      formatted_address : newadd.formatted_address,
      latitude : newadd.latitude,
      longitude : newadd.longitude
    }
    setsavedisabled(true)
    axios.post('https://foodeopen.herokuapp.com/api/delivery/updateLocation',addressobj,{   
      headers: {
          'auth-token': state.token
      }
  }).then(()=>{
      setAddress(newadd)
      setsavedisabled(false)
      handleClose()
  }).catch(()=>{
    setMessage("Something went wrong")
    setOpen1(true)
    setsavedisabled(false)

   // handleClose()
  })
    
    
  }

  const getGpsposition = () => {
    
    navigator.geolocation.getCurrentPosition(
    (position) => {
          
      setViewport({
      width: '100%',
      height: '70vh',
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      zoom: 13
    })

    

    axios.get(`https://foodeopen.herokuapp.com/api/delivery/geocode?lat=${position.coords.latitude}&long=${position.coords.longitude}`,
    )
      .then(function (response) {
        setNewadd({
            hasaddress: true,
            formatted_address : response.data.results[0].formatted_address,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
        
      }).catch(function (error) {

        setViewport({
          width: '100%',
          height: '70vh',
          latitude: newadd.latitude,
          longitude: newadd.longitude,
          zoom: 13
        })
        setMessage("Something went wrong")
        setOpen1(true)
      })
    
        },
        (error) => {
            setViewport({
                width: '100%',
                height: '70vh',
                latitude: add.latitude,
                longitude: add.longitude,
                zoom: 13
              })
              setMessage('Location access disabled')
              setOpen1(true)

        },
        {enableHighAccuracy: true},
      
      );
    

  }





  return (
    <div>
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
    style={{ background: "rgb(231,29,54)", borderRadius: "18px", }}
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

      <ReactMapGL
        {...viewport}
        
        mapStyle= {`mapbox://styles/mapbox/${theme}`}
        //  light-v10 dark-v10 outdoors-v11 satellite-v9

        mapboxApiAccessToken='pk.eyJ1Ijoibml0aW5idW50eSIsImEiOiJja2c3d3pzdjMwYmcxMnFudmJqcDdid3E1In0.RUgeoe87qgjz27g8d9sTLQ'
        onViewportChange={nextViewport => setViewport(nextViewport)}



      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>


          <Card style={{ width: "100%", background: "rgba(255,255,255,0.9)", padding: "8px" }}>


            <Typography variant="h5" style={{ color: "rgb(63,81,181)" }}>

              <PersonPinIcon style={{ transform: "translateY(3px)" }} />
             &nbsp;Choose your location
          </Typography>






            <Divider />
            <Typography variant="caption" gutterBottom>
              {newadd.formatted_address}
            </Typography>

          </Card>

          
          <Avatar style={{ margin: "8px 8px 8px 8px", width: "42px", height: "42px", backgroundColor: "rgba(63,81,181,0.9)" }}>
            
            <IconButton onClick={getGpsposition}>
              <GpsFixedIcon style={{ color: "white" }} />
            </IconButton>
          </Avatar>

          <Avatar style={{ margin: "0px 8px 8px 8px", width: "42px", height: "42px", backgroundColor: "rgba(0,0,0,0.7)" }}>
            <IconButton onClick={()=> chageTheme()}>
              <Brightness4Icon style={{ color: "white" }} />
            </IconButton>
          </Avatar>

          <Avatar style={{ margin: "0px 8px 8px 8px", width: "42px", height: "42px", backgroundColor: "rgba(255,255,255,0.9)" }}>
            <IconButton onClick={hadleRecenter}>
              <SettingsBackupRestoreIcon style={{ color: "black" }} />
            </IconButton>
          </Avatar>
        </div>


        {
          viewport.zoom >= 13.5?
          restaurantList.map((item,index)=>
        
          <Marker
          longitude={item.coordinates[0]}
          latitude={item.coordinates[1]}>
           
          <><RestaurantIcon style={{color:"#457b9d", width:`${viewport.zoom*0.9}px`, height:`${viewport.zoom*0.9}px`,transform: "translate(-5px,-20px)"}}/>
          <p style={{color:"#457b9d", fontSize:`${viewport.zoom*0.8}px`,transform: "translate(-42%,-36px)"}}><strong>{item.restaurantname}</strong></p></>
        </Marker>
  
         
        
          ):<div />
        }
        

    
        <Marker longitude={newadd.longitude}
          latitude={newadd.latitude}>
           
           
          <img draggable={false} style={{position: "absolute", transform: "translate(-100px,-105px)"}} src='/blink.svg' />
         
        </Marker>

        <Marker longitude={viewport.longitude}
          latitude={viewport.latitude}>
          {/* <RoomIcon style={{position:"absolute", transform:"translate(-12px,-22px)", color:"rgb(63,81,181"}}  /> */}
          <img draggable={false} style={{ width: "42px", height: "42px", position: "absolute", transform: "translate(-20px,-44px)" }} src='/pin.svg' />

        </Marker>

        <div style={{position: 'absolute', bottom: 36,left: 8}}>
          <ScaleControl maxWidth={100} unit={"metric"}/>
        </div>
       
      </ReactMapGL>
      <div style={{ padding: "8px" }}>

       <center> <Button size="small" disabled={isloading} variant="contained" color="primary" style={{textTransform: 'none'}} onClick={getcurrentAddress} >Use Pinned location</Button>
       </center>
      </div>
      <div style={{ display: "flex", flexDirection: "column", padding: "0px 8px 8px 8px", alignItems: "flex-end" }}>
        <div>
        <Button onClick={handleClose} style={{color:"gray"}}>Discard</Button>
          <Button onClick={saveAddress} disabled={savedisabled} color="primary">Save</Button>

        </div>

      </div>


    </div>
    

  );

}

export default Map;