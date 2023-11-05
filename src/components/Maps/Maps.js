import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Fade, Paper, Popper, Typography } from '@mui/material';

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
const markers = [{ PointName: "bbbbb", lat: 31.8, lng: 35.10 },
 { PointName: "ccc", lat: 31.2, lng: 35.7 }];

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

  const [map, setMap] = React.useState(null)
const getAllMarkers=()=>{
  //markes=axios.get.allstations
}
  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])


  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return isLoaded ? (<> 
   <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Typography sx={{ p: 2 }}>The content of the Popper.</Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
      <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onClick={(e) => console.log(e.latLng.lat(), e.latLng.lng())}
    // onLoad={onLoad}
    // onUnmount={onUnmount}
    >
      {
        markers.map(marker => <AnyReactComponent onClick={()=>console.log('ccc')} key={marker.Id ? marker.Id : 0} text={marker.PointName}
          // deletePoint={() => deleteMarker(marker)}
          title={marker.PointName} lat={marker.lat} lng={marker.lng}  />)
      }
      { /* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
    </>   ) : <>
  </>
}

export default React.memo(MyComponent)