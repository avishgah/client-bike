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

import { TableSortLabel } from '@mui/material';
import './Manager.css';
import { Button, IconButton, Switch, Tooltip } from '@mui/material';
import AddBike from '../AddBike/AddBike';
import XL from '../export to xl/XL';
export default function AccessibleTable() {


  let filteredOptions = [];

  const [listBike, setlistBike] = useState([]);
  const [sortOrder, setsortOrder] = useState('desc');


  const [inputValue, setInputValue] = useState('')
  const [fromDate, setfromDate] = useState('')
  const [toDate, settoDate] = useState('')

  const data = ["id", "code", "battery", "location", "name", "dateStart", "status"];
  const dataNmae = ["קוד אופניים", "מזהה יפה", "בטריה", "עיר", "מיקום", "תאריך תחילת שימוש", "סטטוס"]
  const [placeProblem, setplaceProblem] = useState('הכל')
  const PlaceArr = ['הכל', 'אופניים פעילים', 'אופניים לא פעילים'];


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
          axios.get('https://localhost:7207/api/StationBikeView')
            .then(res => {
              console.log(res.data)
              setlistBike(res.data)
              // nav('/NavB')
            }).catch(err => console.log(err))

        }).catch(err => console.log(err))
      })

    }
    else {
      console.log("exit")
    }

  }

  const handleFilter = () => {
    console.log("enter");

    filteredOptions = placeProblem != 'הכל' ? listBike.filter((option) => placeProblem == 'אופניים לא פעילים' ? !option.status : option.status) : listBike;


    filteredOptions = filteredOptions.filter(x => {
      // Convert string dates to Date objects for comparison
      const startDate = new Date(x.dateStart);
      const fromDateObj = fromDate ? new Date(fromDate) : null;
      const toDateObj = toDate ? new Date(toDate) : null;

      const isFromDateValid = !fromDateObj || startDate >= fromDateObj;
      const isToDateValid = !toDateObj || startDate <= toDateObj;

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
    return filteredOptions;
  };

  useEffect(() => {
    axios.get('https://localhost:7207/api/StationBikeView')
      .then(res => {
        console.log(res.data)
        setlistBike(res.data)
        // nav('/NavB')
      }).catch(err => console.log(err))
  }, [])


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

    setsortOrder(sortOrder == 'asc' ? 'desc' : 'asc'); // Toggle the sortOrder for the next reversal
    console.log(sortOrder)
    setlistBike(sortedList);
  }



  function formatDateTime(dateTimeString) {
    const dateStart = new Date(dateTimeString); // המשתנה כאן יכול להיות המשתנה שלך props.dateStart

    const day = dateStart.getDate();
    const month = dateStart.getMonth() + 1; // החודשים מתחילים מ־0, לכן נוסיף 1
    const year = dateStart.getFullYear();
    const hours = dateStart.getHours();
    const minutes = dateStart.getMinutes();
    const seconds = dateStart.getSeconds();

    const formattedDatex = `${day}.${month}.${year}, ${hours}:${minutes}:${seconds}`;
    return formattedDatex;

  }


  return (<div class="flex-container">
    <div class="flex-item-left" style={{ direction: "rtl" }}>

      <select id='selectListOpinion' style={{ padding: "5.3px" }}
        onChange={({ target }) => (setplaceProblem(target.value))}>
        {PlaceArr.map(marker => <option selected={placeProblem == marker} value={marker}>{marker}</option>)}
      </select>

      <input className='input-dates' style={{ height: "30px" }} placeholder="חיפוש חופשי..." value={inputValue} onChange={({ target }) => setInputValue(target.value)} />
      <label className='p-dates'>מ:  </label>
      <input className='input-dates' type='date' value={fromDate} onChange={({ target }) => setfromDate(target.value)} />
      <label className='p-dates'> עד:   </label>
      <input className='input-dates' type='date' value={toDate} onChange={({ target }) => settoDate(target.value)} />
      <label className='p-dates'> </label>
      <XL data={data} dataName={dataNmae} arr={handleFilter()} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 100 }} aria-label="caption table">
          <caption>end list of bikes</caption>
          <TableHead>
            <TableRow>

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
              handleFilter()
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell align="right">{row.code}</TableCell>
                    <TableCell align="right">{row.battery}</TableCell>
                    <TableCell align="right">{row.location}</TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right" sx={{ direction: "ltr" }}>{formatDateTime(row.dateStart)}</TableCell>
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
