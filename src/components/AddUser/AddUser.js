import * as React from 'react';
import Box from '@mui/material/Box';

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

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';


import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
// import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import './AddUser.css';
import axios from 'axios';


// ,, כתובת, , , עיר, , , תאריך לידה, תצלום תעודת זהות, סוג לקוח(לקוח, מנהל), לא פעיל, אישור קריאת תקנון

const AddUser = () => {

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



    // let currentUser = useSelector(state => state.tr.user);
    // let arr = useSelector(state => state.tr.drives);

    const submit = (details) => {

        console.log(details);
        console.log(value.$D + "/" + value.$M + "/" + value.$y)

        // const user = {
        //     name: details.name,
        //     Phon: details.Phon,
        //     Password: details.password,
        //     Mail: details.email,

        // }\\
        const user = {
            "name": "אבישג               ",
            "address": "ברק",
            "mail": "avi@gmail.com",
            "password": "d3d3d3    ",
            "toun": "ראשון לציון",
            "phon": "0987654321",
            "tz": "432432432",
            "dateBirth": "2003-11-21T00:00:00",
            "pic": "טעטע                                              ",
            "isManager": false,
            "status": true,
            "readTerms": true
        }
        axios.post(`https://localhost:7207/api/user`, user).then(res => {

            console.log(res.data + ";;;;;;");

            if (res.data == null) {
                alert("error")
                return null;

            }


            else {
                //לשגר לסטייט הכללי
                // console.log( res.data.user)

                // dispatch({
                //     type: type.CURRENT_USER,
                //     payload: res.data
                // })

                // nav("/ToDo")
                nav("/ToDo")

            }
        })




    }

    return <>

        {/* name */}
        <form id="formLoginRU" onSubmit={handleSubmit(submit)}>

            <TextField
                helperText="Please enter your name"
                id="demo-helper-text-aligned"
                label="name"
                {...register("name", {})}
            />
            <TextField
                helperText="Please enter your phon"
                id="demo-helper-text-aligned"
                label="Phon"
                {...register("phon", {})}
            />
            <br></br>
            <TextField id="outlined-basic" label="mail" variant="outlined"  {...register("email", { required: true, pattern: /^[0-9A-Za-z]{1,}@gmail.com$/ })} />
            {errors.email?.type == "pattern" && <div className="error">
                מייל לא בתבנית הנכונה
            </div>}
            {errors.email?.type == "required" &&
                <div className="error">
                    שדה חובה
                </div>}
            <br></br>



            <TextField id="outlined-basic" label="id" variant="outlined"  {...register("ID", { required: true, pattern: /^[0-9]{1,9}/ })} />
            {errors.ID?.type == "pattern" && <div className="error">
                תעודת זהות לא תקינה
            </div>}
            {errors.ID?.type == "required" &&
                <div className="error">
                    שדה חובה
                </div>}
            <br></br>

            {/* calender */}

            {/* <TextField id="outlined-basic" label="calender" variant="outlined"  {...register("calender", { required: true, pattern: /^[0-9]{1,9}/ })} />
                    {errors.calender?.type == "pattern" && <div className="error">

                    </div>}
                    {errors.calender?.type == "required" &&
                        <div className="error">
                            שדה חובה
                        </div>} */}

            <br></br>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker value={value} onChange={(newValue) => setValue(newValue)} />
                </DemoContainer>
            </LocalizationProvider>


            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput

                    {...register("password", { required: true })}

                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
                {errors.password?.type == "pattern" &&
                    <div className="error">
                        סיסמא לא תקינה
                    </div>}
                {errors.password?.type == "required" &&
                    <div className="error">
                        שדה חובה
                    </div>}

            </FormControl>
            <br></br>

            <input aria-invalid="false" autocomplete="off" id=":r1:" placeholder="DD/MM/YYYY" type="text" inputmode="tel" class="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputAdornedEnd css-nxo287-MuiInputBase-input-MuiOutlinedInput-input" value="05/04/2023" />



            <Button variant="contained" endIcon={<SendIcon />} id="addR" type="submit">
                התחבר
            </Button>

        </form>
        {/* {document.getElementById("formLogin").style.display = "none"} */}
    </>
}


export default AddUser;