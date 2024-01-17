import React, { useRef } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Box, Button, Fade, Paper, Popper, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';

import '../Maps/Maps.css';




import { Card, Input } from '@material-ui/core';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import { useDispatch, useSelector } from 'react-redux';
import * as type from "../../store/actions/actionType";

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
//  מראה נקודות על המפה
const AnyReactComponent = ({ text, lat, lng, opacity, selectedPoint }) => {

  return (<>
    <Marker position={{
      lat: lat ? lat : 31.772561767303255,
      lng: lng ? lng : 35.16862111683302
    }}
      title={
        `${text.name}  ${text.location} 
       מספר אופניים פנויים : ${text.cun == null ? 0 : text.cun} `

      }
      opacity={opacity}
      className='marker-data' type="button"
      clickable={true}
      onDblClick={selectedPoint}
      style={{ direction: "rtl" }}

    />

  </>)
}


function MyComponent() {
  
  const [selectPoin, setSlectedPoint] = useState(null)
  const [maps, setMaps] = useState(null)
  const [mapers, setMapers] = useState([])
  const [stations, setStations] = useState([]);
  const [stationsMostClosde, setstationsMostClosde] = useState([]);
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const filteredOptions = stations.filter((option) => option.location?.toLowerCase().includes(searchText?.toLowerCase()));

  const currentUser = useSelector(state => state.ur.user);
  const station = useSelector(state => state.ur.station);
  const [searchCardWidth, setSearchCardWidth] = useState('100%'); // Default width

  const mapRef = useRef(null); // Ref למפה שבה תעשה זום
  const google = window.google;

  let map;
  useEffect(() => {

    const defaultLocation = { lat: -34.397, lng: 150.644 };
    // יצירת אובייקט מפה חדש
    map = new google.maps.Map(document.getElementById("map"), {
      center: defaultLocation, // המיקום המרכזי של המפה בתחילת הטעינה
      zoom: 10, // רמת הזום בתחילת הטעינה
    });
    setMaps(maps)

    axios.get('https://localhost:7207/api/StationViewControllers')
      .then(res => {
        console.log(res)
        setMapers(res.data)

        // מיקום נוכחי
        navigator.geolocation.getCurrentPosition(x => {
          const homePos = { lat: x.coords.latitude, lng: x.coords.longitude };

          // מיקום נוחכי ומיון נקודות
          const data = res.data.filter(x => x.cun > 0 && x.status == true).map((element, i) => {
            const markerPos = { lat: element.lat, lng: element.lng };

            if (homePos && markerPos) {
              const distanceInMeters = google.maps.geometry.spherical.computeDistanceBetween(homePos, markerPos);
              element.distanc = distanceInMeters
            }
            return element
          });
          setStations(data);
          let arr = data
          // console.log(stations.distanc.min(),"min");

          // מיון המערך לפי המרחק מהנמוך לגבוה
          arr.sort((a, b) => a.distanc - b.distanc);

          // לקחת את שלושת האיברים הראשונים מהמערך הממוין
          let closestThree = arr.slice(0, 3);
          setstationsMostClosde(closestThree);

        })
      }).catch(err => console.log(err))
  }, [])

  useEffect(() => {
    // Update searchCardWidth when currentUser changes
    if (currentUser === null) {
      setSearchCardWidth('60%');
    } else {
      setSearchCardWidth('100%'); // Set your desired width here
    }
  }, [currentUser]);


  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  // פונקציה לזום לנקודה שנבחרה
  const zoomToSelectedPoint = () => {
    const map = mapRef.current; // מקבל את מפת הגוגל
    // אם קיימת מפה ויש נקודה שנבחרה
    console.log(selectedOption, "llll")
    if (selectedOption != null) {
      // if (typeof selectedOption === 'object') {
      console.log(selectedOption)
      map.panTo({ lat: selectedOption.lat, lng: selectedOption.lng }); // מעביר את המפה לנקודה שנבחרה
      map.setZoom(18);
    }
  };

  // כאשר משתנה הנקודה הנבחרת ב־Select משתנה, עדכן את הזום
  const SETselectedValueOption = (selectedOption) => {
    console.log(selectedOption);
    const c = filteredOptions.find(x => x.id == selectedOption)
    console.log(c);
    SETselectedOption(c)

  }

  const SETselectedOption = (selectedOption) => {
    console.log('useEFFECT', selectedOption, typeof selectedOption)
    setSelectedOption(selectedOption);
    console.log(selectedOption)
    console.log(selectedOption, "selected")
    dispatch({ type: type.CURRENT_STATION, payload: selectedOption })
    zoomToSelectedPoint();
  }


  return (<>
    <br />
    <div id="map"></div>
    <Card id="searchCard" style={{ width: searchCardWidth, boxShadow: "none" }}>
      <p style={{ fontWeight: "bold", fontSize: "19px" }}>חיפוש תחנה</p>

      <input
        id='search'
        type="text"
        placeholder="חיפוש..."
        value={searchText}
        onChange={handleSearch}
      /><br></br><br></br>


      <select id='selectS' onClick={({ target }) => SETselectedValueOption(target.value)}>
        {filteredOptions.map(marker => <option value={marker.id} >{marker.name} {marker.location} / {marker.cun} </option>)}
      </select><br></br><br></br>


      <p style={{ fontWeight: "bold", fontSize: "19px" }}> הכי קרובות אלי</p>
      <div style={{ display: "flex", textAlign: "center", lineHeight: "30px" }}>
        {stationsMostClosde.map(marker => <Card onClick={() => SETselectedOption(marker)} id="cardStation" style={{
          borderRadius: "3px", height: "25%",
          width: "35%", marginLeft: "5px", direction: "rtl", fontSize: "15px"
        }} selected={selectedOption == marker} value={marker}>
          {marker.name} {marker.location} <br></br>  <PedalBikeIcon style={{ fontSize: '20px', verticalAlign: 'text-top', color: "#602424" }} />  {marker.cun + " "}</Card>)}
      </div>
      {/* <input type='text' value="ooooooo" /> */}
      <br></br>
    </Card>
    <br />
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onClick={(e) => console.log(e.latLng.lat(), e.latLng.lng())}
      onLoad={(map) => (mapRef.current = map)} // שימור מפה ב־ref
    >

      {
        mapers.map((marker) =>
          <AnyReactComponent
            key={marker.id ? marker.id : 0}
            selectedPoint={() => setSlectedPoint(marker)}
            onClick={() => OpenMe(marker)}
            text={marker}

            title={`${marker.name} (${marker.cun})`}
            lat={marker.lat}
            lng={marker.lng} />
        )
      }

      <></>


    </GoogleMap>

  </>)

}

export default React.memo(MyComponent)