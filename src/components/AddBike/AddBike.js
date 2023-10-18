import * as React from 'react';
import Box from '@mui/material/Box';


import TextField from '@mui/material/TextField';
import { Button, Stack } from '@mui/material';

import axios from 'axios';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './AddBike.css'

import { useState } from "react";




const AddBike = () => {


    const [isDisabled, setDisabled] = useState(false);

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

    }

    //הוספת אפנים עובד - בעיה - הקוד לא ייחודי 
    const submit = (details) => {
        const bike = {
            "id": 0,
            "code": "hh",
            "battery": 0,
            "idStation": details.idStation,
            "dateStart": new Date()
        }
        console.log(details);
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

    return (<>

        <form id="formLoginR" onSubmit={handleSubmit(submit)}>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '& > :not(style)': { m: 1 },
                }}
            >
                <Stack>
                    <TextField
                        helperText="Please enter your name"
                        id="demo-helper-text-aligned"
                        label="IdSte"
                        {...register("idStation", {})}
                    />
                </Stack>

            </Box>
            {/* endIcon={<SendIcon />}  */}
            <Button type="button" id="addMore" onClick={() => (nav('/addbike'))}>
                הוסף עוד אפנים
            </Button>
            <Button type="button" id="end" onClick={() => (nav('/'))}>
                סיום
            </Button>
            <Stack direction="row" spacing={2}>

                <Button variant="contained" id="addR" type="submit">
                    התחבר
                </Button>

            </Stack>
        </form>
    </>)

}

export default AddBike;
