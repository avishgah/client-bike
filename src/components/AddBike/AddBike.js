import * as React from 'react';
import Box from '@mui/material/Box';


import TextField from '@mui/material/TextField';
import { Button, Stack } from '@mui/material';

import axios from 'axios';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './AddBike.scss'


const AddBike = () => {

    // const bike={
    //     id:0,
    //     code:"b51"+id,
    //     battery:100,
    //     idStation:IdStation,
    //     dateStart:Date.now()
    // }
    const { register, handleSubmit, getValues, formState: { isValid, errors, dirtyFields, touchedFields, isDirty } } = useForm({
        mode: "all"
    });
    const nav = useNavigate();


    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const submit = (details) => {

        console.log(details);
        addbike(details);
    }

    const addbike = async (details) => {
        var promise = await axios.post("https://localhost:7075/api/Bike", details);
        alert(promise.data);
    }
    return (

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
                        {...register("IdStation", {})}
                    />
                </Stack>

            </Box>
            {/* endIcon={<SendIcon />}  */}

            <Stack direction="row" spacing={2}>

                <Button variant="contained" id="addR" type="submit">
                    התחבר
                </Button>

            </Stack>
        </form>
    )

}

export default AddBike;
