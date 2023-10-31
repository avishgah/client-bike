import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}


export default function AccessibleTable() {
    return (
        <TableContainer component={Paper}>
                <div className='table'>
                <TableHead>
                    <TableRow>
                        <TableCell align="right"><b>דמי שחרור אופניים להשכרה חד-פעמית</b></TableCell>
                        <TableCell align="right"><b>דמי שימוש – לכל דקת רכיבה או חלק ממנה </b></TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>

                    <TableRow>
                        <TableCell align="right">
                       ₪0.45<br></br> בשבתות וחגים*: ₪0.6 
                        </TableCell>
                        <TableCell align="right">
                            ₪5
                        </TableCell>

                    </TableRow>
                </TableBody>
                </div>
        </TableContainer>
    );
}