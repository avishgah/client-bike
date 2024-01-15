import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button } from '@mui/material';
import axios from 'axios';

import * as type from "../../store/actions/actionType";
import { useDispatch } from 'react-redux';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const CardOpinion = ({ props, place, listOpinion }) => {
    const [expanded, setExpanded] = React.useState(false);
    const dispatch = useDispatch();

    const updateList = async () => {
        console.log("enter update")
        axios.get('https://localhost:7207/api/Opinion')
        .then(res => {
            dispatch({
                type: type.LIST_OPINION,
                payload: res.data
            })
            // nav('/NavB')
        }).catch(err => console.log(err))
    }


    function deleteItem(id) {
        var txt;
        if (window.confirm("האם אתה בטוח שברצונך למחוק")) {

            axios.delete(`https://localhost:7207/api/Opinion/${id}`).then(res => {
                alert("נמחק בהצלחה")
            })
            updateList();
            console.log("deleted")
        }

        else {
            console.log("exit")
        }
    }


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


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
                    subheader={props.date}
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