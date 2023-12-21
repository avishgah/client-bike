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
            type: type.LOG_OUT
        })
        nav("/Home");
    }
    let id = 0;
    const changeColor = (id) => {
        console.log(id);
        // document.getElementById(id).style.li.Link.color = "red";
    }
    return (<>
        {
            <div className='home'>

                <ul className='ulOfPrivate' >
                    <li className='liOfPrivate' onClick={() => Exit()}>
                        <Link to="Profil">יציאה מהאיזור האישי</Link>
                    </li>
                    <li className='liOfPrivate' onClick={() => (changeColor(3))}>
                        <Link to="Problems"> דיווח על תקלות </Link>
                    </li>
                    <li className='liOfPrivate' onClick={() => (changeColor(1))}>
                        <Link to="History"> היסטוריית נסיעות</Link><br></br> <br></br>
                    </li>
                    <li className='liOfPrivate' onClick={() => (changeColor(2))}>
                        <Link to="Order"> הזמנה מראש </Link>
                    </li>
                    <li className='liOfPrivate' onClick={() => (changeColor(4))}>
                        <Link to="Profil">פרופיל</Link>
                    </li>

                    {/* <li>
                        <Button variant="contained" endIcon={<LogoutIcon />} id="out" type="submit" onClick={() => Exit()} >

                        </Button>
                    </li> */}
                </ul>
                <br></br>
            </div>
        }</>)


}

export default NavBar;
