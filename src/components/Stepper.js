import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Maximize } from '@mui/icons-material';
import './AddBike/AddBike.css';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: '! שימו לב, עמדות ההשכרה הפזורות בעיר אינן פעילות עוד, השימוש באופניים באמצעות אפליקציית מטרופאן החדשה					'
  },
  {
    label: ' חדש בפדאל! טעינת ארנק עם בונוסים'
  },
  {
    label: '! עידכנו מחירים לכל המנויים! תעריפים מוזלים למחזיקי כרטיס "דיגי-תל"		'
  },
  {
    label: ':) פדאל חוסכים לכם זמן, אצלינו ניתן להזמין אפניים מראש ותוכלו לבוא ולקחת '
  }
];

function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (<>

    <div className="divBox" >
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {console.log(Math.abs(activeStep - index))}

            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="div"
                sx={{
                  height: 7,
                  display: 'none',
                  width: '200px',
                  overflow: 'hidden',
                  backgroundColor: 'red',
                }}

              />
            ) : null}<br></br>{step.label}
          </div>
        ))}
      </AutoPlaySwipeableViews>

    </div>

  </>);
}

export default SwipeableTextMobileStepper;