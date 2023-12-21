import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as type from "../../store/actions/actionType";


import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ExitToApp } from "@mui/icons-material";
import { useState } from "react";

const History = () => {

    const [listHistory, setlistHistory] = useState([]);
    const [listDate, setlistCalcDate] = useState([]);

    useEffect(() => {
        axios.get(`https://localhost:7207/api/orderBike/HistoryDrive/${currentUser.tz}`)
            .then(res => {

                console.log(res.data);
                let list = res.data;
                setlistHistory(res.data);
                // nav('/NavB')
            }).catch(err => console.log(err))

        axios.get(`https://localhost:7207/api/orderBike/GetListDateOfUse/${currentUser.tz}`)
            .then(res => {

                console.log(res.data);
                setlistCalcDate(res.data);
                // nav('/NavB')
            }).catch(err => console.log(err))

    }, [])

    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.ur.user);

    return (<>
        {listHistory.length == 0 ? <h1>אין היסטוריה </h1> : <>
            <TableContainer component={Paper} sx={{ width: "60vw", marginLeft: "20vw", marginTop: "1vw", boxShadow: "none" }}>
                <Table id="table" aria-label="caption table" sx={{ direction: "rtl" }}>
                    <caption>היסטורית נסיעות</caption>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right"><b>  תאריך התחלה</b></TableCell>
                            <TableCell align="right"><b>תאריך סיום</b></TableCell>
                            <TableCell align="right"><b>משך זמן</b></TableCell>
                            <TableCell align="right"><b>עלות</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>


                        {listHistory.map((row, index) => (
                            <TableRow>
                                <TableCell align="right">{row.dateStart}</TableCell>
                                <TableCell align="right">{row.dateEnd}</TableCell>
                                <TableCell align="right">{listDate[index]}</TableCell>
                                <TableCell align="right">{" ₪ " + row.sum}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

           </>}
    </>
    )
}

export default History;