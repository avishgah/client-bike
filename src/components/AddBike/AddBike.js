import * as React from 'react';
import Box from '@mui/material/Box';


import TextField from '@mui/material/TextField';
import { Button, Stack } from '@mui/material';

import axios from 'axios';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './AddBike.css'

import { useState } from "react";
import { useEffect } from 'react';




const AddBike = () => {


    const [isDisabled, setDisabled] = useState(false);

    const [stations, setStation] = useState([]);

    const handleSubmits = () => {
        console.log('Your button was clicked and is now disabled');

    }

    const { register, handleSubmit, getValues, formState: { isValid, errors, dirtyFields, touchedFields, isDirty } } = useForm({
        mode: "all"
    });
    const nav = useNavigate();


    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const restasrt = () => {
        window.location.reload(true);
    }


    const [searchText, setSearchText] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSearch = (e) => {
        console.log(e.target.value)
        setSearchText(e.target.value);
    };


    useEffect(() => {
        axios.get('https://localhost:7207/api/Station/Get').then(res => {
            console.log(res.data)
            setStation(res.data);
            setSelectedOption(res.data[0].id)
        })
    }, [])

    //הוספת אפנים עובד - בעיה - הקוד לא ייחודי 
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
        for (let i = 0; i < details.bike; i++) {
            axios.post(`https://localhost:7207/api/Bike`, bike).then(res => {

                console.log(res.data + ";;;;;;");
                document.getElementById("addMore").style.display = "inline";
                document.getElementById("end").style.display = "inline";

                if (res.data == null) {
                    alert("error")
                    setDisabled(false);
                    return null;
                }
            }).catch(console.log("err"))
        }

    }
    const filteredOptions = stations.filter((option) =>
        option.location.toLowerCase().includes(searchText.toLowerCase())
    );

    return (<>

        <form id="formLoginRBike" onSubmit={handleSubmit(submit)}>
            <p id="smallP">הכנס מספר אופניים שברצונך להוסיף אליה</p>
            <TextField
                label="מספר אפנים "
                sx={{ backgroundColor: "white", textAlign: "right" }}

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


            <select id='selectAdd' onClick={({ target }) => (setSelectedOption(target.value))}>
                {filteredOptions.map(marker => <option selected={selectedOption == marker} value={marker.id}>{marker.name} {marker.location}</option>)}
            </select><br></br><br></br>

        
            {/* endIcon={<SendIcon />}  */}
            <Button type="button" id="addMore" onClick={() => (nav('/lBike'))}>
                הוסף עוד אפנים
            </Button>
            <Button type="button" id="end" onClick={() => (restasrt())}>
                סיום
            </Button>

            <Button variant="contained" id="addRB" type="submit">
                הוסף
            </Button>

        </form>

        {/* <input type='text' value="ooooooo" /> */}
        <br></br>

    </>)

}

export default AddBike;
