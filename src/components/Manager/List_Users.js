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

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SendIcon from '@mui/icons-material/Send';
import './Manager.css';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import { Button, IconButton, TableSortLabel, Tooltip } from '@mui/material';
import { Switch, switchClasses } from '@mui/joy';

import AddUser from '../AddUser/AddUser';
import RegisterAdd from './RegisterAdd';
import XL from '../export to xl/XL';
export default function AccessibleTable() {


    const [listUsers, setlistUsers] = useState([]);


    const [checked, setChecked] = React.useState(false);

    // const [u, setuseru] = useState(null);
    const change = (id, status) => {

        if (window.confirm("האם אתה בטוח שברצונך לשנות את סטטוס המשתמש ")) {

            console.log(id);
            var u = null;
            axios.get(`https://localhost:7207/api/User/${id}`).then(res => {
                console.log(res.data)
                u = res.data;
                console.log(u)

                const user =
                {
                    "name": u.name,
                    "address": u.address,
                    "mail": u.mail,
                    "password": u.password,
                    "toun": u.toun,
                    "phon": u.phon,
                    "tz": u.tz,
                    "dateBirth": u.dateBirth,
                    "pic": u.pic,
                    "isManager": false,
                    "status": !status,
                    "readTerms": true
                }

                console.log(user)
                axios.put(`https://localhost:7207/api/User/UpdateUser/${id}`, user).then(res => {
                    console.log("kk");
                })
                window.location.reload(true);

            }).catch(err => console.log(err))
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
    const deleteFunc = (id) => {
        console.log(id)
    }

    function myFunction() {
        var txt;
        if (window.confirm("האם אתה בטוח שברצונך למחוק")) {

            // axios.delete(`https://localhost:7207/api/Bike/${id}`).then(res => {
            alert("נמחק בהצלחה")
            window.location.reload(true);
            // })
            console.log("deleted")
        }
        else {
            console.log("exit")
        }
    }
    const [open, setOpen] = React.useState(false);

    const showPic = (pic) => {
        alert(pic);
    }

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const [selectedImage2, setSelectedImage2] = useState(null);
    useEffect(() => {
        if (selectedImage2) {
            openImageInNewTab(selectedImage2.src);
        }
    }, [selectedImage2]);
    const [inputValue, setInputValue] = useState('')


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
    const [numberValue, setnumberValue] = useState('');

    const [sortOrder, setsortOrder] = useState('desc');

    const handleFilter = () => {
        console.log("enter");
        return listUsers.filter(x => {
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


    const data = ["id", "name", "tz", "phon", "mail", "toun", "address", "dateBirth", "status"];
    const dataName = ["קוד משתמש", "שם", "תעודת זהות", "טלפון", "דוא''ל", "עיר", "כתובת", "תאריך לידה", "סטטוס"]

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
                                    {/* <DeleteOutlineIcon id="icon2"/> */}



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

                                        {/* <div>
                                            <input
                                                type="file"
                                                // accept="image/*"
                                                onChange={handleImageChange}
                                                // style={{ display: 'none' }}
                                                id="imageInput"
                                            />
                                            <label htmlFor="imageInput">
                                                <button>בחר תמונה</button>
                                            </label>

                                            {selectedImage && (
                                                <div>
                                                    <p>תמונה שנבחרה:</p>
                                                    <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%' }} />
                                                </div>
                                            )}
                                        </div> */}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.status == true ?
                                            <Tooltip title="פעיל" placement="left-end">
                                                <Switch
                                                    checked={row.status}
                                                    onChange={() => change(row.id, row.status)}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            </Tooltip> : <Tooltip title="לא פעיל" placement="left-end">
                                                <Switch
                                                    checked={row.status}
                                                    onChange={() => change(row.id, row.status)}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            </Tooltip>}


                                    </TableCell>
                                    <TableCell align="center">{row.numOrders}</TableCell>
                                    {/* <Button variant="contained" endIcon={<SendIcon />} id="addRC" type="submit">
                        
                    </Button>
              <IconButton >{DeleteIcon}</IconButton> */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>

        </div>
    );
}
