import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Alert, Button } from '@mui/material';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import './AddBike.css'

import { useState } from "react";
import { useEffect } from 'react';




const AddBike = () => {

    const [searchText, setSearchText] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);

    const [stations, setStation] = useState([]);

    const filteredOptions = stations.filter((option) =>
    option.location?.toLowerCase().includes(searchText?.toLowerCase()) || option.name?.toLowerCase().includes(searchText?.toLowerCase()));

    const { register, reset, handleSubmit, getValues, formState: { isValid, errors, dirtyFields, touchedFields, isDirty } } = useForm({
        mode: "all"
    });

  
    useEffect(() => {
        axios.get('https://localhost:7207/api/Station/Get').then(res => {
            console.log(res.data)
            setStation(res.data);
            setSelectedOption(res.data[0].id)
        })
        reset({ bike: 1 });
    }, [])

    const restasrt = (x) => {
        if (x == 'end') {
            document.getElementById("addMore").style.display = "none";
            document.getElementById("end").style.display = "none";
        }
        setSearchText('');
        document.getElementById("alertCV").style.visibility = "hidden";
        reset({ bike: 1 });
    }


    const handleSearch = (e) => {
        console.log(e.target.value)
        setSearchText(e.target.value);
    };

    const submit = (details) => {
        console.log(selectedOption)
        const bike = {
            "id": 0,
            "Code": 0,
            "battery": 0,
            "idStation": selectedOption,
            "DateStart": new Date(),
            "status": true
        }
        console.log(details);
        axios.post(`https://localhost:7207/api/Bike/${details.bike}`, bike).then(res => {

            console.log(res.data);

            document.getElementById("addMore").style.display = "inline";
            document.getElementById("end").style.display = "inline";
            document.getElementById("alertCV").style.visibility = "visible";

            if (res.data == null) {
                alert("error")
                return null;
            }
        }).catch(console.log("err"))
    }

  
    return (<>
        <form id="formLoginRBike" onSubmit={handleSubmit(submit)}>
            <p id="smallP">הכנס מספר אופניים שברצונך להוסיף אליה</p>
            <TextField
                label="מספר אפנים "
                sx={{ backgroundColor: "white", textAlign: "right", direction: "rtl" }}
                type="number"
                id="demo-helper-text-aligned"
                {...register("bike", {})}
            />

            <p id="smallP">בחר תחנה שברצונך להוסיף אליה</p>

            <input
                id='searchAdd'
                type="text"
                placeholder="חיפוש..."
                value={searchText}
                onChange={handleSearch}

            /><br></br><br></br>


            <select id='selectAdd'  onClick={({ target }) => (setSelectedOption(target.value))}>
                {filteredOptions.map(marker => <option style={{height:"60px",padding:"10px"}} selected={selectedOption == marker} value={marker.id}>{marker.name} {marker.location}</option>)}
            </select>
            <br></br><br></br>


            {/* endIcon={<SendIcon />}  */}
            <Button type="button" id="addMore" onClick={() => (restasrt('add'))}>
                הוסף עוד אפנים
            </Button>
            <Button type="button" id="end" onClick={() => (restasrt('end'))}>
                סיום
            </Button>
            <br></br>

            <Button variant="contained" id="addRB" type="submit">
                הוסף
            </Button><br></br>

            <Alert id="alertCV" severity="success">! אופניים נוספו בהצלחה</Alert>

        </form>
        <br></br>

    </>)

}

export default AddBike;
