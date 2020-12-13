import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid'
import Slide from '@material-ui/core/Slide';
import CardActionArea from '@material-ui/core/CardActionArea'
import Map from './Map'
import { MapPin } from 'react-feather';
import { useStateValue } from '../LocationStateProvider';
import Typography from '@material-ui/core/Typography'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddressCard = ({update, setUpdate}) => {
  
  const [state , dispatch] = useStateValue();
 
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  }

  return (
    <div>
       <Dialog
        TransitionComponent={Transition}
        style={{background:"rgba(0,0,0,0.6)"}}
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
          <Map 
                handleClose={handleClose} update={update} setUpdate={setUpdate} />
        
       
      </Dialog>
    <CardActionArea onClick={handleOpen} style={{borderRadius:"18px"}} >
      <Card style={{color: "gray", borderRadius:"18px" }} >
        {/* <MapPin size="12px" style={{ color: "rgb(63,81,181)" }} />
           &nbsp;
            Home - {state.hasaddress?state.currentaddress.address.formatted_address:""} */}

<Grid container spacing={0}>
                                    <Grid item xs={2} sm={1}>
                                        <div style={{width:"100%", background:"rgb(63,81,181)", height:"100%", display:"flex",alignItems:"center"}}>
                                            
                                               
                                            <MapPin style={{marginLeft:"50%", transform:"translatex(-50%)"}} color="white" />
                                         
                                        </div>

                                    </Grid>
                                    <Grid item xs={10} sm={11} style={{padding:"8px"}}>
                                        <Typography variant="body2" style={{color:"#495057"}}>
                                        Home - {state.hasaddress?state.currentaddress.address.formatted_address:""}

                                        </Typography>
                                       

                                    </Grid>
                                </Grid>
      </Card>
    </CardActionArea>
   
    </div>

  );
};

export default AddressCard;
