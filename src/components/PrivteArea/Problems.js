import * as React from 'react';
import { useState } from 'react';
import './Adit.css';
import { Alert, Button, TextField } from '@mui/material';
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
    const [file, setFile] = useState(null);

    const [selectedImage, setSelectedImage] = React.useState(null);

    const PlaceArr = ['תקלה באופניים', 'תקלה בתחנה'];
    const TypeBikeProblem = ['תחזוקה - בוץ/לכלוך', 'כסא חסר/רופף', 'ידית שחרור מוט אוכף חסרה/תקולה ', 'סל נשיאה שבור/עקום', 'צג שבור/תקול'
        , 'ידית בלם שבורה/עקומה', 'גריפ חסר/קרוע', 'כידון עקום/רופף', 'מגן שרשרת שבור/חסר', 'שרשת רופפת/שבורה'
        , 'פנס קדמי תקול', 'פדאלים תקולים', 'פנס אחורי תקול ', 'הילוכים תקולים', 'כנף אחורית שבורה/עקומה', 'בלם אחורי תקול'
        , 'גלגל אחורי חסר/עקום', 'כנף קדמית שבורה/עקומה', 'גלגל קדמי עקום/חסר'];


    const PostTask = (task) => {
        axios.post(`https://localhost:7207/api/Opinion`, task).then(res => {

            console.log(res.data + ";;;;;;");
            document.getElementById('alertC').style.visibility = "visible";
            if (res.data == null) {
                alert("error")
                return null;

            }
        })
    }

    const submit = (details) => {
        console.log("connect");
        console.log(placeProblem)
        console.log(file)

        let flagEnter = 0;
        let task = null;
        if (placeProblem == 'תקלה באופניים') {
            axios.get(`https://localhost:7207/api/Bike/${details.bike}`).then(res => {
                console.log("enter to bike")
                console.log("res", res.data)
                if (res.data == '')
                    alert("קוד אופניים שגוי")
                else {
                    console.log("enter tast")
                    task =
                    {
                        "id": 0,
                        "idCust": 5,
                        "idStation": res.data.idStation,
                        "caption": details.caption,
                        "satisfactionLeve": 0,
                        "date": new Date(),
                        "place": placeProblem,
                        "typeProblem": typeProblem,
                        "idBike": details.bike,
                        "pic": selectedImage
                    }
                    PostTask(task);
                }
            })

        }
        else {

            axios.get(`https://localhost:7207/api/Station/${details.station}`).then(res => {
                console.log("enter to station")
                console.log("res", res.data)
                if (res.data == '')
                    alert("קוד תחנה שגוי")
                else {
                    task =
                    {
                        "id": 0,
                        "idCust": 5,
                        "idStation": details.station,
                        "caption": details.caption,
                        "satisfactionLeve": 0,
                        "date": new Date(),
                        "place": placeProblem,
                        "typeProblem": '',
                        "idBike": null,
                        "pic": selectedImage
                    }
                    PostTask(task)
                }
            })

        }

        console.log(task)


        if (flagEnter == 1)
            console.log(task + "task");
    }

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

    return (<>
        <form id="formLoginR" style={{ direction: "rtl" }} onSubmit={handleSubmit(submit)}>

            <h1 id="h1">תקלה באופניים או בתחנות העגינה ?</h1>
            <label>היכן התקלה</label><br></br>
            <select id='select'
                onChange={({ target }) => (setplaceProblem(target.value))}>
                {PlaceArr.map(marker => <option selected={placeProblem == marker} value={marker}>{marker}</option>)}
            </select><br></br><br></br>

            {
                placeProblem == 'תקלה באופניים' ? <>

                    <select className="ShowBike" id='select'
                        onChange={({ target }) => settypeProblem(target.value)} >
                        {TypeBikeProblem.map(marker => <option selected={typeProblem === marker} value={marker}>{marker}</option>)}
                    </select><br></br><br></br>


                    <label className="ShowBike">מספר מזהה של אפניים</label><br></br>
                    <TextField className="ShowBike" variant="standard"

                        style={errors.name ? { border: "red solid 1px", borderRadius: "5px" } : null}

                        defaultValue={currentUser == null ? '' : currentUser.id}
                        {...register("bike", {
                            required: "id is required",

                        })}
                    />

                </> : <>
                    <label className="showStetion">מספר תחנה בה ממוקם</label><br></br>

                    <TextField className="showStetion" variant="standard"
                        {...register("station")}
                    />
                </>
            }


            <br></br>

            <br ></br><br ></br>
            <div id="div-pic"   >

                <label>כאן ניתן להרחיב על הנושא, ונעשה מאמצים להשיב בהקדם</label><br></br><br></br>
                <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    defaultValue=""
                    {...register("caption")}
                /><br></br><br></br>


                <label id="ll"> תמונה של התקלה:</label>
                <br></br>
                <Button
                        style={{ backgroundColor: "#905e03", width: "22vw" }}
                        endIcon={<AttachmentIcon />}
                        variant="contained"
                        component="label"
                        id="pid-button"
                    >
                        <div>
                            <input
                                type="file"
                                onChange={handleImageChange}
                                id="imageInput"
                            />
                        </div>
                    </Button>
                <p></p>
            </div>


            <br></br><br></br>
            <Button variant="contained" startIcon={<SendIcon style={{ marginLeft: "15px" }} />} id="addR" type="submit">
                שלח
            </Button><br></br><br></br>
            <Alert id="alertC" style={{width:"300px"}} severity="success">! ההודעה נשלחה בהצלחה </Alert>

        </form>
    </>)
}
export default Problems;