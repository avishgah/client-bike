import { Button } from '@mui/material';
import React from 'react';
import * as XLSX from 'xlsx';


const XL = ({ data, arr,dataName }) => {
    const exportToExcel = () => {
        // Combining data and arr into a two-dimensional array
        const database = [];
    
        // Push column headers as the first row in the database
        database.push(dataName);
    
        // Push data based on 'arr' contents
        arr.forEach(item => {
            const rowData = [];
            data.forEach(itemData => {
                rowData.push(item[itemData]); // Accessing object properties based on 'itemData' key
            });
            database.push(rowData);
        });

        // Create a new Excel workbook
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(database);

        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        // Generate an XLSX file and create a download link
        XLSX.writeFile(wb, 'exported_data.xlsx');
    };
    return (<>
        {console.log(data, "data")}
        {console.log(arr, "arr")}
        <div>
            <Button onClick={exportToExcel}>Export to Excel</Button>
        </div>
    </>)
}


export default XL;