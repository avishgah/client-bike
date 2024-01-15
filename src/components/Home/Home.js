import './Home.css'

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import How from './how-work/How';
import { useNavigate } from 'react-router';
import Table from '../Tables.js';
import Maps from '../Maps/Maps';
import { RampRight } from '@mui/icons-material';


import Stepper from '../Stepper.js';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
const Home = () => {
    const nav = useNavigate();
    const currentUser = useSelector(state => state.ur.user);
    const station = useSelector(state => state.ur.station);
      useEffect(() => {
        console.log("station",station);
        console.log("user",currentUser);
    }, [])
    return (<>

        <Stepper />

        <div className='father' style={{
            // backgroundImage: `url('./Images/logo2.jpg')`, backgroundRepeat: "no-repeat", backgroundSize: 600, backgroundPosition: '10% 10%',
            // display:"flex",flexWrap:"wrap"
        }}>
            <div className='son'>
                <br></br>
                <div style={{ marginLeft: "30px", backgroundColor: "#602424", borderRadius: "100px", height: "100px", width: "100px" }}></div>

                <div style={{ position: "relative", marginLeft: "109px", width: "13.7vw", height: "14vw", overflow: "hidden" }}>
                    <video
                        autoPlay
                        loop
                        muted
                        poster="./Images/גלגל.mp4"

                        style={{ objectFit: "cover", clip: "rect(0, 50%, 100%, 0)" }}
                    >
                        <source
                            src="./Images/גלגל.mp4"
                            type="video/mp4"
                        />
                    </video>
                </div>
                <div style={{ marginLeft: "30px", backgroundColor: "#602424", borderRadius: "150px", height: "150px", width: "150px" }}></div>
            </div>

            <div className='son' style={{}}>

                {/* img */}
                <h1 id="l" style={{ width: "96vw" }}>כדאי לדעת</h1>

                <div className='ss' onClick={() => nav('./How')}  >
                    <CardContent endIcon={<PedalBikeIcon />}>
                        {/* {<PedalBikeIcon fontSize='large' />} */}

                        <Typography variant="h5" fontSize={'20px'} component="div">
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
                        <Typography variant="h5" fontSize={'20px'} component="div">
                            <b>תעריפים וחישוב עלויות השכרה</b>
                        </Typography>


                        <Typography variant="body2">
                            ממה מורכבת העלות ואיך מחשבים את עלות ההשכרה הסופית והחיוב בהתאם
                        </Typography>
                    </CardContent>
                </div>


                <div className='ss' onClick={() => nav('/Pae')}  >
                    {/* {<PedalBikeIcon fontSize='large' />} */}
                    <CardContent >
                        <Typography variant="h5" fontSize={'20px'} component="div">
                            <b>רכיבה עם ערך מוסף</b>
                        </Typography>


                        <Typography variant="body2">
                            רכיבה על אופניים חשובה לבריאות
                        </Typography>
                    </CardContent>
                </div>


                <div className='ss' onClick={() => nav('/Sae')}  >
                    {/* {<PedalBikeIcon fontSize='large' />} */}
                    <CardContent >
                        <Typography variant="h5" fontSize={'20px'} component="div">
                            <b>רכיבה בטוחה</b>
                        </Typography>


                        <Typography variant="body2">
                            חשוב לנו שתהנו ושתשמרו על עצמכם
                        </Typography>
                    </CardContent>
                </div>


                <div className='ss' onClick={() => nav('/Do')}  >
                    {/* {<PedalBikeIcon fontSize='large' />} */}
                    <CardContent >
                        <Typography variant="h5" fontSize={'20px'} component="div">
                            <b>עשה ואל תעשה</b>
                        </Typography>


                        <Typography variant="body2">
                            מומלץ להצטייד בבקבוק מים ולחבוש קסדה
                        </Typography>
                    </CardContent>
                </div>
            </div>

        </div>
        <Maps id="k" />

    </>)
}
export default Home;