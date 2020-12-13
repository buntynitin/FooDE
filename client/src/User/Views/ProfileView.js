import React from 'react'
import Card from '@material-ui/core/Card'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useStateValue } from '../StateProvider'


function ProfileView() {
    const [state, dispatch] = useStateValue()

    const handleLogout = () => {
        dispatch({
            type: "LOGOUT",
        })

    }
    return (
        <div>
            <Container maxWidth={false}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", marginTop: "16px" }}>
                        <Button onClick={handleLogout} variant="contained" color="primary" style={{borderRadius:"18px"}}>
                            Logout &nbsp;<ExitToAppIcon />
                        </Button>

                    </div>

                    <Divider style={{ marginTop: "16px", marginBottom:"16px" }} />
                    <center>
                        <Card style={{ padding: "16px", borderRadius:"18px" }}>

                            {state.picture?
                            <img draggable={false} src={state.picture} alt='' />

                        :<div />    
                        }
                            
                            <Typography variant='h5'>
                                {state.name}
                            </Typography>

                            <Typography variant='body1'>
                                {state.email}
                            </Typography>


                            <Typography>
                                {(new Date(parseInt(state._id.substring(0, 8), 16) * 1000)).toDateString()}
                            </Typography>




                        </Card>
                    </center>
                </Container>
            
        </div>
    )
}


export default ProfileView