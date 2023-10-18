import './NavBar.scss';
import { Link } from "react-router-dom"


const NavBar = () => {

    return (<>
        {
            <div className='home'>

                <ul>
                    <li>
                        <Link to="addUser"> הוספת משתשמש</Link><br></br> <br></br>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link to="addbike"> הוספת אפנים</Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link to="addOption"> הוספת חוות דעת </Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link to="addStation">הופסת תחנה </Link>
                    </li>
                </ul>

            </div>
        }</>)


}

export default NavBar;
