import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Fade, Paper, Popper, Typography } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';





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


const AnyReactComponent = ({ text, lat, lng, deletePoint }) => {
  return (
    <Marker position={{
      lat: lat ? lat : 31.772561767303255,
      lng: lng ? lng : 35.16862111683302
    }}
      title={text}
      label={text}
      className='marker-data' type="button"

      style={{ border: "none", }} />
    /* <img src={'marker.png'} alt="marker" onClick={() => deletePoint()} /> */
    // {text}
    // </div>
  )
}

function MyComponent() {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDd2yrRfnh88OiKs8yCiH-8uK5aASNgve8"
  })

  const [mapers, setMapers] = React.useState([])
  useEffect(() => {
   axios.get('https://localhost:7207/api/Station')
    .then(res => {
      console.log(res)
      setMapers(res.data)
    }).catch(err => console.log(err))
  }, [])


  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const [open, setOpen] = React.useState(false);
  // const [placement, setPlacement] = React.useState();


  return isLoaded ? (<>
    <br></br><br></br>

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
        mapers.map((marker) =><AnyReactComponent key={marker.Id ? marker.Id : 0} text={marker.PointName}
          // deletePoint={() => deleteMarker(marker)}
          title={marker.PointName} lat={marker.lat} lng={marker.lng} />,
          console.log("l")
          
          )
      }
    <select>{mapers.map(x=><option>{x.PointName}</option>)}</select>

      { /* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  </>) : <>
  </>
}

export default React.memo(MyComponent)