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
import { Input, Stack } from '@mui/material';
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

import Typography from '@mui/material/Typography';
import axios from 'axios';


import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import '../components/AddBike/AddBike.css';
import ForgetPassword from './ForgetPassword/ForgetPass';
import { connect } from 'formik';

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
    const [open, setOpen] = React.useState(false);
    const [mail, setMail] = React.useState("");
    const openReset = () => {
        setMail(getValues('Email'))
        setOpen(true)
    }


    const Connect = async (details) => {
        console.log("hi")
        axios.post('https://localhost:7207/api/User/ConnectMail', details)
            .then(res => {
                console.log(res.data)
                // nav('/NavB')
                if (res.data != '') {
                    console.log("connect")
                    alert(res.data.name);
                    dispatch({
                        type: type.CURRENT_USER,
                        payload: res.data
                    })
                    nav('/Profil')
                }
                else {
                    document.getElementById('alert').style.visibility = "visible";

                }
            }).catch(err => console.log(err))
    }
    const submit = async (details) => {
        let flag = 0;
        console.log("hi")
        // for (var i = 0; i < users.length; i++) {
        //     if (users[i].mail == details.email && users[i].password == details.password) {
        //         console.log("hellow")
        //         flag = 1;
        //         alert(users[i].name);
        //         dispatch({
        //             type: type.CURRENT_USER,
        //             payload: users[i]
        //         })
        //        
        //     }
        // }
        // if (flag == 0) {
        //     document.getElementById('alert').style.visibility = "visible";
        // }
        await Connect(details);
    }

    return <>

        <form id="formLoginRC" onSubmit={handleSubmit(submit)}>

            <CardContent>

                <h2>ברוכים הבאים-התחברות</h2>
                <Typography variant="h5" component="div" style={{ textAlign: "right" }}>
                    היי, אנחנו שמחים לראות אותך!
                    להתחברות לאיזור האישי, יש להזין כתובת מייל וסיסמא                   </Typography>
                <br></br>


                {/* id */}
                <label>מייל</label><br></br>

                <TextField id="standard-basic" variant="standard" {...register("Mail", {
                    required: "email is required",
                    pattern: {
                        value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Invalid email"
                    }
                })}
                />
                {errors.email && <p className="errorMsg">{errors.email.message}</p>}
                <br></br><br></br>


                <label>סיסמא</label><br></br>

                <FormControl sx={{ m: 1, width: '40ch' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-password"></InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        {...register("Password", {
                            required: "Password is required.",
                            minLength: {
                                value: 6,
                                message: "Password should be at-least 6 characters."
                            }
                        })}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    {errors.password && <p className="errorMsg">{errors.password.message}</p>}

                </FormControl>
                <p className="move" onClick={openReset}>שכחתי סיסמא</p>

                {open ? <ForgetPassword email={mail} setOpen={setOpen} /> : null}

                <br></br>
                <Alert id="alert" severity="error">מייל או סיסמא שגויים</Alert><br></br>

                <Button variant="contained" startIcon={<SendIcon style={{ marginLeft: "20px" }} />} id="addR" type="submit">
                    התחבר
                </Button>
            </CardContent>

            <Link href='yup' style={{ textAlign: "right" }} underline="hover">
                {'להרשמה - לחץ כאן'}
            </Link>

            <CardActions>



            </CardActions>
        </form >

        =
    </>
}


export default Connection;