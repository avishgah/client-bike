import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Box, Button, Fade, Paper, Popper, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../Maps/Maps.css';



const containerStyle = {
  width: '100%',
  height: '440px',
  border: "solid",
  filter: "grayscale(0%) !important"
};

const center = {
  lat: 31.77,
  lng: 35.168
};


const AnyReactComponent = ({ text, lat, lng, opacity, selectedPoint }) => {
  return (
    <Marker position={{
      lat: lat ? lat : 31.772561767303255,
      lng: lng ? lng : 35.16862111683302
    }}
      title={text}
      label={text}
      opacity={opacity}
      className='marker-data' type="button"
      clickable={true}
      onDblClick={selectedPoint}
      style={{ border: "none", }} />
    /* <img src={'marker.png'} alt="marker" onClick={() => deletePoint()} /> */
    // {text}
    // </div>
  )
}



function MyComponent() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  // const { isLoaded } = useJsApiLoader({
  //   id: 'google-map-script',
  //   googleMapsApiKey: "AIzaSyDd2yrRfnh88OiKs8yCiH-8uK5aASNgve8"
  // })
  const [selectPoin, setSlectedPoint] = useState(null)
  const [mapers, setMapers] = React.useState([])
  useEffect(() => {
    axios.get('https://localhost:7207/api/Station')
      .then(res => {
        console.log(res)
        setMapers(res.data)
        let homePos = {}
        res.data.filter(x => x.count > 0).forEach((element, i) => {
          const google = window.google;
          console.log(element)
          const markerPos = { lat: element.lat, lng: element.lng };
          console.log(markerPos)
          if (i == 0) {

            homePos = markerPos;
          }
          else {
            if (homePos && markerPos) {
              const distanceInMeters = google.maps.geometry.spherical.computeDistanceBetween(homePos, markerPos);
              console.log(distanceInMeters, "distanceInMeters");
            }
          }
        });
      }).catch(err => console.log(err))
  }, [])


  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const [open, setOpen] = React.useState(false);
  // const [placement, setPlacement] = React.useState();

  console.log(selectPoin)
  return (<>
    <br />

    <form id="formLoginR" >
      <h8><b>הזמנה מראש</b></h8>
      <p>הכנס מספר אופניים ותחנה רצויה</p>
      <br></br>
      <TextField
        label="מספר אפנים "
        id="demo-helper-text-aligned"
      // {...register("bike", {})}
      />
      <br></br>
      <select
        onChange={({ target }) => setSlectedPoint(target.value)}>
          {mapers.map(marker => <option selected={selectPoin === marker.id} value={marker.Id}>{marker.name} {marker.location}</option>)}
      </select>
      <br></br>
      <br></br>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          onChange={({ target }) => setSlectedPoint(target.value)}
        >
          {/* {mapers.map(marker => <MenuItem selected={selectPoin === marker.id} value={marker.Id}>{marker.name}{marker.location}{<br></br>}</MenuItem>)} */}

          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" id="addR" type="submit">
        התחבר
      </Button>

      <br></br>
    </form>
    <br />


    {/* <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper>
            <Typography sx={{ p: 2 }}>The content of the Popper.</Typography>
          </Paper>
        </Fade>
      )}
    </Popper> */}
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onClick={(e) => console.log(e.latLng.lat(), e.latLng.lng())}
    // onLoad={onLoad}
    // onUnmount={onUnmount}
    >


      {
        mapers.map((marker) => <AnyReactComponent key={marker.id ? marker.id : 0}
          opacity={selectPoin === marker.id ? 1 : 0.5}
          selectedPoint={() => setSlectedPoint(marker.id)}
          text={`${marker.name} ${marker.location}`}
          title={marker.name} lat={marker.lat} lng={marker.lng} />
        )
      }

      { /* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  </>)

}

export default React.memo(MyComponent)