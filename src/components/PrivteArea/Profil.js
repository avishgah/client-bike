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
import { Link, Stack } from '@mui/material';
import AttachmentIcon from '@mui/icons-material/Attachment';

import './Adit.css';
// count
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import Input from '@mui/material/Input';

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

import Checkbox from '@mui/material/Checkbox';


// import './Payment2.css';

// import './AddUser.scss';


// ,, כתובת, , , עיר, , , תאריך לידה, תצלום תעודת זהות, סוג לקוח(לקוח, מנהל), לא פעיל, אישור קריאת תקנון






const Profil = () => {
    const currentUser = useSelector(state => state.ur.user);

    // count
    const [count, setCount] = React.useState(1);
    const [invisible, setInvisible] = React.useState(false);

    const handleBadgeVisibility = () => {
        setInvisible(!invisible);
    };
    ///

    const dispatch = useDispatch();
    useEffect(() => {
        // dispatch({ type: type.CHANGE_FLAG_TRUE })\
     
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
    const [checked, setChecked] = React.useState(true);

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
    const submit = (details) => {
        console.log(details);

        const user =
        {
            "name": details.name,
            "address": currentUser.address,
            "mail": currentUser.mail,
            "password": currentUser.password,
            "toun": details.toun,
            "phon": details.phon,
            "tz": details.id,
            "dateBirth": new Date(),
            "pic": l,
            "isManager": false,
            "status": true,
            "readTerms": true
        }
        console.log(currentUser.id)
        axios.put(`https://localhost:7207/api/User/UpdateUser/${currentUser.id}`, user).then(res => {

            console.log(res + "kkkk");

            if (res.data == null) {
                alert("error")
                return null;

            }

            else {
            }
        }).catch(alert("משתמש קיים"))
        // nav('/Payment2')
    }


    var l = '';
    const func = () => {
        l = document.getElementById("k").value;
        console.log(l)
    }

    return <>

        <form id="formLoginR" onSubmit={handleSubmit(submit)}>
            <CardContent>
                {/* 
          <Typography variant="h5" component="div">
            פרטים אישיים
          </Typography> */}
                <br></br>

                {/* name */}
                <label>שם מלא</label>
                <br></br>

                <TextField defaultValue={currentUser == null ? ' ' : currentUser.name} id="standard-basic" variant="standard"
                    {...register("name", { required: "name is required", })} /><br></br><br></br>
                {errors.name && <p className="errorMsg">{errors.name.message}</p>}

                {/* id */}
                <label>תעודת זהות</label>
                <br></br>
                <TextField id="standard-basic" variant="standard"
                    defaultValue={currentUser == null ? ' ' : currentUser.tz}
                    {...register("id", {
                        required: "id is required",
                        pattern: {
                            value: /^\d{9}$/,
                            message: "Invalid id "
                        },

                    })} />
                {errors.id && <p className="errorMsg">{errors.id.message}</p>}
                <br></br><br></br>

                {/* phon */}
                <label>טלפון</label>
                <br></br>
                <TextField id="standard-basic" variant="standard"
                    defaultValue={currentUser == null ? ' ' : currentUser.phon}
                    {...register("phon", {
                        required: "phon is required",
                        pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Invalid phon "
                        },

                    })} /><br></br><br></br>
                {errors.phon && <p className="errorMsg">{errors.phon.message}</p>}

                {/* address */}

                <label>כתובת</label>
                <br></br>
                <TextField id="standard-basic" variant="standard"
                    defaultValue={currentUser == null ? ' ' : currentUser.toun}
                    {...register("toun", {})}

                /><br></br><br></br>

                {/* email */}
                <label>מייל</label>
                <br></br>
                <TextField disabled id="standard-basic" variant="standard"
                    defaultValue={currentUser == null ? ' ' : currentUser.mail}
                    {...register("email", {
                        pattern: {
                            value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "Invalid email"
                        }
                    })}
                />
                {errors.email && <p className="errorMsg">{errors.email.message}</p>}
                <br></br><br></br>

                {/* password */}

                {/* <label>סיסמא</label> */}
                <br></br>


                <FormControl sx={{ m: 1, width: '39ch', direction: "rtl" }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-password"></InputLabel>
                    <Input
                        defaultValue={currentUser == null ? ' ' : currentUser.password}
                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        {...register("password", {
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
                <br></br><br></br>





                {/* save  */}
                <label id="ll">תצלום תעודת זהות / דרכון</label>
                <br></br>
                <div id="div-pic"   >

                    <Button
                        style={{ backgroundColor: "#905e03", width: "22vw" }}
                        endIcon={<AttachmentIcon />}
                        variant="contained"
                        component="label"
                        id="pid-button"
                        defaultValue={currentUser == null ? 'kk' : currentUser.pic}

                    >
                        <input
                            // name="ll"
                            id="k"
                            type="file"
                            onChange={func}

                        // hidden
                        />
                    </Button>
                    <p></p>
                    <a href='/page.txt' download>תקנון שימוש</a>

                    <Checkbox
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                        required="lll"
                    />
                </div>


                <br></br>
                <Button variant="contained" style={{ width: "22vw" }} id="addRC" type="submit">
                    עדכון פרטים
                </Button>

                {console.log(checked)}
            </CardContent>



        </form >

    </>
}


export default Profil;