import './Contect.css'
import * as React from 'react';
import { useEffect } from "react";
import IconButton from '@mui/material/IconButton';

import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { Alert, Link, Stack } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import axios from 'axios';

import { useState } from 'react';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const Contect = () => {



    const { register, handleSubmit, getValues, formState: { isValid, errors, dirtyFields, touchedFields, isDirty } } = useForm({
        mode: "all"
    });
    const nav = useNavigate();


    const [open, setOpen] = React.useState(false);

    const type = ['דיווח על תקלה', 'בירור בנושאי חיובים', 'בקשה למידע כללי', 'בקשה למחיקת חשבון', 'אחר'];
    const [placeProblem, setplaceProblem] = useState('דיווח על תקלה');

    const AddContact = (details) => {
        console.log("kkk")
        const contact = {
            "id": 0,
            "name": details.name,
            "email": details.email,
            "phon": details.phon,
            "type": placeProblem,
            "cuption": details.caption,
            "status": true
        }
        console.log(contact);

        axios.post(`https://localhost:7207/api/Contact`, contact).then(res => {

            console.log(res.data + ";;;;;;");

            if (res.data == null) {
                alert("error")
                return null;
            }
        }).catch(console.log("err"))

        console.log(contact);
        document.getElementById('alertC').style.visibility = "visible";
        handleClickOpen();
    }
    const submit = async (details) => {
        console.log(details);
        if (placeProblem == 'בקשה למחיקת חשבון') {
            axios.get(`https://localhost:7207/api/user/GetUserByMail/${details.email}`).then(res => {
                console.log("sum", res.data)
                if (res.data != '') {
                    AddContact(details);
                }
                else {
                    alert("משתמש לא רשום")
                }
            }).catch(err => console.log(err))

        }
        else {
            await AddContact(details);
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        nav('/Home');
    };

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
                                value: /^(0\d|(\+|00)972[\-\s]?)?(50|52|53|54|55|58)?\d{10}$/,
                                message: "Invalid phon "
                            },

                        })} /><br></br>
                    {errors.phon && <p className="errorMsg">{errors.phon.message}</p>}
                </div>
                <br></br><br></br>

                {/* email */}
                <div className='text'>
                    <label id="labelC"><span style={{ color: 'red' }}>*</span>אימייל</label>
                    <br></br>


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
            {/* type-select */}
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
        {/* the massage is accepted */}
        <React.Fragment>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
                Open dialog
            </Button> */}
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                style={{ direction: "rtl" }}
            >
                <DialogTitle sx={{ m: 0, p: 2, color: "rgb(26, 87, 53)" }} id="customized-dialog-title">
                    ההודעה התקבלה בהצלחה
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        // right:0,
                        left: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        שלום,
                    </Typography>
                    <Typography gutterBottom>
                        אנו מצטערים אם חווית חוויה לא נעימה ונשתדל לחזור אליך בהקדם
                    </Typography>
                    <Typography gutterBottom>
                        תודה שבחרת להשתמש ברשת פדאל.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        סגור
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    </>
}


export default Contect;