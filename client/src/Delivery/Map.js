import React, { useState, useEffect } from 'react';
import ReactMapGL, {Marker,Source,Layer} from 'react-map-gl';
import axios from 'axios';
import io from "socket.io-client";
import { LinearProgress,Avatar, IconButton, Typography, Divider } from '@material-ui/core'
import Brightness4Icon from '@material-ui/icons/Brightness4';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import StorefrontIcon from '@material-ui/icons/Storefront';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import NavigationIcon from '@material-ui/icons/Navigation';
const socket = io("https://foodedelivery.herokuapp.com/");
function Map(props) {
  const [routes,setRoutes] = useState([])  
  const [socketResponse,setSocketResponse] = useState({})
  const [theme,setTheme] = useState('dark-v10')
  const [viewport, setViewport] = useState({
    width: props.width,
    height: props.height,
    latitude: 28.65381,   //indian capital
    longitude: 77.22897,
    zoom: 14,
    pitch : 50
   
    
  });

  const chageTheme = () =>{
      (theme === 'streets-v11') ?
      setTheme('dark-v10'):
      setTheme('streets-v11')
  }

  const handleRecenter = () =>{
    if(socketResponse.latitude)
    setViewport({
      width: props.width,
      height: props.height,
      latitude: socketResponse.latitude,
      longitude: socketResponse.longitude,
      zoom: 14,
      pitch: 50,
      
    })

  }

  const dataLayer ={
      id : 'route',
      type: 'line',
      paint :{
          'line-color': '#3f51b5',
          'line-width' : 8
      }
  }

  const geojson = {
    type: 'FeatureCollection',
    features: [
      {type: 'Feature', geometry: {type: 'LineString', coordinates: routes}}
    ]
  };
  useEffect(() =>{
    socket.emit("join_room",{room_id:props.room_id} )
    socket.on("sendLocation2client",(data) => {
      // if( JSON.stringify(data) !== '{}') 
        setSocketResponse(data)

       

        setViewport({
          width: props.width,
          height: props.height,
          latitude: data.latitude,
          longitude: data.longitude,
          zoom: 14,
          pitch: 50,
          
        })
      
    




        
         
    });

    

     
  },[])




  useEffect(() => {
    axios.get(`https://us1.locationiq.com/v1/directions/driving/${props.long1},${props.lat1};${props.long2},${props.lat2}?key=pk.20d9c3bfccc7b3f4887fae80b9cddad6&steps=false&alternatives=false&geometries=geojson&overview=full`)
    .then((response)=>{
       setRoutes(response.data.routes[0].geometry.coordinates)
    }).catch(()=>{

    })
      
  }, [])


  return (
    <ReactMapGL
   
    mapStyle= {`mapbox://styles/mapbox/${theme}`}
    //  light-v10 dark-v10 outdoors-v11 satellite-v9
    
    mapboxApiAccessToken='pk.eyJ1Ijoibml0aW5idW50eSIsImEiOiJja2c3d3pzdjMwYmcxMnFudmJqcDdid3E1In0.RUgeoe87qgjz27g8d9sTLQ'
      {...viewport}
      onViewportChange={nextViewport => setViewport(nextViewport)}

    
    >
      
  
     
   
        


        <Source type="geojson" data={geojson}>
         <Layer {...dataLayer}/>
      
          </Source>
         {socketResponse.latitude?
         <Marker longitude={socketResponse.longitude}
         latitude={socketResponse.latitude}>
         
           
           {socketResponse.heading?
            <NavigationIcon style={{ transform:"translate(-12px,-22px)", transform:`rotate(${Math.trunc(socketResponse.heading)}deg)` ,color:"#f26419"}} />:
            <NavigationIcon style={{ transform:"translate(-12px,-22px)" ,color:"#f26419"}} />
          }
           
         </Marker>
         :<div />}

         <div style={{position:"absolute",padding:"4px",margin:"8px" ,background:"rgba(255,255,255,0.8)", borderRadius:"4px"}}>
           <center>
           <Typography variant='caption'>
            Destination <PersonPinIcon style={{transform:"translateY(5px)",color:"#f50057",fontSize:"18px"}} />
           </Typography>
           <Divider />
           <Typography variant='caption'>
           Delivery Person <NavigationIcon style={{transform:"translateY(5px)",color:"#f26419",fontSize:"18px"}} />
           </Typography>
           <Divider />
           <Typography variant='caption'>
           Restaurant <StorefrontIcon style={{transform:"translateY(5px)",color:"#f50057",fontSize:"18px"}} />
           </Typography>
           
           
           </center>
         </div>

      <Marker longitude={props.long1}
         latitude={props.lat1}>
         
           <PersonPinIcon style={{transform:"translate(-12px,-22px)", color:"#f50057"}} /> 
         </Marker>

         <Marker longitude={props.long2}
         latitude={props.lat2}>
         
           <StorefrontIcon style={{transform:"translate(-12px,-22px)", color:"#f50057"}} /> 
         </Marker>

        {!(socketResponse.latitude && routes.length > 0)?
        <LinearProgress />: <div />}

<div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
        <Avatar style={{ margin: "8px 8px 8px 8px", width: "42px", height: "42px", backgroundColor: "rgba(63,81,181,0.9)" }}>
            <IconButton onClick={()=> chageTheme()}>
              <Brightness4Icon style={{ color: "white" }} />
            </IconButton>
          </Avatar>
          <Avatar style={{ margin: "0px 8px 8px 8px", width: "42px", height: "42px", backgroundColor: "rgba(255,255,255,0.9)" }}>
            <IconButton onClick={()=> handleRecenter()}>
              <SettingsBackupRestoreIcon style={{ color: "black" }} />
            </IconButton>
          </Avatar>
    </div>
    </ReactMapGL>
  
  );
}

export default Map