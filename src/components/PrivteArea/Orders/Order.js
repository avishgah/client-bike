import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Box, Button, DialogTitle, Fade, IconButton, Paper, Popper, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './Order.css';

// count
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import SendIcon from '@mui/icons-material/Send';

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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));



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
  const [count, setCount] = React.useState(0);
  const [open, setOpen] = React.useState(false);




  const [selectPoin, setSlectedPoint] = useState(null)
  const [mapers, setMapers] = React.useState([])


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    // nav('/Home');
  };

  useEffect(() => {
    axios.get('https://localhost:7207/api/Station/Get')
      .then(res => {
        console.log(res)
        console.log(selectPoin)
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

  const currentUser = useSelector(state => state.ur.user);

  const Submit = (e) => {
    e.preventDefault()
    console.log(selectPoin)
    console.log(count, selectPoin)


    const order = {
      "id": 0,
      "datePay": null,
      "idStation": selectPoin,
      "dateOrder": Date.now(),
      "code": "string",
      "idCust": 15,
      "endSum": 0,
      "isPay": false,
      "custName": "string",
      "count": count
    }
    //send empty
    const IsPay = false;
    axios.post(`https://localhost:7207/api/Order`, { count, IsPay, id: 0, datePay: null, IdCust: currentUser.id, idStation: selectPoin, dateOrder: new Date() }).then(res => {
      console.log(res)
      console.log(res.data)
    })

    handleClickOpen();

  }


  return (<>
    <br />

    <form id="formLoginRG" style={{ direction: "rtl" }} onSubmit={Submit}>
      <h8 id="h8"><b>הזמנה מראש</b></h8>
      <br></br><br></br>
      <div id="hazen" style={{textAlign:"center"}}>הזן מספר אפניים ותחנה רצויה</div><br></br>
      {/* count */}
      <Box style={{ direction: "center", marginRight: "0vw" }}>
        <div>
          <ButtonGroup>
            <Button
              style={{ borderInlineStartColor: "#1976d2" }}

              aria-label="reduce"
              onClick={() => {
                setCount(Math.max(count - 1, 0));
              }}
            >
              <RemoveIcon fontSize="small" />
            </Button>

            <div id="p2" >{count}</div>

            <Button
              aria-label="increase"
              onClick={() => {
                setCount(count + 1);
              }}
            >
              <AddIcon fontSize="small" />
            </Button>
          </ButtonGroup>
        </div>

      </Box>


      <br></br>
      <select id="selected"
        onChange={({ target }) => setSlectedPoint(target.value)}>
        {mapers.map(marker => <option selected={selectPoin === marker.id} value={marker.id}>{marker.name} {marker.location}</option>)}
      </select>
      <br></br>
      <br></br>

      <Button variant="contained" style={{width: "21vw"}} startIcon={<SendIcon style={{ marginLeft: "20px" }} />} id="addR" type="submit">
        הזמן
      </Button>



      <br></br>
      <br></br>
    </form>
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
                Open dialog
            </Button> */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        style={{ direction: "rtl" }}
      >
        <DialogTitle sx={{ m: 0, p: 2, color: "rgb(26, 87, 53)" }} id="customized-dialog-title">
          ההזמנה בוצעה בהצלחה
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            // right:0,
            left: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            שים לב,
          </Typography>
          <Typography gutterBottom>
            .האופניים נשמרות למשך 30 דקות בלבד ! אנא התארגן בהתאם
          </Typography>
          <Typography gutterBottom>
            תודה שבחרת להשתמש ברשת פדאל.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            סגור
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
    <br />

  </>)

}

export default React.memo(MyComponent)