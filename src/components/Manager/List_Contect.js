import { useEffect, useState } from "react";
import XL from "../export to xl/XL";
import { Button, Switch, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, Tooltip } from "@mui/material";
import axios from "axios";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { types } from "sass";

const List_Contect = () => {


    useEffect(() => {
        axios.get('https://localhost:7207/api/Contact')
            .then(res => {
                console.log(res.data)
                setlistContect(res.data)
                // nav('/NavB')
            }).catch(err => console.log(err))
    }, [])


    const [listContect, setlistContect] = useState([]);

    const [sortOrder, setsortOrder] = useState('desc');



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

    const [inputValue, setInputValue] = useState('');
    let filteredOptions = [];

    const handleFilter = () => {
        console.log("enter");

        // filteredOptions = TypeProblem != 'הכל' || placeProblem != 'הכל'  ? listContect.filter((option) => option.type.toLowerCase().includes(TypeProblem.toLowerCase())) && filteredOptions.filter((option) => placeProblem=='בעיות שטופלו'? !option.status : option.status): listContect;
        filteredOptions = (TypeProblem !== 'הכל' || placeProblem !== 'הכל')
            ? listContect.filter((option) =>
                (TypeProblem === 'הכל' || option.type.toLowerCase().includes(TypeProblem.toLowerCase())) &&
                (placeProblem === 'הכל' || (placeProblem === 'בעיות שטופלו' ? !option.status : option.status))
            )
            : listContect;
        // filteredOptions = ? : listContect;

        filteredOptions = filteredOptions.filter(x => {

            return (
                // (x.numOrders >= numberValue) &&
                ((!inputValue) ||
                    x.email?.toString().includes(inputValue) ||
                    x.name?.toString().includes(inputValue) ||
                    x.cuption?.toString().includes(inputValue) ||
                    x.type?.toString().includes(inputValue))
            );
        });
        return filteredOptions;
    };


    const sortProblem = () => {

        const filteredList = listContect.filter(x => x.status !== false);

        setlistContect(filteredList);

    }
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

    const data = ["id", "name", "phon", "email", "type", "cuption"];
    const dataName = ["קוד בעיה", "שם", "טלפון", "מייל", "סוג", "פירוט"];

    const PlaceArr = ['הכל', 'בעיות שטופלו', 'בעיות שלא טופלו'];
    const [placeProblem, setplaceProblem] = useState('הכל');

    const TypeArr = ['הכל', 'נושאי חיובים', 'דיווח על תקלה', 'בקשה למחיקת חשבון', 'אחר'];
    const [TypeProblem, setTypeProblem] = useState('הכל');

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
                {/* <label className='p-dates'>כמות הזמנות:  </label>
                <input className='input-dates' type='number' style={{ height: "30px" }} placeholder="הכנס מספר..." value={numberValue} onChange={({ target }) => setnumberValue(target.value)} /> */}
                <input className='input-dates' style={{ height: "30px" }} placeholder="חיפוש חופשי..." value={inputValue} onChange={({ target }) => setInputValue(target.value)} />
                <XL data={data} dataName={dataName} arr={handleFilter()} />

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 100 }} aria-label="caption table">
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
                                            <Button id="opinB" onClick={() => deleteItem(row.id)}>delete</Button>

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