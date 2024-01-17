import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import './Manager.css';
import { Button, IconButton, TableSortLabel, Tooltip } from '@mui/material';
import { Switch, switchClasses } from '@mui/joy';

import XL from '../export to xl/XL';
export default function AccessibleTable() {

    const [listUsers, setlistUsers] = useState([]);

    const [selectedImage2, setSelectedImage2] = useState(null);

    const [inputValue, setInputValue] = useState('')
        
    const [numberValue, setnumberValue] = useState('');

    const [sortOrder, setsortOrder] = useState('desc');

    const data = ["id", "name", "tz", "phon", "mail", "toun", "address", "dateBirth", "status"];
    const dataName = ["קוד משתמש", "שם", "תעודת זהות", "טלפון", "דוא''ל", "עיר", "כתובת", "תאריך לידה", "סטטוס"]
    const [placeProblem, setplaceProblem] = useState('הכל')
    const PlaceArr = ['הכל', 'משתמשים פעילים', 'משתמשים לא פעילים'];
    let filteredOptions = [];

    // const [u, setuseru] = useState(null);
    const change = (u, status) => {

        if (window.confirm("האם אתה בטוח שברצונך לשנות את סטטוס המשתמש ")) {

            console.log(u)

            const user =
            {
                "Name": u.name,
                "Address": u.address,
                "Mail": u.mail,
                "Password": u.password,
                "Toun": u.toun,
                "Phon": u.phon,
                "Tz": u.tz,
                "dateBirth": u.dateBirth,
                "Pic": u.pic,
                "IsManager": false,
                "Status": !status,
                "readTerms": true
            }

            console.log(user)
            axios.put(`https://localhost:7207/api/User/UpdateUser/${u.id}`, user).then(res => {
                console.log("kk");

                axios.get('https://localhost:7207/api/CustomerOrdersView')
                    .then(res => {
                        console.log(res.data)
                        var newArray = res.data.slice(1);
                        setlistUsers(newArray);
                        // nav('/NavB')
                    }).catch(err => console.log(err))

            })

        }
        else {
            console.log("exit")
        }

    }

    useEffect(() => {
        axios.get('https://localhost:7207/api/CustomerOrdersView')
            .then(res => {
                console.log(res.data)
                var newArray = res.data.slice(1);
                setlistUsers(newArray);
                // nav('/NavB')
            }).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (selectedImage2) {
            openImageInNewTab(selectedImage2.src);
        }
    }, [selectedImage2]);
  
    // קישור לתמונה
    const openImageInNewTab = (src) => {
        // Create a Blob from the image source
        fetch(src)
            .then((response) => response.blob())
            .then((blob) => {
                // Create a URL for the Blob
                const imageUrl = URL.createObjectURL(blob);

                // Open the image in a new tab
                window.open(imageUrl, '_blank');
            });
    };

    const openImage = (id, src) => {
        setSelectedImage2({ id, src });
        openImageInNewTab(src);
    };


    const handleFilter = () => {

        filteredOptions = placeProblem != 'הכל' ? listUsers.filter((option) => placeProblem == 'משתמשים לא פעילים' ? !option.status : option.status) : listUsers;

        console.log("enter");
        filteredOptions = filteredOptions.filter(x => {
            return (
                ((!numberValue) ||
                    x.tz?.toString().includes(numberValue) ||
                    x.phon?.toString().includes(numberValue)) &&
                ((!inputValue) ||
                    x.toun?.toString().includes(inputValue) ||
                    x.name?.toString().includes(inputValue) ||
                    x.mail?.toString().includes(inputValue) ||
                    x.address?.toString().includes(inputValue))
            );
        });
        return filteredOptions;
    };

    const createSortHandlerForNumBike = (key) => {
        const listCopy = [...listUsers];
        // Toggle between 'asc' and 'desc'
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        if (sortOrder == 'asc') {
            listCopy.sort((a, b) => a[key] > b[key] ? 1 : -1)

        }
        else {
            listCopy.sort((a, b) => a[key] < b[key] ? 1 : -1)

        }
        setlistUsers(listCopy);
        setsortOrder(newSortOrder);
    }


    const createSortOfDate = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        performSort('dateBirth', newSortOrder);
        setsortOrder(newSortOrder);
    };

    const performSort = (property, order) => {
        const sortedData = [...listUsers].sort((a, b) => {
            // Parse date strings to compare
            const dateA = new Date(a[property]);
            const dateB = new Date(b[property]);

            if (order === 'asc') {
                return dateA - dateB;
            } else {
                return dateB - dateA;
            }
        });

        setlistUsers(sortedData);
    };

    const createSortHandler = (key) => {
        const listCopy = [...listUsers];

        // Toggle between 'asc' and 'desc'
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';

        listCopy.sort((a, b) => {
            if (newSortOrder === 'asc') {
                return a[key].toString().localeCompare(b[key].toString());
            } else {
                return b[key].toString().localeCompare(a[key].toString());
            }
        });

        setlistUsers(listCopy);
        setsortOrder(newSortOrder);
    }

    const createSortHandlerForStatus = (key) => {
        const sortedList = [...listUsers]; // Create a copy of the original list
        sortedList.sort((a, b) => {
            if (sortOrder == 'asc') {
                console.log("jj")
                return b[key] - a[key];

            } else {
                console.log("jk")
                return a[key] - b[key];

            }
        });

        console.log(sortOrder)

        // if (sortOrder == 'asc')
        //   sortOrder = 'desc'
        // else
        //   sortOrder = 'asc'

        setsortOrder(sortOrder == 'asc' ? 'desc' : 'asc'); // Toggle the sortOrder for the next reversal
        console.log(sortOrder)
        setlistUsers(sortedList);

        // return sortedList;

        // Check if the first item in the list has the same value for the 'status' key
        // const isSorted = listCopy.every((item, index) => index === 0 || item[key] === listCopy[index - 1][key]);

        // If all values are the same, reverse the list to toggle the sorting order
        // if (isSorted) {
        // listCopy.reverse();
        // }

    }
 
    return (
        <div class="flex-container">
            <div class="flex-item-left">

                <select id='selectListOpinion' style={{ padding: "5.3px" }}
                    onChange={({ target }) => (setplaceProblem(target.value))}>
                    {PlaceArr.map(marker => <option selected={placeProblem == marker} value={marker}>{marker}</option>)}
                </select>

                <input className='input-dates' style={{ height: "30px" }} placeholder="חיפוש חופשי..." value={inputValue} onChange={({ target }) => setInputValue(target.value)} />
                <input className='input-dates' style={{ height: "30px" }} placeholder="תעודת זהות / טלפון" value={numberValue} onChange={({ target }) => setnumberValue(target.value)} />
                <XL data={data} dataName={dataName} arr={handleFilter()} />
                <TableContainer component={Paper}>
                    <Table id="table" aria-label="caption table">
                        <caption>End list of users</caption>
                        <TableHead>
                            <TableRow>

                                {/* <TableCell><b></b></TableCell> */}


                                <TableCell align="left">



                                    <TableSortLabel

                                        onClick={() => createSortHandler('name')}
                                    >
                                        <b>שם מלא</b>

                                    </TableSortLabel>

                                </TableCell>
                                <TableCell align="right"><b>תעודת זהות</b></TableCell>
                                <TableCell align="right"><b>טלפון</b></TableCell>
                                <TableCell align="right"><b>מייל</b></TableCell>
                                <TableCell align="left">

                                    <TableSortLabel

                                        onClick={() => createSortHandler('toun')}
                                    >
                                        <b>עיר</b>


                                    </TableSortLabel>


                                </TableCell>
                                <TableCell align="center">
                                    <TableSortLabel

                                        onClick={() => createSortHandler('address')}
                                    >
                                        <b>כתובת</b>


                                    </TableSortLabel>



                                </TableCell>
                                <TableCell align="left">


                                    <TableSortLabel
                                        style={{
                                            width: '95px'
                                        }}
                                        onClick={() => createSortOfDate('dateBirth')}
                                    >
                                        <b>תאריך לידה</b>
                                    </TableSortLabel>


                                </TableCell>
                                <TableCell align="right"><b> תצלום</b></TableCell>
                                <TableCell align="right">
                                    <TableSortLabel

                                        onClick={() => createSortHandlerForStatus('status')}
                                    >
                                        <b>סטטוס</b>

                                    </TableSortLabel>

                                </TableCell>
                                <TableCell align="center">


                                    <TableSortLabel

                                        onClick={() => createSortHandlerForNumBike('numOrders')}>
                                        <b>הזמנות</b>
                                    </TableSortLabel>

                                </TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>


                            {handleFilter().map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell align="right">{row.name}</TableCell>
                                    <TableCell align="right">{row.tz}</TableCell>
                                    <TableCell align="right">{row.phon}</TableCell>
                                    <TableCell align="right">{row.mail}</TableCell>
                                    <TableCell align="right">{row.toun}</TableCell>
                                    <TableCell align="right">{row.address}</TableCell>
                                    <TableCell align="right">{row.dateBirth.substring(0, 10)}</TableCell>
                                    <TableCell align="right">

                                        <div>
                                            <label htmlFor="imageInput">
                                                <button onClick={() => openImage(row.id, row.pic)}>פתח תמונה</button>
                                            </label>

                                        </div>
                                   
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.status == true ?
                                            <Tooltip title="פעיל" placement="left-end">
                                                <Switch
                                                    checked={row.status}
                                                    onChange={() => change(row, row.status)}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            </Tooltip> : <Tooltip title="לא פעיל" placement="left-end">
                                                <Switch
                                                    checked={row.status}
                                                    onChange={() => change(row, row.status)}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            </Tooltip>}


                                    </TableCell>
                                    <TableCell align="center">{row.numOrders}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>

        </div>
    );
}
