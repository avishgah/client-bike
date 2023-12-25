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

import AddUser from '../AddUser/AddUser';
import RegisterAdd from './RegisterAdd';
export default function AccessibleTable() {


    const [listUsers, setlistUsers] = useState([]);


    const [checked, setChecked] = React.useState(false);

    // const [u, setuseru] = useState(null);
    const change = (id, status) => {

        if (window.confirm("האם אתה בטוח שברצונך לשנות את סטטוס המשתמש ")) {

            console.log(id);
            var u = null;
            axios.get(`https://localhost:7207/api/User/${id}`).then(res => {
                console.log(res.data)
                u = res.data;
                console.log(u)

                const user =
                {
                    "name": u.name,
                    "address": u.address,
                    "mail": u.mail,
                    "password": u.password,
                    "toun": u.toun,
                    "phon": u.phon,
                    "tz": u.tz,
                    "dateBirth": u.dateBirth,
                    "pic": u.pic,
                    "isManager": false,
                    "status": !status,
                    "readTerms": true
                }

                console.log(user)
                axios.put(`https://localhost:7207/api/User/${id}`, user).then(res => {
                    console.log("kk");
                })
                window.location.reload(true);

            }).catch(err => console.log(err))
        }
        else {
            console.log("exit")
        }

    }

    useEffect(() => {
        axios.get('https://localhost:7207/api/User')
            .then(res => {
                console.log(res.data)
                setlistUsers(res.data)
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
            <Table id="table" aria-label="caption table">
                <caption>End list of users</caption>
                <TableHead>
                    <TableRow>

                        {/* <TableCell><b></b></TableCell> */}
                        <TableCell ><b>קוד</b></TableCell>

                        <TableCell align="right"><b>    שם מלא</b></TableCell>
                        <TableCell align="right"><b>תעודת זהות</b></TableCell>
                        <TableCell align="right"><b>טלפון</b></TableCell>
                        <TableCell align="right"><b>מייל</b></TableCell>
                        <TableCell align="right"><b>סיסמא</b></TableCell>
                        <TableCell align="right"><b>עיר</b></TableCell>
                        <TableCell align="right"><b>כתובת</b></TableCell>
                        <TableCell align="right"><b>תאריך לידה</b></TableCell>
                        <TableCell align="right"><b> תצלום</b></TableCell>
                        <TableCell align="right"><b> סטטוס</b></TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>


                    {listUsers.map((row) => (
                        <TableRow key={row.id}>
                            {/* <DeleteOutlineIcon id="icon2"/> */}

                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>

                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{row.tz}</TableCell>
                            <TableCell align="right">{row.phon}</TableCell>
                            <TableCell align="right">{row.mail}</TableCell>
                            <TableCell align="right">{row.password}</TableCell>
                            <TableCell align="right">{row.toun}</TableCell>
                            <TableCell align="right">{row.addres}</TableCell>
                            <TableCell align="right">{row.dateBirth}</TableCell>
                            <TableCell align="right">{row.pic}</TableCell>
                            <TableCell align="left">
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
                <b>  הוסף משתמש </b><br></br><br></br>

                <RegisterAdd />


            </div>
        </div>
    );
}
