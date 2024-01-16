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
import SendIcon from '@mui/icons-material/Send';
import './Manager.css';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import { Button, IconButton, TableSortLabel, Tooltip } from '@mui/material';
import { Switch, switchClasses } from '@mui/joy';
import AddStation from '../AddStation/AddStation';
import XL from '../export to xl/XL';

export default function AccessibleTable() {

    const change = (id, status) => {
        console.log(id)

        if (window.confirm("האם אתה בטוח שברצונך לשנות את סטטוס התחנה ")) {

            console.log(id);
            var u = null;
            axios.get(`https://localhost:7207/api/Station/${id}`).then(res => {
                console.log(res.data)
                u = res.data;
                console.log(u)

                const station =
                {
                    "location": u.location,
                    "name": u.name,
                    "status": !status,
                    "lat": u.lat,
                    "lng": u.lng

                }

                console.log(station)
                axios.put(`https://localhost:7207/api/Station/${id}`, station).then(res => {
                    console.log("kk");
                })
                axios.get('https://localhost:7207/api/StationViewControllers')
                .then(res => {
                    console.log(res.data)
                    setlistStation(res.data)
                    // nav('/NavB')
                }).catch(err => console.log(err))
            }).catch(err => console.log(err))
        }
        else {
            console.log("exit")
        }

    }



    const [sortOrder, setsortOrder] = useState('desc');


    useEffect(() => {
        axios.get('https://localhost:7207/api/StationViewControllers')
            .then(res => {
                console.log(res.data)
                setlistStation(res.data)
                // nav('/NavB')
            }).catch(err => console.log(err))
    }, [])
  
    const [listStation, setlistStation] = useState([]);
    const createSortHandler = (key) => {
        const listCopy = [...listStation];

        // Toggle between 'asc' and 'desc'
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';

        listCopy.sort((a, b) => {
            if (newSortOrder === 'asc') {
                return a[key].toString().localeCompare(b[key].toString());
            } else {
                return b[key].toString().localeCompare(a[key].toString());
            }
        });

        setlistStation(listCopy);
        setsortOrder(newSortOrder);
    }
    const createSortHandlerForNumBike = (key) => {
        const listCopy = [...listStation];
        // Toggle between 'asc' and 'desc'
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        if (sortOrder == 'asc') {
            listCopy.sort((a, b) => a[key] > b[key] ? 1 : -1)

        }
        else {
            listCopy.sort((a, b) => a[key] < b[key] ? 1 : -1)

        }
        setlistStation(listCopy);
        setsortOrder(newSortOrder);
    }
    const createSortHandlerForStatus = (key) => {
        const sortedList = [...listStation]; // Create a copy of the original list
        console.log(sortOrder);
        sortedList.sort((a, b) => {
            if (sortOrder == 'asc') {
                console.log("jj")
                return b[key] - a[key];

            } else {
                console.log("jk")
                return a[key] - b[key];

            }
        });
        console.log(sortedList);

    }
    let filteredOptions = [];

    const handleFilter = () => {
        console.log("enter");
        filteredOptions = placeProblem != 'הכל' ? listStation.filter((option) => placeProblem=='תחנות לא פעילות'? !option.status : option.status): listStation;

        filteredOptions= filteredOptions.filter(x => {

            return (
                (x.numOrders >= numberValue) &&
                ((!inputValue) ||
                    x.location?.toString().includes(inputValue) ||
                    x.name?.toString().includes(inputValue) ||
                    x.status?.toString().includes(inputValue))
            );
        });
        return filteredOptions;
    };
    const [inputValue, setInputValue] = useState('')
    const [numberValue, setnumberValue] = useState(0)
    const PlaceArr = ['הכל','תחנות פעילות','תחנות לא פעילות'];
    const [placeProblem, setplaceProblem] = useState('הכל')
    const data = ["id", "location", "name", "status", "cun", "numOrders"];
    const dataNmae = ["קוד תחנה", "עיר", "מיקום", "סטטוס", "מספר אופניים בתחנה", "מספר הזמנות בתחנה"]
    return (
        <div class="flex-container">
            <div class="flex-item-left">
                {console.log(listStation, "ךןדאאאאאאאאאאאא")}
                
                <select id='selectListOpinion' style={{padding:"5.3px"}}
                    onChange={({ target }) => (setplaceProblem(target.value))}>
                    {PlaceArr.map(marker => <option selected={placeProblem == marker} value={marker}>{marker}</option>)}
                </select>

                <label className='p-dates'>כמות הזמנות:  </label>
                <input className='input-dates' type='number' style={{ height: "30px" }} placeholder="הכנס מספר..." value={numberValue} onChange={({ target }) => setnumberValue(target.value)} />
                <input className='input-dates' style={{ height: "30px" }} placeholder="חיפוש חופשי..." value={inputValue} onChange={({ target }) => setInputValue(target.value)} />
                <XL data={data} dataName={dataNmae} arr={handleFilter()} />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 100 }} aria-label="caption table">
                        <caption>A basic table example with a caption</caption>
                        <TableHead>
                            <TableRow>

                                {/* <TableCell><b></b></TableCell> */}
                                <TableCell align="center">

                                    <TableSortLabel

                                        onClick={() => createSortHandler('location')}
                                    >
                                        <b>עיר</b>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="center">


                                    <TableSortLabel

                                        onClick={() => createSortHandler('name')}
                                    >
                                        <b>מיקום</b>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="center">
                                    <TableSortLabel

                                        onClick={() => createSortHandlerForStatus('status')}
                                    >
                                        <b>סטטוס</b>

                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="center">

                                    <TableSortLabel

                                        onClick={() => createSortHandlerForNumBike('cun')}
                                    >
                                        <b>מספר אופניים בתחנה</b>
                                    </TableSortLabel>

                                </TableCell>
                                <TableCell align="center">

                                    <TableSortLabel

                                        onClick={() => createSortHandlerForNumBike('numOrders')}
                                    >
                                        <b>מספר הזמנות בתחנה</b>
                                    </TableSortLabel>

                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>


                            {handleFilter().map((row) => (
                                <>

                                    <TableRow key={row.id}>

                                        <TableCell align="center">{row.location}</TableCell>
                                        <TableCell align="center">{row.name}</TableCell>
                                        <TableCell align="center">
                                            {row.status == true ?
                                                <Tooltip title="פעילה" placement="left-end">
                                                    <Switch
                                                        checked={row.status}
                                                        onChange={() => change(row.id, row.status)}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                </Tooltip> : <Tooltip title="לא פעילה" placement="left-end">
                                                    <Switch
                                                        checked={row.status}
                                                        onChange={() => change(row.id, row.status)}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                </Tooltip>}


                                        </TableCell>
                                        <TableCell align="center">{row.cun != null ? row.cun : 0}</TableCell>
                                        <TableCell align="center">{row.numOrders != null ? row.numOrders : 0}</TableCell>
                                    </TableRow>
                                </>))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div class="flex-item-right">
                <br></br>
                <b>  הוסף תחנה </b><br></br><br></br>

                <AddStation /><br></br>



            </div>
        </div>
    );
}
