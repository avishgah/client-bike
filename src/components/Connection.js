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
import { Stack } from '@mui/material';
import Link from '@mui/material/Link';


// count
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import Alert from '@mui/material/Alert';


import { useDispatch, useSelector } from "react-redux";
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';


// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as type from "../store/actions/actionType";


import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
// import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import Stepper from './Stepper'


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



const Connection = () => {


    let currentUser = useSelector(state => state.ur.user);
    let dispatch = useDispatch();

    // count
    const [count, setCount] = React.useState(1);
    const [invisible, setInvisible] = React.useState(false);

    // const handleBadgeVisibility = () => {
    //     setInvisible(!invisible);
    // };
    ///

    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch({ type: type.CHANGE_FLAG_TRUE })


    // }, [])

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


    // step
    const [activeStep, setActiveStep] = React.useState(0);

    // const [currentUser, setCurrentUser] = React.useState([]);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    const [users, setUsers] = React.useState([])

    useEffect(() => {
        axios.get('https://localhost:7207/api/User')
            .then(res => {
                console.log(res.data)
                setUsers(res.data)
                // nav('/NavB')
            }).catch(err => console.log(err))
    }, [])



    const submit = (details) => {
        let flag = 0;
        console.log("hi")
        for (var i = 0; i < users.length; i++) {
            if (users[i].mail == details.email) {
                console.log("hellow")
                flag = 1;
                alert(users[i].name);
                dispatch({
                    type: type.CURRENT_USER,
                    payload: users[i]
                })
                // setCurrentUser(users[i])
            }
        }
        if (flag == 0) {
            document.getElementById('alert').style.visibility = "visible";
        }
    }

    return <>

        <form id="formLoginR" onSubmit={handleSubmit(submit)}>
            <Card sx={{ minWidth: 80 }}>
                <CardContent>

                    <h2>ברוכים הבאים-התחברות</h2>
                    <Typography variant="h5" component="div">
                        היי, אנחנו שמחים לראות אותך!
                        להתחברות לאיזור האישי, יש להזין כתובת מייל                    </Typography>
                    <br></br>


                    {/* id */}

                    <TextField fullWidth id="standard-basic" variant="standard" {...register("email", {
                        required: "email is required",
                        pattern: {
                            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                            message: "Invalid email"
                        }
                    })}
                    />
                    {errors.email && <p className="errorMsg">{errors.email.message}</p>}
                    <br></br><br></br>


                    <Alert id="alert" severity="error">משתמש לא נמצא</Alert>


                </CardContent>

                <CardActions>
                    <Stack direction="row" spacing={2}>


                        <Button variant="contained" endIcon={<SendIcon />} id="addR" type="submit">
                            התחבר
                        </Button>
                        <Link href='Register' underline="hover">
                            {'להרשמה - לחץ כאן'}
                        </Link>
                    </Stack>
                </CardActions>
            </Card>

        </form >


    </>
}


export default Connection;