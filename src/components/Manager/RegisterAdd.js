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






const RegisterAdd = () => {

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
  var ans=true;
  const funcDate = () => {

    if (value != null) {
      if (
        (value.$y == date.getFullYear() - 16 && value.$M + 1 == new Date().getMonth() + 1 && value.$D > date.getDate()) ||
        (value.$y == date.getFullYear() - 16 && value.$M + 1 > new Date().getMonth() + 1) ||
        (value.$y > date.getFullYear() - 16)) { ans= true; }
      else {
        ans= false;
      }

      console.log(ans)
    }


  }
  const submit = (details) => {
    console.log(details);

    console.log(value)
    console.log(value.$D + "/" + value.$M + "/" + value.$y)

    const user =
    {
      "name": details.name,
      "address": details.adress,
      "mail": details.email,
      "password": details.password,
      "toun": details.toun,
      "phon": details.phon,
      "tz": details.id,
      "dateBirth": value,
      "pic": l,
      "isManager": false,
      "status": true,
      "readTerms": true
    }
    console.log(user)
    axios.post(`https://localhost:7207/api/User`, user).then(res => {

      console.log(res);

      if (res.data == null) {
        alert("error")
        return null;

      }

      else {
      }
    }).catch(console.log("משתמש קיים"))
    // nav('/Payment2')
  }

  var date = new Date()
  var l = '';
  const func = () => {
    l = document.getElementById("k").value;
    console.log(l)
  }

  return <>

    <form id="formLoginRBike" onSubmit={handleSubmit(submit)}>


      {/* name */}

      <TextField
        sx={{ backgroundColor: "white", textAlign: "right" }}
        label="שם מלא" id=" " {...register("name", { required: "name is required", })} /><br></br><br></br>
      {errors.name && <p className="errorMsg">{errors.name.message}</p>}

      {/* id */}

      <TextField id="fullWidth" label="ת.ז" variant="outlined"
        sx={{ backgroundColor: "white", textAlign: "right" }}
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

      <TextField label="טלפון" id="fullWidth"
        sx={{ backgroundColor: "white", textAlign: "right" }}
        {...register("phon", {
          required: "phon is required",
          pattern: {
            value: /^[1-9]{10}$/,
            message: "Invalid phon "
          },

        })} /><br></br><br></br>
      {errors.phon && <p className="errorMsg">{errors.phon.message}</p>}

      {/* address */}

      <TextField
        sx={{ backgroundColor: "white", textAlign: "right" }}

        helperText=""
        id="fullWidth"
        label="כתובת"
        {...register("adress", {})}

      /><br></br><br></br>
      <TextField
        sx={{ backgroundColor: "white", textAlign: "right" }}

        helperText=""
        id="fullWidth"
        label="עיר"
        {...register("toun", {})}
      /><br></br><br></br>

      {/* email */}

      <TextField
        sx={{ backgroundColor: "white", textAlign: "right" }} id="fullWidth" label="מייל" variant="outlined"  {...register("email", {

          required: "email is required",
          pattern: {
            value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Invalid email"
          }
        })}
      />
      {errors.email && <p className="errorMsg">{errors.email.message}</p>}
      <br></br><br></br>

      {/* password */}


      <FormControl sx={{ m: 1, width: '23ch' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">סיסמא</InputLabel>
        <OutlinedInput
          sx={{ backgroundColor: "white", textAlign: "right" }}

          id="fullWidth"
          label="סיסמא"
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
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      {errors.password && <p className="errorMsg">{errors.password.message}</p>}

      {/* date */}
      {/* זמן עושה בעיות */}

      <input type='button' onClick={funcDate()}>ddddddd</input>

      <input type="date" onChange={(newValue) => (setValue(newValue),funcDate())}
      {...register("datezz", {
          required: "phon is required",
      

        })}></input>
      <div id="ftime" >
        <LocalizationProvider dateAdapter={AdapterDayjs} >
          <DemoContainer components={['DatePicker']} >
            <DatePicker required sx={{ backgroundColor: "white", textAlign: "center", width: '23ch' }} value={value} onChange={(newValue) => setValue(newValue)}
              // {...register("datezz", {
              //   required: "phon is required",
              //   // onChange: (() => funcDate())
              // }
              // )}
               />
          </DemoContainer >
        </LocalizationProvider>
        {
          value != null ?
            (value.$y == date.getFullYear() - 16 && value.$M + 1 == new Date().getMonth() + 1 && value.$D > date.getDate()) ||
              (value.$y == date.getFullYear() - 16 && value.$M + 1 > new Date().getMonth() + 1) ||
              (value.$y > date.getFullYear() - 16)
              ? console.log("date wrong") : console.log("good") : null
        }
      </div>
      {/* dy = date.getDate() */}
      <br></br><br></br>
      {/*           
          <div><b>מספר אופניים להשכרה </b></div><br></br>
          {/* count 

          <Box>
            <div>
              <ButtonGroup>
                <Button
                  aria-label="reduce"
                  onClick={() => {
                    setCount(Math.max(count - 1, 0));
                  }}
                >
                  <RemoveIcon fontSize="small" />
                </Button>

                <div id="p2">{count}</div>

                <Button
                  aria-label="increase"
                  onClick={() => {
                    setCount(count + 1);
                  }}
                >
                  <AddIcon fontSize="small" />
                </Button>
              </ButtonGroup>
            </div>

          </Box> */}



      {/* save */}
      <h5>תצלום תעודת זהות / דרכון</h5>



      <Button
        endIcon={<AttachmentIcon />}
        variant="contained"
        component="label"
        id="pid-button"
      >
        <input
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

      <br></br>
      {/* {console.log(checked)} */}

      {/* <Button variant="contained" endIcon={<SendIcon />} id="addR" type="submit">שמור</Button> */}

      <Button variant="contained" endIcon={<SendIcon />} id="addRB" type="submit">
        הוסף
      </Button>
    </form >

  </>
}


export default RegisterAdd;