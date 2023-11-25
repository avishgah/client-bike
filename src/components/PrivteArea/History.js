import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as type from "../../store/actions/actionType";


import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

// import "./ToDoScss.scss";
import { ExitToApp } from "@mui/icons-material";

const History = () => {


    const dispatch = useDispatch();

    let currentUser = useSelector(state => state.ur.user);
    let arr = useSelector(state => state.ur.drives);

    // useEffect(() => {
    //     axios.get(`http://localhost:8080/Task/getTaskDoneByUserId/${currentUser.id}`).then(res => {

    //         console.log(arr + "arr");
    //         console.log(res.data + "res")

    //         dispatch({
    //             type: type.HISTORY_DRIVES,
    //             payload: res.data
    //         })

    //     }).catch(err => { console.log(err); alert("התרחשה שגיאה בקבלת המאמרים") })
    // }, [])

    
    const deletet = (id) => {
        axios.delete(`http://localhost:8080/Task/deleteTask/${id}`).then(res => {

            dispatch({
                type: type.DELETE_DRIVE,
                payload: id
            }).catch(err => { console.log(err) })
        })

    }



    // let arr = useSelector(state => state.tr.drives);

    return (<>
        {arr.length == 0 ? <h1>אין היסטוריה </h1> : <>
            {arr.map((task, index) => <div id="taskS">{<>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            משימה מספר: {task.id}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {task.desk}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            דחיפות: {task.ranks}
                        </Typography>
                        <Typography variant="body2">
                            {task.date}
                            <br />
                        </Typography>
                        <Typography variant="body2">
                            <br />{
                                task.did.data[0] == 0 ? "the task are not complet!!" : "the task are complet!!"
                            }
                        </Typography>
                    </CardContent>


                    <Stack direction="row" alignItems="center" spacing={1}>

                        <IconButton aria-label="delete" size="large" onClick={() => { deletet(task.id) }}>
                            <DeleteIcon fontSize="inherit" />
                        </IconButton>


                    </Stack>





                </Card>
                <br></br>


            </>
            }


            </div>)}</>}

    </>

    )

}

export default History;