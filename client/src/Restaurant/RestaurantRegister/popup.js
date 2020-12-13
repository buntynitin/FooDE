import React,{useContext} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import CloudDone from "@material-ui/icons/CloudDone";
import Upload from './Upload'
import { UserContext } from "./UserContext";

export default function ResponsiveDialog() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [state] = useContext(UserContext);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      
      <Button style={{paddingTop:"15px",paddingBottom:"15px",width:"100%"}} variant="outlined" color="primary" onClick={handleClickOpen}>
        {/* <FontAwesomeIcon icon={props.file ? faCheck:faImages} color={props.file ? "green":"primary"} size="lg" />&nbsp;Image */}
        {state.user.image?<CloudDone style={{ color: "green" }} />:<AddPhotoAlternateIcon />} 
      </Button>
      
      {/* {
        props.file && (
          <FontAwesomeIcon icon={faCheck} color="green" size="lg" />
        )
      } */}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >

        <DialogTitle id="responsive-dialog-title">
        {"Upload Image"}
        
        </DialogTitle>
        <Divider />
        <DialogContent>

          <Upload/>

        </DialogContent>
        <DialogActions>


          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}