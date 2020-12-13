import React, { useEffect, useState} from 'react'
import axios from 'axios'
import { useStateValue } from '../LocationStateProvider';
import {
    Container,
    IconButton,
    Typography,
  } from '@material-ui/core';
  import RefreshIcon from '@material-ui/icons/Refresh';
import AddressCard from './AddressCard'

import HomeMain from './HomeMain'
function HomeView(props) {
    const [update,setUpdate] = useState(false)
    const [state , dispatch] = useStateValue();
    // const [lat, setLat] = useState(25.7488214)
    // const [long, setLong] = useState(82.6813936)
    // const [locationAccess, setLocationAccess] = useState(true)
    const [lat, setLat] = useState(state.hasaddress ? state.currentaddress.lat : '') 
    const [long, setLong] = useState(state.hasaddress ? state.currentaddress.long : '') 
    const [locationAccess, setLocationAccess] = useState(state.hasaddress ? true : false)
    const [address, setAddress] = useState(state.hasaddress?state.currentaddress.address:{})
    // const [rlat, setRLat] = useState(25.7488214)
    // const [rlong, setRLong] = useState(82.6813936)
    // const [raddress, setRAddress] =useState({})

    const [isloading, setIsloading] = useState(false)

    const getlocation = () => {
        axios.get(`https://foodeopen.herokuapp.com/api/user/geocode?lat=${lat}&long=${long}`,
        )
            .then(function (response){
                setAddress(response.data.results[0])
                dispatch({
                  type: "ADDLOCATION",
                  item: { hasaddress : true,
                    gpsaddress:{
                      lat,long,address:response.data.results[0]

                    },
                    currentaddress:{
                      lat,long,address:response.data.results[0]
                    }
                  
                  }
                })
            
            }).catch(function (error){
              setAddress({"error":"Couldn't fetch your Address"})
              
            })


    }
    
    useEffect(() => {
        props.handlemyDrawer()
        if(!state.hasaddress){  

        setIsloading(true)
      
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(function (position) {
            setLat(position.coords.latitude)
            setLong(position.coords.longitude)
            setLocationAccess(true)
            setIsloading(false)
          },function (error){
            setIsloading(false)
          } );
        }
        else setIsloading(false)
      }
},[])

useEffect(() => {
  if(locationAccess && !state.hasaddress){
 getlocation()
  }
}, [locationAccess])

    return (
    
        
            <div>
            {locationAccess?
            <div>
            {state.hasaddress?
            <div>
            <AddressCard update={update} setUpdate={setUpdate} />
            
            
            <div style={{marginTop:"16px"}}/>
            <HomeMain update={update} />
            </div>
            :
            <center><img style={{marginTop:"35vh"}} src="/globe.svg" alt="loading.."/>
            <Typography
            align="center"
            color="textPrimary"
            variant="subtitle1"
          >
            Getting your Address ..
          </Typography>
            </center>
            }
            </div>
            :
          
            isloading?<center><img style={{marginTop:"35vh"}} src="/globe.svg" alt="loading.."/>
        <Typography
            align="center"
            color="textPrimary"
            variant="subtitle1"
          >
            Getting Location access ..
          </Typography>
        </center>: 
            <div style={{marginTop:"10vh"}}>
                <center><img height="200px" style={{position:"relative"}} width="200px" src="/map.svg" alt="Loction access Error"></img>
                <img height="50px" width="50px" style={{position:"absolute",transform:"translate(-30px,150px)"}} src="/cancel.svg" alt="Loction access Error"></img>
                </center>
                <Container maxWidth="md">
          <Typography
            align="center"
            color="textPrimary"
            variant="h4"
          >
            Geolocation access unavailable
          </Typography>
          <Typography
            align="center"
            
            variant="subtitle1"
          >
            Make sure that
          </Typography>
          <Typography
            align="center"
            style={{color:"gray"}}
            variant="subtitle2"
          >
            •Device GPS is turned on.
          </Typography>
          <Typography
            align="center"
            style={{color:"gray"}}
            variant="subtitle2"
          >
               •You are using HTTPS server.
    
          </Typography>
          <Typography
            align="center"
            style={{color:"gray"}}
            variant="subtitle2"
          >
               •Browser location permission granted.
          </Typography>
          </Container>
          <center><IconButton color="primary" onClick={()=>{window.location.reload()}}>
              <RefreshIcon fontSize="large" color="primary" />
          </IconButton>
          </center>
            </div>
            }
           </div>
 
        
        
    )
}

export default HomeView
