import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close'

import './Manager.css';
import { Button, IconButton, Switch, Tooltip } from '@mui/material';
import AddBike from '../AddBike/AddBike';
export default function AccessibleTable() {

  const [checked, setChecked] = React.useState([true, false]);

  const handleChange1 = (event) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event) => {
    setChecked([checked[0], event.target.checked]);
  };

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <FormControlLabel
        label="Child 1"
        control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
      />
      <FormControlLabel
        label="Child 2"
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
      />
    </Box>
  );


  const change = (id, status) => {
    console.log(id)

    if (window.confirm("האם אתה בטוח שברצונך לשנות את סטטוס האופניים ")) {

      console.log(id);
      var u = null;
      axios.get(`https://localhost:7207/api/Bike/${id}`).then(res => {
        console.log(res.data)
        u = res.data;
        console.log(u)

        const bike =
        {
          "code": u.code,
          "battery": u.battery,
          "idStation": u.idStation,
          "dateStart": u.dateStart,
          "status": !status
        }

        console.log(bike)

        axios.put(`https://localhost:7207/api/Bike/${id}`, bike).then(res => {
          console.log("kk");
        })
        window.location.reload(true);

      }).catch(err => console.log(err))
    }
    else {
      console.log("exit")
    }

  }


  const [listBike, setlistBike] = useState([]);


  useEffect(() => {
    axios.get('https://localhost:7207/api/Bike')
      .then(res => {
        console.log(res.data)
        setlistBike(res.data)
        // nav('/NavB')
      }).catch(err => console.log(err))
  }, [])
  const deleteFunc = (id) => {
    console.log(id)
  }

  const updates = (id) => {
    console.log(id)
  }
  function myFunction() {
    var txt;
    if (window.confirm("האם אתה בטוח שברצונך למחוק")) {

      // axios.delete(`https://localhost:7207/api/Bike/${id}`).then(res => {
      alert("נמחק בהצלחה")
      window.location.reload(true);
      // })
      console.log("deleted")
    }
    else {
      console.log("exit")
    }
  }
  return (<div class="flex-container">
    <div class="flex-item-left">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 100 }} aria-label="caption table">
          <caption>end list of bikes</caption>
          <TableHead>
            <TableRow>

              <TableCell><b></b></TableCell>
              <TableCell ><b>קוד</b></TableCell>
              <TableCell align="right"><b>מזהה</b></TableCell>
              <TableCell align="right"><b>בטריה</b></TableCell>
              <TableCell align="right"><b>קוד</b> </TableCell>
              <TableCell align="right"><b>תאריך תחילת שימוש</b></TableCell>
              <TableCell align="center"><b>סטטוס</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>


            {listBike.map((row) => (
              <TableRow key={row.id}>
                {/* <DeleteOutlineIcon id="icon2"/> */}

                <TableCell>
                  {/* <Tooltip title="מחק" placement="left-end">
                  <DeleteIcon id="icon" onClick={() => myFunction(row.id)} />
                </Tooltip> */}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.code}</TableCell>
                <TableCell align="right">{row.battery}</TableCell>
                <TableCell align="right">{row.idStation}</TableCell>
                <TableCell align="right">{row.dateStart}</TableCell>
                <TableCell align="center">
                  {row.status == true ?
                    <Tooltip title="פעיל" placement="left-end">
                      <Switch
                        checked={row.status}
                        onChange={() => change(row.id, row.status)}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </Tooltip> : <Tooltip title="לא פעיל" placement="left-end">
                      <Switch
                        checked={row.status}
                        onChange={() => change(row.id, row.status)}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </Tooltip>}


                </TableCell>
                {/* <Button variant="contained" endIcon={<SendIcon />} id="addRC" type="submit">
                        
                    </Button>
              <IconButton >{DeleteIcon}</IconButton> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </TableContainer>
    </div>
    <div class="flex-item-right">
      <br></br>
      <b>  הוסף אופניים </b><br></br><br></br>

      <AddBike />


    </div>
  </div>);
}
