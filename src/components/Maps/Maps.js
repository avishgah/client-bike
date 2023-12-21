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

// count
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


import Grid from '@mui/material/Grid';

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

const OpenMe = (marker) => {

  console.log(marker, "clicked");
}

const AnyReactComponent = ({ text, lat, lng, opacity, selectedPoint }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
    console.log("kkk")
    document.getElementById("boxStation").value = document.getElementById("boxStation").defaultValue;
   
  };

  return (<>
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
      onClick={handleClick('top-right')}
      style={{ border: "none", }} />




    <Box sx={{ width: 600 }} id="boxStation">
      <Popper
        // Note: The following zIndex style is specifically for documentation purposes and may not be necessary in your application.
        sx={{ zIndex: 1200 }}
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Typography sx={{ p: 2 }}>שם תחנה {text.name}</Typography>
              <Typography sx={{ p: 2 }}>מספר אופניים פנויים {text.cun == null ? 0 : text.cun}</Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
    
    </Box>
  </>)
}


function MyComponent() {
  const [count, setCount] = React.useState(0);
  const [selectPoin, setSlectedPoint] = useState(null)
  const [mapers, setMapers] = React.useState([])

  useEffect(() => {
    axios.get('https://localhost:7207/api/StationViewControllers')
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



  console.log(selectPoin)
  return (<>
    <br />

    <br />

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
          // opacity={selectPoin === marker.id ? 1 : 0.5}
          selectedPoint={() => setSlectedPoint(marker)}
          onClick={() => OpenMe(marker)}
          text={marker}
          title={marker.name} lat={marker.lat} lng={marker.lng} />
        )
      }

      { /* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>

  </>)

}

export default React.memo(MyComponent)