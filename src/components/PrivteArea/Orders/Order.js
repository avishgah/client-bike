import React from 'react'
import { Box, Button, Card, DialogTitle, Fade, IconButton, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';

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
import Maps from '../../Maps/Maps';
import PedalBikeIcon from '@mui/icons-material/PedalBike';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


function MyComponent() {
  const [count, setCount] = React.useState(1);
  const [open, setOpen] = React.useState(false);

  const currentUser = useSelector(state => state.ur.user);
  const station = useSelector(state => state.ur.station);

  const handleClickOpen = () => {
    setCount(1);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios.get('https://localhost:7207/api/Station/Get')
      .then(res => {
        console.log(res)
      }).catch(err => console.log(err))

  }, [])



  const Submit = (e) => {
    e.preventDefault()
    console.log(count)

    console.log(station, "tst")
    if (station != null) {
      const IsPay = false;
      axios.post(`https://localhost:7207/api/Order`, { count, IsPay, id: 0, datePay: null, IdCust: currentUser.id, idStation: station.id, dateOrder: new Date(), code: "web" }).then(res => {
        console.log(res)
        console.log(res.data)
        handleClickOpen();
      })

      var x = `שלום, ${currentUser.name} \n ביצעת הזמנה לתחנת - ${station.location + " " + station.name}\n \t, מספר האופניים ששמורים לך הם : ${count} , שים לב ❤ ההזמנה שמורה ל30 דקות בלבד! \n נסיעה בטוחה ומהנה 😊`
      console.log("kkk")
      var y = ",";
      axios.post(`https://localhost:7207/api/User/SendEmailOnly/${currentUser.mail}/${currentUser.name}/${x}/${y}`).then(res => {
        console.log("giid")
      }).catch(err => console.log(err))
    }
    else {
      alert("לא נמצאה הזמנה")
    }
  }


  return (<>
    <form id="formLoginRG" style={{ direction: "rtl" }} onSubmit={Submit}>

      <div id="hazen" style={{ textAlign: "center", fontWeight: "bold" }}>הזן מספר אפניים ותחנה רצויה</div><br></br>
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
                if (station == null) {
                  alert("לא נבחרה תחנה,")
                } else {
                  if (station.cun < count + 1) {
                    alert("מצטערים ! אין לנו את כמות האופניים בתחנה זו, אנא נסה בתחנות נוספות");
                  } else {
                    setCount(count + 1);
                  }
                }

              }}
            >
              <AddIcon fontSize="small" />
            </Button>
          </ButtonGroup>
        </div>

      </Box>


      <br></br>

      {/* תחנה */}
      <Maps />
      {/* <br></br>
      <br></br> */}
      {
        station != null ? <>
          <p id="h8"><b>סיכום הזמנה</b></p>
          {/* <br></br><br></br> */}
          <Card style={{ direction: "rtl", border: "3px dashed", lineHeight: "4ch" }}>

            <b> הזמנה לתחנת :</b> {station.name + ", " + station.location}<br></br>
            <b> מספר אופניים : </b> {count}  <PedalBikeIcon style={{ fontSize: '20px', verticalAlign: 'text-top', color: "#602424" }} />
          </Card></> : <p>לא נמצאה הזמנה</p>
      }
      <br></br>
      <br></br>

      <Button variant="contained" style={{ width: "21vw" }} startIcon={<SendIcon style={{ marginLeft: "20px" }} />} id="addR" type="submit">
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