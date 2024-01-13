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
import { TableSortLabel } from '@mui/material';
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
  const [sortOrder, setsortOrder] = useState('asc');
  const handleFilter = () => {
    console.log("enter");

    return listBike.filter(x => {
      // Convert string dates to Date objects for comparison
      const startDate = new Date(x.dateStart);
      const fromDateObj = fromDate ? new Date(fromDate) : null;
      const toDateObj = toDate ? new Date(toDate) : null;
      // console.log(startDate, "start");
      // console.log(fromDateObj, "מ");
      // console.log(toDateObj, "ל");

      // !fromDate || x.dateStart > fromDate
      // ) && (!toDate || x.dateStart < toDate)
      // Check if the date is within the specified range or empty dates
      const isFromDateValid = !fromDateObj || startDate > fromDateObj;
      const isToDateValid = !toDateObj || startDate < toDateObj;

      // console.log(isToDateValid);
      // console.log(isFromDateValid);
      // Rest of your conditions
      return (

        (isFromDateValid && isToDateValid)
        &&
        ((!inputValue) ||
          x.battery?.toString().includes(inputValue) ||
          x.dateStart?.toString().includes(inputValue) ||
          x.location?.toString().includes(inputValue) ||
          x.name?.toString().includes(inputValue) ||
          x.status?.toString().includes(inputValue))
      );
    });
  };

  useEffect(() => {
    axios.get('https://localhost:7207/api/StationBikeView')
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
  const createSortHandler = (key) => {
    const listCopy = [...listBike];
    listCopy.sort((a, b) => a[key] > b[key] ? 1 : -1)
    setlistBike(listCopy);
  }

  const createSortHandlerForStatus = (key) => {
    const sortedList = [...listBike]; // Create a copy of the original list
    sortedList.sort((a, b) => {
      if (sortOrder == 'asc') {
        console.log("jj")
        return b[key] - a[key];

      } else {
        console.log("jk")
        return a[key] - b[key];

      }
    });

    console.log(sortOrder)

    // if (sortOrder == 'asc')
    //   sortOrder = 'desc'
    // else
    //   sortOrder = 'asc'

    setsortOrder(sortOrder == 'asc' ? 'desc' : 'asc'); // Toggle the sortOrder for the next reversal
    console.log(sortOrder)
    setlistBike(sortedList);

    // return sortedList;

    // Check if the first item in the list has the same value for the 'status' key
    // const isSorted = listCopy.every((item, index) => index === 0 || item[key] === listCopy[index - 1][key]);

    // If all values are the same, reverse the list to toggle the sorting order
    // if (isSorted) {
    // listCopy.reverse();
    // }

  }

  const [inputValue, setInputValue] = useState('')
  const [fromDate, setfromDate] = useState('')
  const [toDate, settoDate] = useState('')
  return (<div class="flex-container">
    <div class="flex-item-left" style={{ direction: "rtl" }}>
      <label className='p-dates'>מ:  </label>
      <input  className='input-dates' type='date' value={fromDate} onChange={({ target }) => setfromDate(target.value)} />
      <label className='p-dates'> עד:   </label>
      <input  className='input-dates' type='date' value={toDate} onChange={({ target }) => settoDate(target.value)} />
      <label className='p-dates'> </label>
      <input  className='input-dates' style={{height:"30px"}} placeholder="חיפוש חופשי..." value={inputValue} onChange={({ target }) => setInputValue(target.value)} /><br></br>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 100 }} aria-label="caption table">
          <caption>end list of bikes</caption>
          <TableHead>
            <TableRow>

              <TableCell><b></b></TableCell>
              <TableCell align="right">

                <TableSortLabel

                  onClick={() => createSortHandler('code')}
                >
                  <b>מזהה</b>


                </TableSortLabel>
                <TableSortLabel
                  direction={'asc'}
                  onClick={() => createSortHandler('code')}
                ></TableSortLabel>
              </TableCell>
              <TableCell align="right"><b>בטריה</b></TableCell>
              <TableCell align="right">

                <TableSortLabel

                  onClick={() => createSortHandler('location')}
                >
                  <b>עיר</b>
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">

                <TableSortLabel

                  onClick={() => createSortHandler('name')}
                >
                  <b>מיקום</b>
                </TableSortLabel>
              </TableCell>
              <TableCell align="right"><b>תאריך תחילת שימוש</b></TableCell>
              <TableCell align="center">

                <TableSortLabel

                  onClick={() => createSortHandlerForStatus('status')}
                >
                  <b>סטטוס</b>

                </TableSortLabel>

              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>


            {
              // listBike.filter(x => !inputValue ||
              // (

              //   !fromDate || x.dateStart > fromDate
              // ) && (!toDate || x.dateStart < toDate) ||
              // x.battery?.toString().includes(inputValue) ||
              // x.dateStart?.toString().includes(inputValue) ||
              // x.status?.toString().includes(inputValue))
              handleFilter()
                .map((row) => (
                  <TableRow key={row.id}>
                    {/* <DeleteOutlineIcon id="icon2"/> */}

                    <TableCell>
                      {/* <Tooltip title="מחק" placement="left-end">
                  <DeleteIcon id="icon" onClick={() => myFunction(row.id)} />
                </Tooltip> */}
                    </TableCell>

                    <TableCell align="right">{row.code}</TableCell>
                    <TableCell align="right">{row.battery}</TableCell>
                    <TableCell align="right">{row.location}</TableCell>
                    <TableCell align="right">{row.name}</TableCell>
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
