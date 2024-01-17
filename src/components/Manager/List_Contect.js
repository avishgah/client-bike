import { useEffect, useState } from "react";
import XL from "../export to xl/XL";
import { Button, Switch, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, Tooltip } from "@mui/material";
import axios from "axios";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

const List_Contect = () => {

    const data = ["id", "name", "phon", "email", "date", "type", "cuption"];
    const dataName = ["קוד בעיה", "שם", "טלפון", "מייל", "תאריך תלונה", "סוג", "פירוט"];

    const PlaceArr = ['הכל', 'בעיות שטופלו', 'בעיות שלא טופלו'];
    const [placeProblem, setplaceProblem] = useState('הכל');

    const TypeArr = ['הכל', 'נושאי חיובים', 'דיווח על תקלה', 'בקשה למחיקת חשבון', 'אחר'];
    const [TypeProblem, setTypeProblem] = useState('הכל');

    const [fromDate, setfromDate] = useState('')
    const [toDate, settoDate] = useState('');

    const [listContect, setlistContect] = useState([]);

    const [sortOrder, setsortOrder] = useState('desc');

    const [inputValue, setInputValue] = useState('');
    let filteredOptions = [];

    useEffect(() => {
        axios.get('https://localhost:7207/api/Contact')
            .then(res => {
                console.log(res.data)
                setlistContect(res.data)
                // nav('/NavB')
            }).catch(err => console.log(err))
    }, [])


    function deleteItem(id) {

        if (window.confirm("האם אתה בטוח שברצונך למחוק")) {

            axios.delete(`https://localhost:7207/api/Contact/${id}`).then(res => {
            })

            const copy = listContect.filter(x => x.id != id);
            setlistContect(copy);

            console.log("deleted")
        }

        else {
            console.log("exit")
        }
    }

    const createSortHandler = (key) => {
        const listCopy = [...listContect];

        // Toggle between 'asc' and 'desc'
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';

        listCopy.sort((a, b) => {
            if (newSortOrder === 'asc') {
                return a[key].toString().localeCompare(b[key].toString());
            } else {
                return b[key].toString().localeCompare(a[key].toString());
            }
        });

        setlistContect(listCopy);
        setsortOrder(newSortOrder);
    }

    const handleFilter = () => {
        console.log("enter");

        // filteredOptions = TypeProblem != 'הכל' || placeProblem != 'הכל'  ? listContect.filter((option) => option.type.toLowerCase().includes(TypeProblem.toLowerCase())) && filteredOptions.filter((option) => placeProblem=='בעיות שטופלו'? !option.status : option.status): listContect;
        filteredOptions = (TypeProblem !== 'הכל' || placeProblem !== 'הכל')
            ? listContect.filter((option) =>
                (TypeProblem === 'הכל' || option.type?.toLowerCase().includes(TypeProblem?.toLowerCase())) &&
                (placeProblem === 'הכל' || (placeProblem === 'בעיות שטופלו' ? !option.status : option.status))
            )
            : listContect;

        filteredOptions = filteredOptions.filter(x => {

            const startDate = new Date(x.date);
            const fromDateObj = fromDate ? new Date(fromDate) : null;
            const toDateObj = toDate ? new Date(toDate) : null;

            const isFromDateValid = !fromDateObj || startDate >= fromDateObj;
            const isToDateValid = !toDateObj || startDate <= toDateObj;


            return (
                (isFromDateValid && isToDateValid)
                &&
                ((!inputValue) ||
                    x.email?.toString().includes(inputValue) ||
                    x.name?.toString().includes(inputValue) ||
                    x.cuption?.toString().includes(inputValue))
            );
        });
        return filteredOptions;
    };

    const change = (u, status) => {

        if (window.confirm("האם אתה בטוח שברצונך לשנות את סטטוס התלונה? ")) {

            console.log(u)

            const contact = {
                "id": 0,
                "name": u.name,
                "email": u.email,
                "phon": u.phon,
                "type": u.type,
                "cuption": u.cuption,
                "status": !status
            }

            console.log(contact)
            axios.put(`https://localhost:7207/api/Contact/${u.id}`, contact).then(res => {
                console.log("kk");
                axios.get('https://localhost:7207/api/Contact')
                    .then(res => {
                        console.log(res.data)
                        setlistContect(res.data)
                        // nav('/NavB')
                    }).catch(err => console.log(err))
            })

        }
        else {
            console.log("exit")
        }

    }

    // תצוגה יפה של תאריך
    function formatDateTime(dateTimeString) {
        const dateStart = new Date(dateTimeString); // המשתנה כאן יכול להיות המשתנה שלך props.dateStart

        const day = dateStart.getDate();
        const month = dateStart.getMonth() + 1; // החודשים מתחילים מ־0, לכן נוסיף 1
        const year = dateStart.getFullYear();
        const hours = dateStart.getHours();
        const minutes = dateStart.getMinutes();
        const seconds = dateStart.getSeconds();

        const formattedDatex = `${day}.${month}.${year}, ${hours}:${minutes}:${seconds}`;
        return formattedDatex;



    }

    // מיון של תאריך 

    const createSortOfDate = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        performSort('date', newSortOrder);
        setsortOrder(newSortOrder);
    };
    const performSort = (property, order) => {
        const sortedData = [...listContect].sort((a, b) => {
            // Parse date strings to compare
            const dateA = new Date(a[property]);
            const dateB = new Date(b[property]);

            if (order === 'asc') {
                return dateA - dateB;
            } else {
                return dateB - dateA;
            }
        });

        setlistContect(sortedData);
    };


    return (
        <div class="flex-container">
            <div class="flex-item-left">
                {console.log(listContect, "ךןדאאאאאאאאאאאא")}

                <select id='selectListOpinion' style={{ padding: "5.3px" }}
                    onChange={({ target }) => (setTypeProblem(target.value))}>
                    {TypeArr.map(marker => <option selected={TypeProblem == marker} value={marker}>{marker}</option>)}
                </select>

                <select id='selectListOpinion' style={{ padding: "5.3px" }}
                    onChange={({ target }) => (setplaceProblem(target.value))}>
                    {PlaceArr.map(marker => <option selected={placeProblem == marker} value={marker}>{marker}</option>)}
                </select>

                <label className='p-dates'>מ:  </label>
                <input className='input-dates' type='date' value={fromDate} onChange={({ target }) => setfromDate(target.value)} />
                <label className='p-dates'> עד:   </label>
                <input className='input-dates' type='date' value={toDate} onChange={({ target }) => settoDate(target.value)} />

                <input className='input-dates' style={{ height: "30px" }} placeholder="חיפוש חופשי..." value={inputValue} onChange={({ target }) => setInputValue(target.value)} />

                <XL data={data} dataName={dataName} arr={handleFilter()} />

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 50 }} aria-label="caption table">
                        <caption>A basic table example with a caption</caption>
                        <TableHead>
                            <TableRow>

                                {/* <TableCell><b></b></TableCell> */}
                                <TableCell align="center">

                                    <TableSortLabel

                                        onClick={() => createSortHandler('name')}
                                    >
                                        <b>שם</b>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="center">


                                    <b>טלפון</b>
                                    <TableSortLabel

                                    // onClick={() => createSortHandler('email')}
                                    >
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="center">
                                    <TableSortLabel

                                    // onClick={() => createSortHandlerForStatus('phon')}
                                    >
                                        <b>דוא"ל</b>

                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="center">

                                    <TableSortLabel
                                        style={{
                                            width: '95px'
                                        }}
                                        onClick={() => createSortOfDate('data')}
                                    >
                                        <b>תאריך  </b>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="center">

                                    <TableSortLabel

                                    // onClick={() => createSortHandlerForNumBike('type')}
                                    >
                                        <b>תקלה  </b>
                                    </TableSortLabel>

                                </TableCell>
                                <TableCell align="center">

                                    <TableSortLabel

                                    // onClick={() => createSortHandlerForNumBike('cuption')}
                                    >
                                        <b>פירוט</b>
                                    </TableSortLabel>

                                </TableCell>
                                <TableCell align="center">

                                    <TableSortLabel

                                    // onClick={() => createSortHandlerForNumBike('cuption')}
                                    >
                                        <b>סטטוס בעיה</b>
                                    </TableSortLabel>

                                </TableCell>
                                <TableCell align="center">

                                    <TableSortLabel

                                    // onClick={() => createSortHandlerForNumBike('cuption')}
                                    >
                                        <b>רלוונטית ?</b>
                                    </TableSortLabel>

                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>


                            {handleFilter().map((row) => (
                                <>

                                    <TableRow key={row.id}>

                                        <TableCell align="center">{row.name}</TableCell>
                                        <TableCell align="center">{row.phon}</TableCell>
                                        <TableCell align="center">{row.email}</TableCell>
                                        <TableCell align="center" sx={{ direction: "ltr" }}>{formatDateTime(row.date)}</TableCell>
                                        <TableCell align="center">{row.type}</TableCell>
                                        <TableCell align="center">{row.cuption}</TableCell>
                                        <TableCell align="center">
                                            {row.status == true ?
                                                <Tooltip title="לא טופלה" placement="left-end">
                                                    <Switch
                                                        checked={!row.status}
                                                        onChange={() => change(row, row.status)}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                </Tooltip> : <Tooltip title="טופלה" placement="left-end">
                                                    <Switch
                                                        checked={!row.status}
                                                        onChange={() => change(row, row.status)}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                </Tooltip>}


                                        </TableCell>
                                        <TableCell align="center">
                                            <Button id="opinB2" onClick={() => deleteItem(row.id)}>delete</Button>

                                        </TableCell>
                                    </TableRow>
                                </>))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>)
}

export default List_Contect;