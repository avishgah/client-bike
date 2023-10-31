import React from 'react'
import { GoogleMap, useJsApiLoader,Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '600px'
};

const center = {
  lat: 31.77,
  lng: 35.168
};
const markers=[{PointName:"bbbbb", lat:31.8, lng:35.10},{PointName:"ccc", lat:31.2, lng:35.7}];

const AnyReactComponent = ({ text, lat, lng, deletePoint }) => {
  return (
    <Marker position={{lat:lat ? lat : 31.772561767303255,
      lng:lng ? lng : 35.16862111683302}} 
      title={text}
      label={text}
      className='marker-data' type="button"
      
      style={{ border: "none" }} />
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

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onClick={(e)=>console.log(e.latLng.lat(),e.latLng.lng())}
      // onLoad={onLoad}
      // onUnmount={onUnmount}
    >
      {
        markers.map(marker => <AnyReactComponent key={marker.Id ? marker.Id : 0} text={marker.PointName}
          // deletePoint={() => deleteMarker(marker)}
          title={marker.PointName} lat={marker.lat} lng={marker.lng} />)
      }
      { /* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)