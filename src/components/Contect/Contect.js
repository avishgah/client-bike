import './Contect.css'
import * as React from 'react';
import Box from '@mui/material/Box';
import { useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { Alert, Link, Stack } from '@mui/material';
import AttachmentIcon from '@mui/icons-material/Attachment';


// count
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


import * as type from "../../store/actions/actionType";

import { useDispatch, useSelector } from "react-redux";
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';


// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';


import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
// import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
// import Stepper from './StepperNav'


// import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import axios from 'axios';


import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import PicId from './PicId';

import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';


// import './Payment2.css';

// import './AddUser.scss';


// ,, כתובת, , , עיר, , , תאריך לידה, תצלום תעודת זהות, סוג לקוח(לקוח, מנהל), לא פעיל, אישור קריאת תקנון






const Contect = () => {

    // count
    const [count, setCount] = React.useState(1);
    const [invisible, setInvisible] = React.useState(false);

    const handleBadgeVisibility = () => {
        setInvisible(!invisible);
    };
    ///

    const dispatch = useDispatch();
    useEffect(() => {
        // dispatch({ type: type.CHANGE_FLAG_TRUE })


    }, [])

    const [value, setValue] = React.useState(null);

    const { register, handleSubmit, getValues, formState: { isValid, errors, dirtyFields, touchedFields, isDirty } } = useForm({
        mode: "all"
    });
    const nav = useNavigate();

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // let dispatch=useDispatch();

    // step
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    //checkbox
    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    // let currentUser = useSelector(state => state.tr.user);
    // let arr = useSelector(state => state.tr.drives);

    // const submit = (details) => {

    //   console.log(value.$D + "/" + value.$M + "/" + value.$y)
    //   alert("פרטיך נקלטו")
    //   console.log(details);
    //   // addbike(details);
    // }

    const type = ['דיווח על תקלה', 'בירור בנושאי חיובים', 'בקשה למידע כללי', 'בקשה למחיקת חשבון', 'אחר'];
    const [placeProblem, setplaceProblem] = useState('דיווח על תקלה')
    const submit = (details) => {
        console.log(details);
        //     console.log(value.$D + "/" + value.$M + "/" + value.$y)

        document.getElementById('alert').style.visibility = "visible";
    }


    var l = '';
    const func = () => {
        l = document.getElementById("k").value;
        console.log(l)
    }

    return <>

        <form id="formLoginRCO" onSubmit={handleSubmit(submit)}>

            <p id="app">צור קשר</p>
            <div id="flex">
                <br></br>

                {/* name */}
                <div className='text'>
                    <label id="labelC"><span style={{ color: 'red' }}>*</span>שם</label><br></br>
                    <TextField id="standard-basicC" variant="standard"
                        {...register("name", { required: "name is required", })} />
                    {errors.name && <p className="errorMsg">{errors.name.message}</p>}
                    <br></br><br></br>
                </div>

                <br></br><br></br>

                {/* phon */}
                <div className='text'>
                    <label id="labelC"><span style={{ color: 'red' }}>*</span>טלפון</label><br></br>
                    <TextField id="standard-basicC" variant="standard"
                        {...register("phon", {
                            required: "phon is required",
                            pattern: {
                                value: /^[1-9]{10}$/,
                                message: "Invalid phon "
                            },

                        })} /><br></br>
                    {errors.phon && <p className="errorMsg">{errors.phon.message}</p>}
                </div>
                <br></br><br></br>
                <div className='text'>
                    <label id="labelC"><span style={{ color: 'red' }}>*</span>אימייל</label>
                    <br></br>
                    {/* email */}

                    <TextField id="standard-basicC" variant="standard"{...register("email", {
                        required: "email is required",
                        pattern: {
                            value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "Invalid email"
                        }
                    })}
                    />
                    {errors.email && <p className="errorMsg">{errors.email.message}</p>}
                </div>
            </div>
            <br></br><br></br>

            <select id='selectC'
                onChange={({ target }) => (setplaceProblem(target.value))}>
                {type.map(marker => <option selected={placeProblem == marker} value={marker}>{marker}</option>)}
            </select><br></br><br></br>
            <label style={{ textAlign: "right" }}>כאן ניתן להרחיב על הנושא, ונעשה מאמצים להשיב בהקדם</label><br></br><br></br>
            <TextField
                id="outlined-multiline-staticC"
                multiline
                rows={2}
                defaultValue=""
                {...register("caption")}
            /><br></br><br></br>
            <Button variant="contained" endIcon={<SendIcon />} id="addRC" type="submit">
                שליחה
            </Button>
            <br></br><br></br>
            <Alert id="alertC" severity="success">! ההודעה נשלחה בהצלחה </Alert>
        </form >

    </>
}


export default Contect;