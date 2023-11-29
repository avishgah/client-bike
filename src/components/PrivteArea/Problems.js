import * as React from 'react';
import { useState } from 'react';
import './Adit.css';
import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { useSelector } from 'react-redux';
import AttachmentIcon from '@mui/icons-material/Attachment';


const Problems = () => {
    let currentUser = useSelector(state => state.ur.user);

    const { register, handleSubmit, getValues, formState: { isValid, errors, dirtyFields, touchedFields, isDirty } } = useForm({
        mode: "all"
    });

    const [typeProblem, settypeProblem] = useState('תחזוקה - בוץ/לכלוך')
    const [placeProblem, setplaceProblem] = useState('תקלה באופניים')


    const [allBikes, setallBikes] = useState([])

    const PlaceArr = ['תקלה באופניים', 'תקלה בתחנה'];
    const TypeBikeProblem = ['תחזוקה - בוץ/לכלוך', 'כסא חסר/רופף', 'ידית שחרור מוט אוכף חסרה/תקולה ', 'סל נשיאה שבור/עקום', 'צג שבור/תקול'
        , 'ידית בלם שבורה/עקומה', 'גריפ חסר/קרוע', 'כידון עקום/רופף', 'מגן שרשרת שבור/חסר', 'שרשת רופפת/שבורה'
        , 'פנס קדמי תקול', 'פדאלים תקולים', 'פנס אחורי תקול ', 'הילוכים תקולים', 'כנף אחורית שבורה/עקומה', 'בלם אחורי תקול'
        , 'גלגל אחורי חסר/עקום', 'כנף קדמית שבורה/עקומה', 'גלגל קדמי עקום/חסר'];

    // React.useEffect(() => {
    //     axios.get('https://localhost:7207/api/User')
    //         .then(res => {
    //             console.log(res.data)
    //             // setUsers(res.data)
    //             // nav('/NavB')
    //         }).catch(err => console.log(err))
    // }, [])


    var l = '';
    const func = () => {
        l = document.getElementById("k").value;
        console.log(l)
    }

    const show = (t) => {

        let bike = document.getElementsByClassName("ShowBike");
        let station = document.getElementsByClassName("showStetion");
        if (t == 'תקלה באופניים') {
            for (var x = 0; x < bike.length; x++) {
                // bike[x].style.visibility = "visible";
                bike[x].style.display = "block";
            }
            for (var x = 0; x < station.length; x++) {
                // station[x].style.visibility = "hidden";
                station[x].style.display = "none";
            }
        }

        if (t == 'תקלה בתחנה') {
            for (var x = 0; x < station.length; x++) {
                // station[x].style.visibility = "visible";
                station[x].style.display = "block";

            }
            for (var x = 0; x < bike.length; x++) {
                // bike[x].style.visibility = "hidden";
                bike[x].style.display = "none";

            }
        }

    }

    const submit = (details) => {
        console.log("connect");
        console.log(placeProblem)
        var task=null;
        if (placeProblem == 'תקלה באופניים') {
            task =
            {
                "id": 0,
                "idCust": currentUser.id,
                "idStation": details.station,
                "caption": details.caption,
                "satisfactionLeve": 0,
                "date": new Date(),
                "place": placeProblem,
                "typeProblem": typeProblem,
                "idBike": details.bike,
                "pic": l
            }
        }
        else {
            task =
            {
                "id": 0,
                "idCust": currentUser.id,
                "idStation": details.station,
                "caption": details.caption,
                "satisfactionLeve": 0,
                "date": new Date(),
                "place": placeProblem,
                "typeProblem": '',
                "idBike": 31,
                "pic": l
            }
        }

        console.log(task)
        axios.post(`https://localhost:7207/api/Opinion`, task).then(res => {

            console.log(res.data + ";;;;;;");

            if (res.data == null) {
                alert("error")
                return null;

            }
        })

        console.log(task + "task");
    }
    return (<>
        <form id="formLoginR" onSubmit={handleSubmit(submit)}>

            <h1 id="h1">? תקלה באופניים או בתחנות העגינה </h1>
            <label>היכן התקלה</label><br></br>
            <select id='select'
                onChange={({ target }) => (setplaceProblem(target.value), show(target.value))}>
                {PlaceArr.map(marker => <option selected={placeProblem == marker} value={marker}>{marker}</option>)}
            </select><br></br><br></br>

            <select className="ShowBike" id='select'
                onChange={({ target }) => settypeProblem(target.value)} >
                {TypeBikeProblem.map(marker => <option selected={typeProblem === marker} value={marker}>{marker}</option>)}
            </select>
            <br></br><br></br>


            <label className="ShowBike">מספר מזהה של אפניים</label><br></br>
            <TextField className="ShowBike" variant="standard"
                {...register("bike")}
            />
            <br></br>

            <br></br><br></br>

            <label className="showStetion">מספר תחנה בה ממוקם</label><br></br>

            <TextField className="showStetion" variant="standard"
                {...register("station")}
            />

            <br ></br><br ></br>
          <div id="div-pic"   >
    
            <label>כאן ניתן להרחיב על הנושא, ונעשה מאמצים להשיב בהקדם</label><br></br><br></br>
            <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                defaultValue=""
                {...register("caption")}
            />


            <label id="ll">תמונה של התקלה</label>
            <br></br>
              <Button
                    endIcon={<AttachmentIcon />}
                    variant="contained"
                    component="label"
                    id="pid-button"
                    defaultValue={currentUser == null ? 'kk' : currentUser.pic}

                >
                    <input
                        // name="ll"
                        id="k"
                        type="file"
                        onChange={func}

                    />
                </Button>
                <p></p>



            </div>


            <br></br><br></br>
            <Button variant="contained" endIcon={<SendIcon />} id="addR" type="submit">
                עדכון
            </Button>
        </form>
    </>)
}
export default Problems