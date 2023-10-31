import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../payds/Pay.css';
const Pays = () => {


    return (<>
        <div className='textH'>
            <h1>תעריפים וחישוב עלויות השכרה</h1>

            <b><h3 className="p"> השכרה חד פעמית</h3></b>
            <p>השכרה חד פעמית הכוללת תשלום דמי שחרור אופניים וחיוב לכל דקת רכיבה או חלק ממנה, בגין דקות רכיבה בפועל.
                ניתן לרכישה באפליקציה בלבד</p>

            <br></br>
            <b><p className='p-underLine'> :תעריפי השכרה חד פעמית </p></b>
            <div className='pay-div'>

                <b> <p>       דמי שחרור אופניים להשכרה חד-פעמית</p></b>
                <p>  5₪</p>
                <b><p>       דמי שימוש – לכל דקת רכיבה או חלק ממנה </p></b>
                <p>  ₪0.45<br></br>
                    <b>בשבתות וחגים*</b>: ₪0.6</p>
                <br></br>

            </div>
            <b> <p>  החל מיום שישי/ערב חג משעה 14:00 ועד  יום שבת/צאת החג בשעה 19:00*</p></b>

            <b><p> :דוגמאות לחישוב עלות כוללת </p></b>
            <p>  (30X0.45=13.5₪)+30  דקות רכיבה (5 ₪)   סה”כ 18.5 ₪  דמי שחרור אופניים רגילים </p>
         
        </div>
    </>)
}
export default Pays;