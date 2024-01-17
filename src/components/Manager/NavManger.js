import { useDispatch } from 'react-redux';
import './Manager.css';
import { Link, useNavigate } from "react-router-dom";
import * as type from "../../store/actions/actionType";
import LogoutIcon from '@mui/icons-material/Logout';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


const NavManger = () => {

    const dispatch = useDispatch();
    const Exit = () => {

        dispatch({
            type: type.LOG_OUT,

        })
    }

    return (<>
        {
            <ul className='ulOfPrivateM' >

                <li className='liOfPrivateM' onClick={() => Exit()}>
                    <Link to="home">יציאה מהאיזור האישי</Link>
                </li>
                <li className='liOfPrivateM'>
                    <Link to="lContect">רשימת תלונות </Link>
                </li>
                <li className='liOfPrivateM'>
                    <Link to="lUser">רשימת משתמשים </Link>
                </li>
                <li className='liOfPrivateM'>
                    <Link to="lStation">רשימת תחנות </Link>
                </li>
                <li className='liOfPrivateM'>
                    <Link to="lBike">רשימת אפניים </Link>
                </li>
                <li className='liOfPrivateM'>
                    <Link to="lOpinion">רשימת דיווחים </Link>
                </li>
                <li className='liOfPrivateM'>
                    <Link to="profil">פרופיל</Link>
                </li>

            </ul>
        }</>)


}

export default NavManger;
