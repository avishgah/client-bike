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

import { Button, IconButton, Tooltip } from '@mui/material';
import { Switch, switchClasses } from '@mui/joy';
import AddStation from '../AddStation/AddStation';

export default function AccessibleTable() {

    const change = (id, status) => {
        console.log(id)

        if (window.confirm("האם אתה בטוח שברצונך לשנות את סטטוס המשתמש ")) {

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
                window.location.reload(true);

            }).catch(err => console.log(err))
        }
        else {
            console.log("exit")
        }

    }

    const [listStation, setlistStation] = useState([]);

    const [checked, setChecked] = React.useState(false);

    useEffect(() => {
        axios.get('https://localhost:7207/api/Station')
            .then(res => {
                console.log(res.data)
                setlistStation(res.data)
                // nav('/NavB')
            }).catch(err => console.log(err))
    }, [])
    const deleteFunc = (id) => {
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
    return (
        <div class="flex-container">
            <div class="flex-item-left">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 100 }} aria-label="caption table">
                        <caption>A basic table example with a caption</caption>
                        <TableHead>
                            <TableRow>

                                {/* <TableCell><b></b></TableCell> */}
                                <TableCell ><b>קוד</b></TableCell>
                                <TableCell align="center"><b>עיר</b></TableCell>
                                <TableCell align="center"><b>שם תחנה</b></TableCell>
                                <TableCell align="center"><b>סטטוס</b></TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>


                            {listStation.map((row) => (
                                <TableRow key={row.id}>
                                    {/* <DeleteOutlineIcon id="icon2"/> */}
                                    {/* 
                            <TableCell>
                                <Tooltip title="מחק" placement="left-end">
                                    <DeleteIcon id="icon" onClick={() => myFunction(row.id)} />
                                </Tooltip>
                            </TableCell> */}

                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>

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
                <b>  הוסף תחנה </b><br></br><br></br>

                <AddStation />


            </div>
        </div>
    );
}
