import React from 'react'
import './Fotter.css';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
const Footer = () => {

    const nav=useNavigate();
    return (<>
        <div id="whatever">
            <b> ! יוצאים לרכיבה ? קדימה</b>
            <p>{(<KeyboardDoubleArrowDownIcon style={{fontSize:'18px'}}/>)}  הרשמו כאן למטה</p>
            <Button style={{backgroundColor:'white', color:"orange",border:"solid", borderColor:"orange"}} onClick={()=> nav('/Connection')}>הרשמה</Button>
            
        </div>
        <div id="div-contect">
            <b>מוקד שירות לקחות פדאל:*2506</b>
            פניהה בפקס: 03-9433454<br></br>
            PEDAL@gmail.com :מייל <br></br>
            <b> פדאל חברת אופניים שיתופיות בארץ</b>


        </div>
        <div id="div-nav">
            <ul id="ul-footer">
                <li className='li-footer'>
                    <Link to="Private"> מדיניות פרטיות</Link>
                </li>
                <li className='li-footer'>
                    <Link to="Contect"> צור קשר</Link>
                </li>
                <li className='li-footer'>
                    <Link to="Problems">שאלות ותשובות  </Link>
                </li>
                <li className='li-footer'>
                    <Link to="Terms">תקנון</Link>
                </li>
                <li className='li-footer'>
                    <Link to="Profil">סרטון הסברה</Link>
                </li>
            </ul>
        </div>


    </>)
}

export default Footer
