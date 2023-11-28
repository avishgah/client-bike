import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import './Manager.css';
import { Button, Icon } from '@mui/material';

const columns = [
    { field: 'id', headerName: <b>קוד</b>, width: 70 },
    { field: 'code', headerName: <b>מזהה יפה</b>, width: 130 },
    { field: 'battery', headerName: <b>בטריה</b>, width: 130 },
    { field: 'idStation', headerName: <b>קוד תחנה</b>, width: 130 },
    { field: 'dateStart', headerName: <b>תאריך תחילת שימוש</b>, width: 180 },
    { field: 'deket', headerName: <b>מחק</b>, width: 180 },
];



export default function DataTable() {
    const [listBike, setlistBike] = useState([]);


    useEffect(() => {
        axios.get('https://localhost:7207/api/Bike')
            .then(res => {
                console.log(res.data)
                setlistBike(res.data)
                // nav('/NavB')
            }).catch(err => console.log(err))
    }, [])

    const delet = () => {
        console.log("llll")
    }
    return (<>
        <div style={{ height: 800, width: '100%' }}
       >
    
            <Button onClick={()=>delet()}>jj</Button>
            <DataGrid 
        
                // rows={listBike}
                // columns={columns}
                // initialState={{
                //     pagination: {
                //         paginationModel: { page: 0, pageSize: 15 },
                //     },
                // }}
                // pageSizeOptions={[0, 10]}

                // checkboxSelection

            />
              
            <Icon></Icon>
        </div>

    </>);
}