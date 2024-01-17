import * as React from 'react';

import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

import './Manager.css';

import CardOpinion from './CardOpinion';
import XL from '../export to xl/XL';

export default function AccessibleTable() {

    const [listOpinion, setlistOpinion] = useState([]);
    const [fromDate, setfromDate] = useState('');
    const [toDate, settoDate] = useState('');
    const PlaceArr = ['הכל', 'תקלה באופניים', 'תקלה בתחנה'];
    const [placeProblem, setplaceProblem] = useState('הכל')
    let filteredOptions = [];
    const data = ["id", "place", "idBike", "idStation", "typeProblem", "date", "idCust"];
    const dataNmae = ["קוד תקלה", "מקום", "קוד אופניים", "קוד תחנה", "סוג הבעיה", "תאריך תקלה", "קוד לקוח"];

    useEffect(() => {
        axios.get('https://localhost:7207/api/Opinion')
            .then(res => {
                console.log(res.data)
                setlistOpinion(res.data)

                // nav('/NavB')
            }).catch(err => console.log(err))
    }, [])

    const handleFilter = () => {
        console.log("enter");

        filteredOptions = placeProblem != 'הכל' ? listOpinion.filter((option) => option.place?.toLowerCase().includes(placeProblem?.toLowerCase())) : listOpinion;

        filteredOptions = filteredOptions.filter(x => {
            // Convert string dates to Date objects for comparison
            const startDate = new Date(x.date);
            const fromDateObj = fromDate ? new Date(fromDate) : null;
            const toDateObj = toDate ? new Date(toDate) : null;
            // Check if the date is within the specified range or empty dates
            const isFromDateValid = !fromDateObj || startDate >= fromDateObj;
            const isToDateValid = !toDateObj || startDate <= toDateObj;

            console.log(isToDateValid);
            console.log(isFromDateValid);
            // Rest of your conditions
            return (
                (isFromDateValid && isToDateValid)
            );
        });

        return filteredOptions;
    };

    const deleteItem = (item) => {
        const copy = listOpinion.filter(x => x.id != item.id);
        setlistOpinion(copy);
    }


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
            {handleFilter().map(item => { return <CardOpinion deleteIt={deleteItem} props={item} place={item.place} listOpinion={filteredOptions} /> })}
        </div>
    </>);
}
