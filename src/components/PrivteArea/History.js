import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as type from "../../store/actions/actionType";

import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ExitToApp } from "@mui/icons-material";
import { useState } from "react";
import { DateTime } from "luxon";

const History = () => {

    const [listHistory, setlistHistory] = useState([]);
    const [listDate, setlistCalcDate] = useState([]);
    const currentUser = useSelector(state => state.ur.user);

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

    // תאריכים
    function formatDateTime(dateTimeString) {
        const dateTime = new Date(dateTimeString);

        if (isNaN(dateTime.getTime())) {
            return "Invalid DateTime";
        }

        const formattedDate = `${dateTime.getFullYear()}-${(dateTime.getMonth() + 1).toString().padStart(2, '0')}-${dateTime.getDate().toString().padStart(2, '0')}`;
        const formattedTime = `${dateTime.getHours().toString().padStart(2, '0')}:${dateTime.getMinutes().toString().padStart(2, '0')}:${dateTime.getSeconds().toString().padStart(2, '0')}`;

        return (
            <div>
                <div>{formattedTime}, {formattedDate}</div>
            </div>
        );
    }

    // חישוב זמן-הצגה
    function formatDate(dateString) {
        
        if(dateString){
            const timeParts = dateString.split(':');

            if (timeParts.length !== 3) {
                return "Invalid time format";
            }
    
            const fixedDate = new Date(1970, 0, 1, parseInt(timeParts[0]), parseInt(timeParts[1]), parseInt(timeParts[2]));
    
            const hours = fixedDate.getHours().toString().padStart(2, '0');
            const minutes = fixedDate.getMinutes().toString().padStart(2, '0');
            const seconds = fixedDate.getSeconds().toString().padStart(2, '0');
    
            return `${hours}:${minutes}:${seconds}`;
        }
      
    }


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
                                <TableCell align="right">{formatDateTime(row.dateStart)}</TableCell>
                                <TableCell align="right">{formatDateTime(row.dateEnd)}</TableCell>
                                <TableCell align="right">{formatDate(listDate[index])}</TableCell>
                                <TableCell align="right">{" ₪ " + row.sum.toFixed(2)}</TableCell>
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