import * as React from 'react';
import TextField from '@mui/material/TextField';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from 'react-hook-form';


import StarIcon from '@mui/icons-material/Star';

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import { useEffect } from "react";

import { useNavigate } from 'react-router-dom';
import './AddOption.scss'

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};


const AddOption = () => {

    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);

    console.log(value)

    const { register, handleSubmit, getValues, formState: { isValid, errors, dirtyFields, touchedFields, isDirty } } = useForm({
        mode: "all"
    });
    // let dispatch = useDispatch();

    const nav = useNavigate();

//חסר תאריך
    const submit = (details) => {
        // login=(details);
        console.log(details + "jjj")
        const task = {
            "id": 8,
            "idCust": 3,
            "idStation": 2,
            "caption": ",,                                                                                                  ",
            "satisfactionLeve": 2,
            "idNavigation": null,
            "idStationNavigation": null


            // "id": 0,
            // desk: details.task,
            // date: new Date(),
            // ranks: details.level,
            // did: false,
            // userId: ""
        }

        axios.post(`https://localhost:7207/api/Opinion`, task).then(res => {

            console.log(res.data + ";;;;;;");
            <>
                <h1>נוסף בהצלחה 👍</h1>
                <Button variant="contained" id="addR" onClick={() => (nav('/addbike'))}>
                    להוספת אפניים נוסף
                </Button>
                <Button variant="contained" id="addR" onClick={() => (nav('/navbar'))}>
                    סיום
                </Button>
            </>

            if (res.data == null) {
                alert("error")
                return null;

            }
        })

        alert(task.desk)
        console.log(task + "task");



    }

    return (

        <form className={isValid ? "good" : "error"} onSubmit={handleSubmit(submit)}>

            < h1 >הוסף חוות דעת</h1 >


            <Box
                sx={{
                    width: 200,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Rating
                    name="hover-feedback"
                    value={value}
                    precision={0.5}
                    getLabelText={getLabelText}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                    }}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
                {value !== null && (
                    <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                )}
            </Box>


            {/* <TextField
                id="outlined-number"
                label="רמת שביעות"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                {...register("level", { required: true })}
            /> */}
            <br></br><br></br>
            <TextField
                id="outlined-multiline-static"
                label="כתוב כאן"
                multiline
                rows={7}
                defaultValue=""
                {...register("task", { required: true })}
            />
            {errors.task?.type == "required" &&
                <div className="errors">
                    שדה חובה

                </div>}

            <br></br>
            <br></br>


            <Stack direction="row" spacing={2}>

                <Button variant="contained" endIcon={<SendIcon />} id="add" type="submit">
                    הוסף
                </Button>

            </Stack>
        </form>


    )
}
export default AddOption;