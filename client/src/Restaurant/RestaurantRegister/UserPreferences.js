import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import ChipsArray from './ChipInput'


//GENERAL
import { TextField, Grid, MenuItem, InputLabel, FormControl, Select } from "@material-ui/core";
import ResponsiveDialog from './popup'
//USER PREFERENCES
const UserPreferences = props => {

  const [state] = useContext(UserContext);
  const { user, errors } = state;
  const [lat, setLat] = React.useState(user.coordinates[1])
  const [long, setLong] = React.useState(user.coordinates[0])

  React.useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
        user.coordinates[0] = position.coords.longitude;
        user.coordinates[1] = position.coords.latitude;
      });
    }


  }, [user.coordinates])

  const [myState, setMyState] = React.useState(user.state)
  const handleChangeState = (event) => {
    user.state = event.target.value;
    setMyState(event.target.value);
  };

  return (
    <Grid container spacing={2}>

      <Grid item xs={12}>

        <TextField
          id='restaurantName'
          label='Restaurant Name'
          value={user.restaurantName}
          name='restaurantName'
          variant='outlined'
          required
          error={!!errors["restaurantName"]}
          inputProps={{
            minLength: 6,
            maxLength: 255
          }}
          fullWidth

        />
      </Grid>



      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item xs={9}>
            <TextField
              id='mobile'
              label='Phone'
              value={user.mobile}
              name='mobile'
              type='number'
              variant='outlined'
              margin='normal'
              required
              error={!!errors["mobile"]}
              inputProps={{
                max: 9999999999,
                min: 1000000000,
                step: 1
              }}


              fullWidth
            />

          </Grid>

          <Grid item xs={3} style={{ paddingTop: "20px" }} >
            <ResponsiveDialog />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={6} >
            <TextField
              id="openingTime"
              value={user.openingTime}
              label="Opening Time"
              type="time"
              name="openingTime"
              fullWidth
              variant='outlined'
              margin='normal'
              required
              onChange={(e) => user.openingTime = e.target.value}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            /></Grid>

          <Grid item xs={6} >
            <TextField
              id="closingTime"
              label="Closing Time"
              value={user.closingTime}
              name="closingTime"
              type="time"
              required
              fullWidth
              variant='outlined'
              onChange={(e) => user.closingTime = e.target.value}
              margin='normal'
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}

            /></Grid>


        </Grid>

      </Grid>



      <Grid item xs={12} style={{ paddingTop: "20px" }}>
        <ChipsArray />
      </Grid>
      <Grid item xs={12} style={{ paddingTop: "25px" }}>
        <div style={{ border: 'solid 1px rgb(203,203,203)', borderRadius: '4px', padding: '16px', marginBottom: "16px" }}>
          <TextField
            id='address'
            label='Address'
            value={user.address}
            name='address'
            required
            error={!!errors["address"]}
            inputProps={{
              maxLength: 255,
              minLength: 6
            }}
            fullWidth

          />

          <Grid container spacing={1} style={{ paddingTop: "5px" }}>
            <Grid item xs={12} sm={4}>
              <TextField
                id='city'
                label='City'
                value={user.city}
                name='city'
                required
                error={!!errors["city"]}
                inputProps={{
                  maxLength: 255,
                  minLength: 6
                }}

                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={4} >
              <FormControl fullWidth required>
                <InputLabel>State</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="state"
                  name="state"
                  value={myState}
                  label="State"
                  onChange={handleChangeState}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
                  <MenuItem value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</MenuItem>
                  <MenuItem value="Arunachal Pradesh">Arunachal Pradesh</MenuItem>
                  <MenuItem value="Assam">Assam</MenuItem>
                  <MenuItem value="Bihar">Bihar</MenuItem>
                  <MenuItem value="Chandigarh">Chandigarh</MenuItem>
                  <MenuItem value="Chhattisgarh">Chhattisgarh</MenuItem>
                  <MenuItem value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</MenuItem>
                  <MenuItem value="Daman and Diu">Daman and Diu</MenuItem>
                  <MenuItem value="Delhi">Delhi</MenuItem>
                  <MenuItem value="Lakshadweep">Lakshadweep</MenuItem>
                  <MenuItem value="Puducherry">Puducherry</MenuItem>
                  <MenuItem value="Goa">Goa</MenuItem>
                  <MenuItem value="Gujarat">Gujarat</MenuItem>
                  <MenuItem value="Haryana">Haryana</MenuItem>
                  <MenuItem value="Himachal Pradesh">Himachal Pradesh</MenuItem>
                  <MenuItem value="Jammu and Kashmir">Jammu and Kashmir</MenuItem>
                  <MenuItem value="Jharkhand">Jharkhand</MenuItem>
                  <MenuItem value="Karnataka">Karnataka</MenuItem>
                  <MenuItem value="Kerala">Kerala</MenuItem>
                  <MenuItem value="Madhya Pradesh">Madhya Pradesh</MenuItem>
                  <MenuItem value="Maharashtra">Maharashtra</MenuItem>
                  <MenuItem value="Manipur">Manipur</MenuItem>
                  <MenuItem value="Meghalaya">Meghalaya</MenuItem>
                  <MenuItem value="Mizoram">Mizoram</MenuItem>
                  <MenuItem value="Nagaland">Nagaland</MenuItem>
                  <MenuItem value="Odisha">Odisha</MenuItem>
                  <MenuItem value="Punjab">Punjab</MenuItem>
                  <MenuItem value="Rajasthan">Rajasthan</MenuItem>
                  <MenuItem value="Sikkim">Sikkim</MenuItem>
                  <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
                  <MenuItem value="Telangana">Telangana</MenuItem>
                  <MenuItem value="Tripura">Tripura</MenuItem>
                  <MenuItem value="Uttar Pradesh">Uttar Pradesh</MenuItem>
                  <MenuItem value="Uttarakhand">Uttarakhand</MenuItem>
                  <MenuItem value="West Bengal">West Bengal</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                id='zipcode'
                label='Zip-Code'
                value={user.zipcode}
                name='zipcode'
                type='number'
                required
                error={!!errors["zipcode"]}
                inputProps={{
                  max: 999999,
                  min: 100000,
                  step: 1
                }}
                fullWidth
              />

            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={3}>


              <Grid item xs={6}>
                <TextField
                  label='Latitude'
                  value={lat}
                  type='number'
                  fullWidth
                  required
                  inputProps={{
                    max: 90.0,
                    min: -90.0,
                    step: 0.0000000000001
                  }}
                  onChange={(e) => { setLat(e.target.value); user.coordinates[1] = parseFloat(e.target.value) }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='Longitude'
                  value={long}
                  type='number'
                  fullWidth
                  required
                  inputProps={{
                    max: 180.0,
                    min: -180.0,
                    step: 0.0000000000001
                  }}
                  onChange={(e) => { setLong(e.target.value); user.coordinates[0] = parseFloat(e.target.value) }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <small>Please use the location based data</small>
            </Grid>
          </Grid>

        </div>



      </Grid>





    </Grid>


  );

};


export default UserPreferences