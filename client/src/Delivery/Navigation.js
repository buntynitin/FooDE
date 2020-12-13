import React, {useEffect, useState} from 'react'
import io from "socket.io-client";
import Map from './Map'
const socket = io("https://foodedelivery.herokuapp.com/");
function Navigation(props) {
  const [hasError, setHasError] = useState(false)
    useEffect(() => {
        
        socket.emit("join_room",{room_id:props.room_id} )

        navigator.geolocation.watchPosition(
            (position) => {
            
                const payload = {
                    room_id: props.room_id,
                    latitude : position.coords.latitude,
                    longitude : position.coords.longitude,
                    heading : position.coords.heading,
                    speed : position.coords.speed
                }
              socket.emit('sendLocation2server', payload)
            },
            (error) => setHasError(true),
            {enableHighAccuracy: true},
          
          );
    },[])

    
    return (
        <div>
          
         {
           hasError?
           <div style={{padding:"16px"}}>
             <center>
             <img width="100px" height="100px" src='/map.svg' alt='' />
             <br></br>
             {'Location service unavailable'}
             </center>
            </div>
           :
           <div>
            <Map
            width='100%'
            height='80vh'
            room_id={props.room_id}
            lat1={props.lat1}
            long1={props.long1}
            lat2={props.lat2}
            long2={props.long2}
            />
            </div>
         }
            
        </div>

    )
}

export default Navigation