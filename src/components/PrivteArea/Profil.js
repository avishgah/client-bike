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

import Input from '@mui/material/Input';

import * as type from "../../store/actions/actionType";

import { useDispatch, useSelector } from "react-redux";


import Button from '@mui/material/Button';



import axios from 'axios';

import CardContent from '@mui/material/CardContent';

import Checkbox from '@mui/material/Checkbox';

const Profil = () => {
    const currentUser = useSelector(state => state.ur.user);
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [showPassword, setShowPassword] = React.useState(false);
    //checkbox
    const [checked, setChecked] = React.useState(true);
    const { register, handleSubmit, getValues, formState: { isValid, errors, dirtyFields, touchedFields, isDirty } } = useForm({
        mode: "all"
    });

    const dispatch=useDispatch();
    useEffect(() => {
        axios.get(`https://localhost:7207/api/user/GetUserById/${currentUser.id}`)
            .then(res => {
                console.log(res.data)
                dispatch({type: type.CURRENT_USER, payload:res.data})
                // nav('/NavB')
            }).catch(err => console.log(err))
    }, [])
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };



    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const submit = (details) => {
        console.log(details);
        console.log(currentUser);

        const user =
        {
            "Name": details.name,
            "Address": currentUser.address,
            "Mail": currentUser.mail,
            "Password": details.password,
            "Toun": details.toun,
            "Phon": details.phon,
            "Tz": currentUser.tz,
            "DateBirth": currentUser.dateBirth,
            "Pic": selectedImage,
            "IsManager": currentUser.isManager,
            "Status": true,
            "ReadTerms": true
        }
        console.log(currentUser.id);
        console.log(user);
        axios.put(`https://localhost:7207/api/User/UpdateUser/${currentUser.id}`, user).then(res => {

            console.log(res + "kkkk");
            alert("עודכן בהצלחה 👍")
            if (res.data == null) {
                alert("error")
                return null;

            }

            else {
            }
        }).catch(err => console.log("err", err))
    }


    return <>

        <form id="formLoginR" onSubmit={handleSubmit(submit)}>
            <CardContent>

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
                <TextField disabled id="standard-basic" variant="standard"
                    defaultValue={currentUser == null ? ' ' : currentUser.tz}
                    {...register("id", {


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
                            pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                                message: "סיסמא חייבת להכיל 6 תווים וכן לפחות אות אחת באנגלית ומספר"
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
                        <div>
                            <input
                                type="file"
                                onChange={handleImageChange}
                                id="imageInput"
                            />
                        </div>
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
            </CardContent>

        </form >

    </>
}


export default Profil;