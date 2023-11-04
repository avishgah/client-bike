import './Home.css'
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import How from '../how-work/How';
import { useNavigate } from 'react-router';
import Table from '../Tables.js';
import Maps from '../Maps/Maps';

const Home = () => {
    const nav = useNavigate();
    return (<>
        {/* img */}
        <h1>כדאי לדעת</h1>

        <div className='ss' onClick={() => nav('./How')}  >
            {/* {<PedalBikeIcon fontSize='large' />} */}
            <CardContent >
                <Typography variant="h5" component="div">
                    <b>     ?כיצד פועל השירות </b>
                </Typography>


                <Typography variant="body2">
                    סוגי מנויים ואופניים, וכל המידע הדרוש לכם על האפליקציה החדשה שלנו ושחרור קסדה
                </Typography>
            </CardContent>
        </div>



        <div className='ss' onClick={() => nav('./Pay')}  >
            {/* {<PedalBikeIcon fontSize='large' />} */}
            <CardContent >
                <Typography variant="h5" component="div">
                    <b>תעריפים וחישוב עלויות השכרה</b>
                </Typography>


                <Typography variant="body2">
                    ממה מורכבת העלות ואיך מחשבים את עלות ההשכרה הסופית והחיוב בהתאם
                </Typography>
            </CardContent>
        </div>


        <div className='ss' onClick={() => nav('./Pay')}  >
            {/* {<PedalBikeIcon fontSize='large' />} */}
            <CardContent >
                <Typography variant="h5" component="div">
                    <b>רכיבה עם ערך מוסף</b>
                </Typography>


                <Typography variant="body2">
                רכיבה על אופניים חשובה לבריאות           
                     </Typography>
            </CardContent>
        </div>


        <div className='ss' onClick={() => nav('./Pay')}  >
            {/* {<PedalBikeIcon fontSize='large' />} */}
            <CardContent >
                <Typography variant="h5" component="div">
                    <b>רכיבה בטוחה</b>
                </Typography>


                <Typography variant="body2">
                חשוב לנו שתהנו ושתשמרו על עצמכם              
                  </Typography>
            </CardContent>
        </div>


        <div className='ss' onClick={() => nav('./Pay')}  >
            {/* {<PedalBikeIcon fontSize='large' />} */}
            <CardContent >
                <Typography variant="h5" component="div">
                    <b>עשה ואל תעשה</b>
                </Typography>


                <Typography variant="body2">
                מומלץ להצטייד בבקבוק מים ולחבוש קסדה
                </Typography>
            </CardContent>
        </div>
        <Maps/>
    </>)
}
export default Home;