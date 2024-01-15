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

import * as XLSX from 'xlsx';

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
import CardOpinion from './CardOpinion';
import XL from '../export to xl/XL';

import * as type from "../../store/actions/actionType";
import { useDispatch } from 'react-redux';

export default function AccessibleTable() {



    const [listOpinion, setlistOpinion] = useState([]);
    const [fromDate, setfromDate] = useState('');
    const [toDate, settoDate] = useState('');
    const PlaceArr = ['הכל', 'תקלה באופניים', 'תקלה בתחנה'];
    const [placeProblem, setplaceProblem] = useState('הכל')
    const [checked, setChecked] = React.useState(false);
    const dispatch = useDispatch();

    const data = ["id", "place", "idBike", "idStation", "typeProblem", "date", "idCust"];
    const dataNmae = ["קוד תקלה", "מקום", "קוד אופניים", "קוד תחנה", "סוג הבעיה", "תאריך תקלה", "קוד לקוח"]
    useEffect(() => {
        axios.get('https://localhost:7207/api/Opinion')
            .then(res => {
                console.log(res.data)
                setlistOpinion(res.data)
                dispatch({
                    type: type.LIST_OPINION,
                    payload: res.data
                })
                // nav('/NavB')
            }).catch(err => console.log(err))
    }, [])


    let filteredOptions = [];
    

    const handleFilter = () => {
        console.log("enter");

        filteredOptions = placeProblem != 'הכל' ? listOpinion.filter((option) => option.place.toLowerCase().includes(placeProblem.toLowerCase())) : listOpinion;

        filteredOptions = filteredOptions.filter(x => {
            // Convert string dates to Date objects for comparison
            const startDate = new Date(x.date);
            const fromDateObj = fromDate ? new Date(fromDate) : null;
            const toDateObj = toDate ? new Date(toDate) : null;

            //   console.log(startDate, "start");
            //   console.log(fromDateObj, "מ");
            //   console.log(toDateObj, "ל");

            // !fromDate || x.dateStart > fromDate
            // ) && (!toDate || x.dateStart < toDate)
            // Check if the date is within the specified range or empty dates
            const isFromDateValid = !fromDateObj || startDate > fromDateObj;
            const isToDateValid = !toDateObj || startDate < toDateObj;

            console.log(isToDateValid);
            console.log(isFromDateValid);
            // Rest of your conditions
            return (
                (isFromDateValid && isToDateValid)
            );
        });
        dispatch({
            type: type.LIST_OPINION,
            payload: filteredOptions
        })
        return filteredOptions;
    };


    return (<>

        <div id="cardFlex2">

            <select id='selectListOpinion'
                onChange={({ target }) => (setplaceProblem(target.value))}>
                {PlaceArr.map(marker => <option selected={placeProblem == marker} value={marker}>{marker}</option>)}
            </select>

            <label className='p-dates'>מ:  </label>
            <input className='input-dates' type='date' value={fromDate} onChange={({ target }) => setfromDate(target.value)} />
            <label className='p-dates'> עד:   </label>
            <input className='input-dates' type='date' value={toDate} onChange={({ target }) => settoDate(target.value)} />
            <XL data={data} dataName={dataNmae} arr={handleFilter()} />

        </div>
        <div id="cardFlex">
            {handleFilter().map(item => { return <CardOpinion props={item} place={item.place} listOpinion={filteredOptions} /> })}
        </div>
    </>);
}
