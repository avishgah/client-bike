import React from 'react'
import './Fotter.css';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
const Footer = () => {

    const nav = useNavigate();
    return (<>
        <br></br><br></br><br></br><br></br>
        <div className='footer'>

            <div id="whatever" >
                <b> ! יוצאים לרכיבה ? קדימה</b>
                <p>{(<KeyboardDoubleArrowDownIcon style={{ fontSize: '18px' }} />)}  הרשמו כאן למטה</p>
                <Button id='buttonRe' onClick={() => nav('/Connection')}>הרשמה</Button>

            </div>
            <div id="div-contect">
                <b>מוקד שירות לקחות פדאל:*2670</b>
                פניהה בפקס: 03-9433454<br></br>
                PEDAL@gmail.com :מייל <br></br>
                <b> פדאל חברת אופניים שיתופיות בארץ</b>


            </div>
            {/* <div id="div-nav" > */}
            <ul id="ul-footer">
                <li className='li-footer'>
                    <Link to="Private"> מדיניות פרטיות</Link>
                </li>
                <li className='li-footer'>
                    <Link to="Contect"> צור קשר</Link>
                </li>
                <li className='li-footer'>
                    <Link to="Question">שאלות ותשובות  </Link>
                </li>
                <li className='li-footer'>
                    <Link to="Terms">תקנון</Link>
                </li>
                <li className='li-footer'>
                    <Link to="Video">סרטון הסברה</Link>
                </li>
            </ul>
            {/* </div> */}

        </div>

    </>)
}

export default Footer
