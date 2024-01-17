import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button } from '@mui/material';
import axios from 'axios';


const CardOpinion = ({ props, place, deleteIt }) => {

    function formatDateTime(dateTimeString) {
        const dateStart = new Date(dateTimeString); // המשתנה כאן יכול להיות המשתנה שלך props.dateStart
    
        const day = dateStart.getDate();
        const month = dateStart.getMonth() + 1; // החודשים מתחילים מ־0, לכן נוסיף 1
        const year = dateStart.getFullYear();
        const hours = dateStart.getHours();
        const minutes = dateStart.getMinutes();
        const seconds = dateStart.getSeconds();
    
        const formattedDatex = `${day}/${month}/${year} , ${hours}:${minutes}:${seconds}`;
        return formattedDatex;
    
    }
    
    function deleteItem(id) {

        if (window.confirm("האם אתה בטוח שברצונך למחוק")) {

            axios.delete(`https://localhost:7207/api/Opinion/${id}`).then(res => {
                deleteIt(props)
            })
          

            console.log("deleted")
        }

        else {
            console.log("exit")
        }
    }

    return (<>
        {props != null ?
            <Card sx={{ maxWidth: 340, textAlign: 'center', marginLeft: "50px", marginBottom: "50px" }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            R
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={props.idCust}
                    subheader={formatDateTime(props.date)}
                />
                <Box
                    component="img"
                    sx={{
                        height: 200,
                        display: 'block',
                        // maxWidth: 50,
                        overflow: 'hidden',
                        width: '400px',
                    }}
                    // src={logo}
                    src={props.pic}
                />

                <CardContent>
                    <Typography variant="body2" fontSize={"large"} color="text.secondary">
                        <b> {props.typeProblem ? props.typeProblem : "שגיאה"}</b>
                    </Typography><br></br>
                    {
                        place == 'תקלה באופניים' ? <Typography variant="body2" color="text.secondary" textAlign={'right'}>קוד אופניים:
                            {props.idBike}
                        </Typography>
                            : <Typography variant="body2" color="text.secondary" textAlign={'right'}>קוד תחנה:
                                {props.idStation}
                            </Typography>
                    }
                    <Typography variant="body2" color="text.secondary" textAlign={'right'}>רמת שביעות:
                        {props.satisfactionLeve}
                    </Typography>

                </CardContent>
                <Button id="opinB" onClick={() => deleteItem(props.id)}>delete</Button>

            </Card> : <Card sx={{ maxWidth: 345 }}>
            </Card>}
    </>);
}


export default CardOpinion;