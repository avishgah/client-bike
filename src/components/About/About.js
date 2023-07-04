import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import {useNavigate} from "react-router-dom";
import './About.scss'
const About=()=>{
    let myNav=useNavigate();
    return(<>
    <div className='iconLog'>
        <IconButton aria-label="person" id='person' onClick={()=>myNav('/logIn')}>
        <PersonIcon />
        </IconButton >

        <IconButton aria-label="options" id='options'>
        <MenuIcon/>
        </IconButton>
        
    </div>
  
    <div className='home'>
       
         <img src="BackG.jpg"/>
        <h1>ברוכים הבאים</h1>
        <h1>    RideIt</h1>
        <h3>רידיט אתר המציע מגוון אפשריות לכם הרוכבים שלנו לנסיעה בטוחה יעילה ונוחה </h3>
        <h3>למה לקנות אם אפשר להשכיר בזול בזמינות ובאונליין</h3>
        <h3>בריידיט תימצאו נוחות שימוש הנאה ואמינות </h3>
        <h3>תודה שבחרתם בריידיט נעמוד לשרותכם בטלפון שמספרו 036760549</h3>
        <h3>RideIt@gmail.com וכן במייל</h3>
    </div>
    </>)
}

export default About;