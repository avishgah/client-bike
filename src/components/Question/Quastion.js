import { useState } from "react";


import '../AddBike/AddBike.css';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));


const Question = () => {

    const [expanded, setExpanded] = React.useState('');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };



    return (<><br></br><br></br>
        <div style={{ direction: 'rtl', width: "70vw", textAlign: "right", marginLeft: "15vw"}}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography sx={{fontSize:"14px",color:"#560606",fontWeight:"bold"}}> מדוע עליי לסרוק תעודה מזהה בעת הרישום הראשוני באתר?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{fontSize:"14px",color:"black",fontWeight:"bold"}}>
                        סריקת תעודה מזהה הינה תנאי לרישום ושימוש באופניים החשמליים, עלינו לוודא כי את/ה מעל גיל 16 ומורשה לרכוב על פי החוק באופניים חשמליים.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography sx={{fontSize:"14px",color:"#560606",fontWeight:"bold"}}>כמה זוגות אופניים ניתן לשכור ולשחרר באמצעות האתר?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{fontSize:"14px",color:"black",fontWeight:"bold"}}>
                        באמצעות האתר ניתן לשמור עד 10 אופניים.
                        מטלפון חכם אחד ואמצעי תשלום אחד,כך תוכלו לשכור עד 5 השכרות חד פעמיות ולהנות מהשירות באופן הקל והיעיל ביותר.
                        ברכיבה על אופניים חשמליים בלבד יש לסרוק תעודה מזהה של כל רוכב מעל גיל 16 בנפרד.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                    <Typography sx={{fontSize:"14px",color:"#560606",fontWeight:"bold"}}>באילו כרטיסי אשראי ניתן להשתמש ולשלם עבור שירותי פדאל?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{fontSize:"14px",color:"black",fontWeight:"bold"}}>
                        ניתן להשתמש ולשלם עבור שירותי פדאל באמצעות  כל כרטיסי האשראי.<br></br>
                        לא ניתן להשתמש בכרטיס נטענים או בכרטיסי מתנה.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'pane14'} onChange={handleChange('pane14')}>
                <AccordionSummary aria-controls="pane14d-content" id="pane14d-header">
                    <Typography sx={{fontSize:"14px",color:"#560606",fontWeight:"bold"}}>כיצד ניתן לעדכן פרטים אישיים ופרטי אשראי?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{fontSize:"14px",color:"black",fontWeight:"bold"}}>
                        פרטים אישים ופרטי כרטיס אשראי ניתן לעדכן באתר האינטרנט פדאל באיזור האישי.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'pane15'} onChange={handleChange('pane15')}>
                <AccordionSummary aria-controls="pane15d-content" id="pane15d-header">
                    <Typography sx={{fontSize:"14px",color:"#560606",fontWeight:"bold"}}>כיצד אוכל לעקוב אחר החיובים והרכיבות שביצעתי?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{fontSize:"14px",color:"black",fontWeight:"bold"}}>
                        לקבלת פירוט הרכיבות יש להיכנס ללשונית “היסטורית נסיעות” באתר האינטרנט פדאל.
                        לקבלת פירוט חיובים יש להיכנס באתר האינטרנט פדאל ולבחור בהיסטורית חיובים.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'pane16'} onChange={handleChange('pane16')}>
                <AccordionSummary aria-controls="pane16d-content" id="pane16d-header">
                    <Typography sx={{fontSize:"14px",color:"#560606",fontWeight:"bold"}}>האם בעת ההשכרה נלקח ערבון כלשהו?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{fontSize:"14px",color:"black",fontWeight:"bold"}}>
                        לא. בעת ההשכרה מתבצעת בדיקה מול חברת האשראי ונשמרת מסגרת אשראי על סך 0.05 אג’. זהו אינו חיוב בפועל והסכום ישוחרר בתום השימוש.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'pane17'} onChange={handleChange('pane17')}>
                <AccordionSummary aria-controls="pane17d-content" id="pane17d-header">
                    <Typography sx={{fontSize:"14px",color:"#560606",fontWeight:"bold"}}>כיצד ניתן למחוק חשבון?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{fontSize:"14px",color:"black",fontWeight:"bold"}}>
                        על מנת למחוק את חשבונך יש להגיש פנייה באמצעות “צור קשר” באתר
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'pane18'} onChange={handleChange('pane18')}>
                <AccordionSummary aria-controls="pane18d-content" id="pane18d-header">
                    <Typography sx={{fontSize:"14px",color:"#560606",fontWeight:"bold"}}>מי רשאי להשתמש בשירות האופניים החשמליים?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{fontSize:"14px",color:"black",fontWeight:"bold"}}>
                        כל אדם  מעל גיל 16, העומד באחד מהתנאים הבאים:<br></br>
                        (1) הוצאת רישיון נהיגה, (לא כולל רישיון נהיגה דרגה 1).<br></br>
                        (2)בעל רישיון נהיגה בתוקף (אשר בין היתר, עבר בהצלחה מבחן נהיגה עיוני (“תיאוריה”) של משרד הרישוי.<br></br>
                        (3) ניתן לו אישור מאת משרד הרישוי על עמידתו בהכשרה עיונית לאופניים חשמליים, בעל ניסיון וכשירות פיזית בהתאם לדין, הבקיא בחוקי התנועה והתעבורה, רשאי להשתמש באופניים חשמליים, בכפוף להוראות כל דין.<br></br>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'pane19'} onChange={handleChange('pane19')}>
                <AccordionSummary aria-controls="pane19d-content" id="pane19d-header">
                    <Typography sx={{fontSize:"14px",color:"#560606",fontWeight:"bold"}}>כיצד משחררים ומחזירים אופניים בתחנות?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{fontSize:"14px",color:"black",fontWeight:"bold"}}>
                        הסבר על אופן השחרור וההחזרה של האופניים בתחנות ניתן למצוא בסרטוני ההדרכה באתר .<br></br>
                        <a href='/Video' >לצפייה בסרטוני ההדרכה לחץ/י כאן.</a>

                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'pane20'} onChange={handleChange('pane20')}>
                <AccordionSummary aria-controls="pane20d-content" id="pane20d-header">
                    <Typography sx={{fontSize:"14px",color:"#560606",fontWeight:"bold"}}>מה עליי לעשות אם האופניים ששחררתי תקולים או אם ארעה תקלה באמצע הדרך?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{fontSize:"14px",color:"black",fontWeight:"bold"}}>
                        במידה ויש תחנה סמוכה יש לנעול את האופניים בעמוד העגינה ולעדכן את מוקד שירות הלקוחות  בטלפון: 2670*.
                        במידה ואין תחנה קרובה, יש לעדכן את מוקד שירות הלקוחות לקבלת פתרון.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'pane21'} onChange={handleChange('pane21')}>
                <AccordionSummary aria-controls="pane21d-content" id="pane21d-header">
                    <Typography sx={{fontSize:"14px",color:"#560606",fontWeight:"bold"}}>כיצד ניתן לדווח על אופניים תקולים או נטושים?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{fontSize:"14px",color:"black",fontWeight:"bold"}}>
                        דיווח על תקלות או אופניים נטושים אפשרי במספר ערוצים:<br></br>
                        1. במוקד שרות לקוחות בטלפון: 2670*.<br></br>
                        2. באתר האינטרנט של פדאל.<br></br>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'pane22'} onChange={handleChange('pane22')}>
                <AccordionSummary aria-controls="pane22d-content" id="pane22d-header">
                    <Typography sx={{fontSize:"14px",color:"#560606",fontWeight:"bold"}}>האופניים נגנבו לי, מה עליי לעשות?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{fontSize:"14px",color:"black",fontWeight:"bold"}}>
                        יש לדווח באופן מידי למוקד שירות לקוחות בטלפון 2670* ו/או באתר האינטרנט פדאל.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'pane23'} onChange={handleChange('pane23')}>
                <AccordionSummary aria-controls="pane23d-content" id="pane23d-header">
                    <Typography sx={{fontSize:"14px",color:"#560606",fontWeight:"bold"}}>אפשר לקבל מידע על המפרט הטכני של האופניים?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{fontSize:"14px",color:"black",fontWeight:"bold"}}>
                        אופני פדאל הם אופניים חדישים ובטיחותיים, בגודל אחיד, המותאמים לנשים ולגברים כאחד.<br></br>
                        <br></br>
                        האופניים הינם אופניים מצוידים במנוע עזר, אשר כוללים, בין היתר, את שלדת האופניים, מערכת הנעילה, כידון, בלמים, שרשרת, ציר קדמי ואחורי, גלגלים וצמיגים, פעמון, אורות, מושב, יחידת נעילה והפעלה חשמלית ומערכת ניווט גלובלית.<br></br>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'pane24'} onChange={handleChange('pane24')}>
                <AccordionSummary aria-controls="pane24d-content" id="pane24d-header">
                    <Typography sx={{fontSize:"14px",color:"#560606",fontWeight:"bold"}}>האם עליי לחבוש קסדה בזמן הרכיבה?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{fontSize:"14px",color:"black",fontWeight:"bold"}}>
                        בעת רכיבה על אופניים הנך מחויב/ת בחבישת קסדה תקנית אשר עומדת בכל התקנים והדרישות הרלוונטיות בהתאם להוראות הדין.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'pane25'} onChange={handleChange('pane25')}>
                <AccordionSummary aria-controls="pane25d-content" id="pane25d-header">
                    <Typography sx={{fontSize:"14px",color:"#560606",fontWeight:"bold"}}>האם אני מבוטח/ת דרך שירות פדאל בעת הרכיבה?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{fontSize:"14px",color:"black",fontWeight:"bold"}}>
                        המשתמש מקבל על עצמו את כל הסיכונים הכרוכים ברכיבה על אופניים.<br></br>
                        המשתמש מצהיר כי ידוע לו שרכיבה על אופניים הינה פעילות מסוכנת  הכרוכה בסיכונים כגון נזקי גוף, נזקי רכוש, נכות חלקית או כללית ו/או מוות.<br></br>
                        המשתמש מצהיר כי ידוע לו שישנם סיכונים בלתי צפויים בקשר עם השימוש פדאל/או ברכיבה על האופניים והינו מקבל על עצמו את האחריות לגבי כל הסיכונים כאמור, לרבות סיכונים הנובעים מהתרשלותם של צדדים שלישיים.<br></br>
                        אם תידרשנה החברה ו/או העירייה ו/או הרשות לשלם דמי נזק, פיצויים ו/או הוצאות כלשהן הנובעים מן העילות האמורות, לרבות הוצאות משפט ושכר טרחת עו”ד, מתחייב המשתמש לשפות אותן ו/או את מי מהן, במלוא הסכומים שתידרשנה הנ”ל, או מי מהן לשלם ואותו סכום יראוהו כחוב המגיע לעירייה ו/או  לרשות ו/או לחברה מאת המשתמש.<br></br>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'pane26'} onChange={handleChange('pane26')}>
                <AccordionSummary aria-controls="pane26d-content" id="pane26d-header">
                    <Typography sx={{fontSize:"14px",color:"#560606",fontWeight:"bold"}}>האם ניתן להרכיב אדם נוסף או ילד על האופניים?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{fontSize:"14px",color:"black",fontWeight:"bold"}}>
                        חל איסור חמור להרכיב אדם נוסף או ילד על האופניים.<br></br>
                        האופניים מיועדים לרכיבת אדם אחד בלבד.<br></br>
                        אנא שימרו על עצמכם.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'pane27'} onChange={handleChange('pane27')}>
                <AccordionSummary aria-controls="pane27d-content" id="pane27d-header">
                    <Typography sx={{fontSize:"14px",color:"#560606",fontWeight:"bold"}}>היכן ממוקמות תחנות פדאל?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{fontSize:"14px",color:"black",fontWeight:"bold"}}>
                        במפת התחנות באתר האינטרנט של פדאל ניתן לראות את מיקום התחנות הקרובות בהן ניתן לשכור אופניים.<br></br>
                        מפת התחנות תראה לכם תחנות קרובות ואת מידת זמינות האופניים בכל תחנה,<br></br>
                        כך שתוכלו לתכנן את מסלול הנסיעה שלכם מראש בצורה הקלה והיעילה ביותר.<br></br>
                        <a href='/maps' >לצפייה בתחנות לחץ/י כאן.</a>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'pane28'} onChange={handleChange('pane28')}>
                <AccordionSummary aria-controls="pane28d-content" id="pane28d-header">
                    <Typography sx={{fontSize:"14px",color:"#560606",fontWeight:"bold"}}>מה קורה אם אין אופניים זמינים בתחנה?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{fontSize:"14px",color:"black",fontWeight:"bold"}}>
                        במפת התחנות באתר האינטרנט פדאל ניתן לקבל מידע על כמות האופניים הזמינים בכל תחנה בכל זמן נתון.<br></br>
                        במידה ואין אופניים זמינים בתחנה בה אתה נמצא, חפש במפה את התחנה הקרובה אליך ביותר. וכן שינה באפשרותך האפרות לשמור רותם עד כחי שעה מרגע ההזמנה<br></br>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'pane29'} onChange={handleChange('pane29')}>
                <AccordionSummary aria-controls="pane29d-content" id="pane29d-header">
                    <Typography sx={{fontSize:"14px",color:"#560606",fontWeight:"bold"}}>מה עלי לעשות אם אני רוצה להחזיר אופניים והתחנה מלאה?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{fontSize:"14px",color:"black",fontWeight:"bold"}}>
                        במפת התחנות תוכל למצוא את תחנות אחרות הקרובות אליך ואת מספר האופניים העוגנים בה.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'pane30'} onChange={handleChange('pane30')}>
                <AccordionSummary aria-controls="pane30d-content" id="pane30d-header">
                    <Typography sx={{fontSize:"14px",color:"#560606",fontWeight:"bold"}}>אני רוצה להציע מיקום נוסף לתחנת פדאל.
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{fontSize:"14px",color:"black",fontWeight:"bold"}}>
                        החלטות על מיקומי התחנות הינם בסמכות הרשות המקומית ויש להפנות אליה פניות בנושא זה.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>



    </>)
}


export default Question;