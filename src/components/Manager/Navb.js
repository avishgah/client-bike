import { useDispatch } from 'react-redux';
import './Adit.css';
import { Link, useNavigate } from "react-router-dom";
import * as type from "../../store/actions/actionType";
import LogoutIcon from '@mui/icons-material/Logout';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


const NavBar = () => {

    const nav = useNavigate();

    const dispatch = useDispatch();
    const Exit = () => {

        dispatch({
            type: type.LOG_OUT,

        })

        // nav("/App");
    }
    let id = 0;
    const changeColor = (id) => {
        console.log(id);
        // document.getElementById(id).style.li.Link.color = "red";
    }
    return (<>
        {
            <div className='home'>

                <ul>
                    <li id='1' onClick={() => (changeColor(1))}>
                        <Link to="History">  רשימת נסיעות</Link><br></br> <br></br>
                    </li>
                    <li id='2'onClick={() => (changeColor(2))}>
                        <Link to="Order">רשימת משתמשים </Link>
                    </li>      
                         <li id='2'onClick={() => (changeColor(2))}>
                        <Link to="Order">רשימת תחנות </Link>
                    </li>
                    <li id='2'onClick={() => (changeColor(2))}>
                        <Link to="Order">רשימת אפניים </Link>
                    </li>
                    <li id='2'onClick={() => (changeColor(2))}>
                        <Link to="Order">רשימת דיווחים </Link>
                    </li>
                    <li id='4'onClick={() => (changeColor(4))}>
                        <Link to="Profil">פרופיל</Link>
                    </li>
                    <li>

                        <Button variant="contained" endIcon={<LogoutIcon />} id="out" type="submit" onClick={() => Exit()} >

                        </Button>


                    </li>
                </ul>
                <br></br>
            </div>
        }</>)


}

export default NavBar;
