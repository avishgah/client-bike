import './Adit.css';
import { Link } from "react-router-dom"


const NavBar = () => {

    return (<>
        {
            <div className='home'>

                <ul>
                    <li>
                        <Link to="History"> היסטוריית נסיעות</Link><br></br> <br></br>
                    </li>
                    <li>
                        <Link to="Price">הסטוריית חיובים </Link>
                    </li>
                    <li>
                        <Link to="addOption"> הוספת חוות דעת </Link>
                    </li>
                    <li>
                        <Link to="addStation">פרופיל</Link>
                    </li>
                    <li>
                        <Link to="addStation">יציאה מהמערכת</Link>
                    </li>
                </ul>

            </div>
        }</>)


}

export default NavBar;
