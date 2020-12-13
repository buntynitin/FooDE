import React from 'react';
import { useStateValue } from '../LocationStateProvider';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography' 
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider'
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import axios from 'axios'
import Button from '@material-ui/core/Button'
import PersonPinIcon from '@material-ui/icons/PersonPin';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import Brightness4Icon from '@material-ui/icons/Brightness4';

function Map(props) {
  const [state , dispatch] = useStateValue();
  const [isloading,setIsloading] = React.useState(false)
  const [newadd, setNewadd] = React.useState(state.currentaddress.address)
  const [newlat, setNewlat] = React.useState(state.currentaddress.lat)
  const [newlong, setNewlong] = React.useState(state.currentaddress.long)
  const [restaurantList, setRestaurantList] = React.useState([])
  const [theme,setTheme] = React.useState('streets-v11')
  const [viewport, setViewport] = React.useState({
    width: '100%',
    height: '70vh',
    latitude: state.currentaddress.lat,
    longitude: state.currentaddress.long,
    zoom: 13
  });

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
      latitude: newlat,
      longitude: newlong,
      zoom: 13
    })

    // setNewlat(props.latitude)
    // setNewlong(props.longitude)
    // setNewadd(props.address)
  }

  const getcurrentAddress = () => {
    setIsloading(true)
    axios.get(`https://foodeopen.herokuapp.com/api/user/geocode?lat=${viewport.latitude}&long=${viewport.longitude}`,
    )
      .then(function (response) {
        setNewadd(response.data.results[0])
        setNewlat(viewport.latitude)
        setNewlong(viewport.longitude)
        setIsloading(false)

      }).catch(function (error) {
        setIsloading(false)
      })





  }

  const saveAddress = () => {
    // props.setAddress(newadd)
    // props.setLat(newlat)
    // props.setLong(newlong)
    dispatch({
      type: "ADDLOCATION",
      item: { hasaddress : true,
        gpsaddress:state.gpsaddress,
        currentaddress:{ lat: newlat, long: newlong, address:newadd }
      
      }
    })
    props.setUpdate(!props.update)
    props.handleClose()
  }

  const getGpsposition = () => {
    setNewadd(state.gpsaddress.address)
    setNewlat(state.gpsaddress.lat)
    setNewlong(state.gpsaddress.long)
    setViewport({
      width: '100%',
      height: '70vh',
      latitude: state.gpsaddress.lat,
      longitude: state.gpsaddress.long,
      zoom: 13
    })

  }





  return (
    <div>
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
        

    
        <Marker longitude={newlong}
          latitude={newlat}>
           
           
          <img draggable={false} style={{position: "absolute", transform: "translate(-100px,-105px)"}} src='/blink.svg' />
         
        </Marker>

        <Marker longitude={viewport.longitude}
          latitude={viewport.latitude}>
          {/* <RoomIcon style={{position:"absolute", transform:"translate(-12px,-22px)", color:"rgb(63,81,181"}}  /> */}
          <img draggable={false} style={{ width: "42px", height: "42px", position: "absolute", transform: "translate(-20px,-44px)" }} src='/pin.svg' />

        </Marker>
       
      </ReactMapGL>
      <div style={{ padding: "8px" }}>

       <center> <Button size="small" disabled={isloading} variant="contained" color="primary" style={{textTransform: 'none'}} onClick={getcurrentAddress} >Use Pinned location</Button>
       </center>
      </div>
      <div style={{ display: "flex", flexDirection: "column", padding: "0px 8px 8px 8px", alignItems: "flex-end" }}>
        <div>
          <Button onClick={props.handleClose} style={{color:"gray"}}>Discard</Button>
          <Button onClick={saveAddress} color="primary">Save</Button>

        </div>

      </div>


    </div>
    

  );

}

export default Map;