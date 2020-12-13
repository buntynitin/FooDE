import React, {Component} from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import RoomIcon from '@material-ui/icons/Room';
class Map extends Component {
    constructor(props) {
        super(props);
        this.state={
              viewport: {
                width: '100%',
                height: '300px',
              latitude: this.props.latitude,
              longitude: this.props.longitude,
              zoom: 13,
              
              
            
            }
          };
        
      }

  
  render() {
    return (
        <div>
        <ReactMapGL
        {...this.state.viewport}
         mapStyle="mapbox://styles/mapbox/streets-v11"
        //  light-v10 dark-v10 outdoors-v11 satellite-v9
        
        mapboxApiAccessToken='pk.eyJ1Ijoibml0aW5idW50eSIsImEiOiJja2c3d3pzdjMwYmcxMnFudmJqcDdid3E1In0.RUgeoe87qgjz27g8d9sTLQ'
        onViewportChange={(viewport) => this.setState({viewport})}
      > 
    
        <Marker longitude={this.props.longitude}
             latitude={this.props.latitude}>
               <RoomIcon style={{position:"absolute", transform:"translate(-12px,-22px)", color:"rgb(63,81,181"}}  />
               
        </Marker>

     
        
        <Popup
                  latitude={this.props.latitude}
                  longitude={this.props.longitude}
                  closeButton={false}
                  closeOnClick={false}
                  dynamicPosition={true}
                  anchor="top" >
                  <div className="popup">
                    <small>{this.props.text}</small>
                    
                   
                    
                  </div>
                </Popup>

        </ReactMapGL>
      
      </div>
      
    );
  }
}

export default Map;