import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
// import { addUser } from "../../store/actions/UserActions";
// import "./Register.css";
import * as React from "react";
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import FormInput from "./FormInput/FormInput";
import Password from "./Password/Password";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Form } from "react-router-dom";

import * as type from "../../store/actions/actionType";
import { useRef } from "react";
import { cv } from 'react-opencv';
import Webcam from 'react-webcam';
import { TextField } from "@mui/material";


const arr = [
    { lableName: "שם משתמש מלא", name: "Name", type: "text" },
    { lableName: "תעודת זהות", name: "Tz", type: "text" },
    { name: "DateBirth", type: "date" },
    // { lableName: "עיר", name: "toun", type: "text" },
    // { lableName: "כתובת", name: "address", type: "text" },
    { lableName: "פלאפון", name: "Phon", type: "number" },
    { lableName: 'דוא"ל', name: "Mail", type: "mail" },
    { lableName: "סיסמא", name: "Password", type: "text" },
    // { lableName: "תצלום תעודת זהות", name: "img", type: "file" },
    { name: "ReadTerms", type: "checkbox", defaultValue: false }
];

const schema = yup.object({
    Name: yup.string().required("שדה זה חובה").min(4, 'השם אינו תקין'),
    Tz: yup.string()
        .matches(/^\d{9}$/, 'יש להזין מספר תעודת זהות חוקי בן 9 ספרות')
        .required('יש להזין מספר תעודת זהות'),
    Mail: yup.string().email("כתובת מייל אינה תקינה").required("שדה זה חובה"),
    Phon: yup.string()
        .matches(/^(0\d|(\+|00)972[\-\s]?)?(([23489]{1}\d{7})|[5]{1}\d{8})$/, 'יש להזין מספר טלפון חוקי')
        .required('יש להזין מספר טלפון'),
    Password: yup.string().required("שדה זה חובה")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, "הסיסמא חייבת להכיל 6 ספרות. לפחות מספר אחד.ולפחות אות אחת באנגלית."),
    DateBirth: yup.date()
        .max(new Date(new Date().setFullYear(new Date().getFullYear() - 16)), 'יש להיות בן 16 ומעלה')
        .typeError('יש להזין תאריך חוקי')
        .required('יש להזין תאריך לידה'),
    ReadTerms: yup.boolean().oneOf([true], 'יש לאשר את תנאי השימוש').required(),
    img: yup.mixed().test('file-required', 'יש להוסיף קובץ', value => {
        return (value && value.length) > 0 ? value : null // בדיקה אם הערך הוא לא ריק או undefined
    })


}).required();


const RegisterYup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [flag, setFlag] = React.useState(true);
    const fileInputRef = useRef(null);

    const user = useSelector(state => state.user);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    React.useEffect(() => { }, [user])

    const [listUsers, setlistUsers] = useState([]);
    const [isIDCardDetected, setIsIDCardDetected] = useState(false);

    const isIDCard = async () => {
        try {
            const cv = window.cv; // Access the OpenCV object
            if (!cv) {
                throw new Error('OpenCV library not initialized or loaded.');
            }

            // ... rest of your OpenCV processing code
        } catch (error) {
            console.error('Error processing image:', error);
        }
        const cv = window.cv; // Access the OpenCV object
        const imageElement = document.createElement('img');
        console.log(fileInputRef);
        const file = fileInputRef.current.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                imageElement.src = event.target.result;

                imageElement.onload = () => {
                    const mat = cv.imread(imageElement);
                    const gray = new cv.Mat();
                    const edges = new cv.Mat();

                    cv.cvtColor(mat, gray, cv.COLOR_RGBA2GRAY);
                    cv.Canny(gray, edges, 50, 150, 3);

                    const contours = new cv.MatVector();
                    const hierarchy = new cv.Mat();

                    cv.findContours(edges, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

                    let validContours = 0;
                    for (let i = 0; i < contours.size(); ++i) {
                        const approx = new cv.Mat();
                        const contour = contours.get(i);
                        const perimeter = cv.arcLength(contour, true);
                        cv.approxPolyDP(contour, approx, 0.02 * perimeter, true);

                        if (approx.rows === 4) {
                            const area = cv.contourArea(contour);
                            if (area > 5000) { // Adjust this area threshold according to your image sizes
                                validContours++;
                            }
                        }
                        approx.delete();
                    }

                    mat.delete();
                    gray.delete();
                    edges.delete();
                    hierarchy.delete();
                    contours.delete();

                    if (validContours === 1) {
                        setIsIDCardDetected(true)
                        console.log('The image contains only an ID card.');
                        // Perform further actions for when the image contains only an ID card
                    } else {
                        setIsIDCardDetected(false)
                        console.log('The image does not contain only an ID card.');
                    }
                };
            };
            reader.readAsDataURL(file);
        }
        // fileInputRef.current.addEventListener('change', isIDCard);
    };

    useEffect(() => {
        axios.get('https://localhost:7207/api/User')
            .then(res => {
                console.log(res.data)
                setlistUsers(res.data)
                //   console.log(currentStation);
                // nav('/NavB')
            }).catch(err => console.log(err))
    }, [])

    //e.target.files[0].name
    const axiosServer = async (details, type) => {
        console.log(details, "details")
        const x = await axios.post(`https://localhost:7207/api/user`, details).then(res => {
            console.log(res, "res");

            if (res.data == "") {
                alert("משתמש רשום במערכת")
                return null;
            }
            else {
                // alert("נוסף בהצלחה");
                navigate('/PeymentYup')

            }

        }).catch(error => {
            console.log("משתמש קיים");
            console.error(error)
        })

    }

    // פונקצית הרשמה
    // הפונקציה מתבצעת במידה וכל הנתונים שהוזנו בשדות עונים לדרישות הסכמה
    const onSubmit = async (data) => {
        try {

            await schema.validate(data, { abortEarly: false }); // אימות עם Yup
            // פעולות נוספות במידת הצורך לאחר בדיקת תקינות מוצלחת
            await axiosServer(data, 'IsExist');
        } catch (errors) {
            console.log(errors);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="location">
            {arr.map(item => <div key={item.name}>
                {
                    item.name !== "Password" ? (
                        <div>

                            <FormInput
                                lableName={item.name === "ReadTerms" ? (
                                    <a href='/page.txt' download>תקנון שימוש</a>
                                ) : (item.lableName)}
                                name={item.name}
                                type={item.type}
                                errors={errors}
                                register={register}
                                user={user}
                                flag={false}
                                defaultChecked={item.defaultValue}

                            />

                        </div>
                    ) : (
                        <Password
                            errors={errors}
                            register={register}
                            name={"Password"}
                            labelName={"סיסמא"}
                        />
                    )
                }

            </div>

            )}
            <div>
                <input type="file" name="img" accept="image/*" ref={fileInputRef} onChange={isIDCard}
                    style={{ backgroundColor: "#ebedf0", width: "23vw" ,padding:"15px", border:"1px solid #b5b6b8" , borderRadius:"5px"}} />
                {isIDCardDetected ? <p>The image contains an ID card.</p> : <p>No ID card detected in the image.</p>}
            </div>
            <Button variant="contained"
                size="medium"
                type="submit"
                id="addR"
            >
                לשלב הבא
            </Button>
            <br /> <br />
            <p className="move">
                כבר רשום? עבור <span onClick={() => navigate('/Connection')} >להתחברות</span>
            </p>
        </form>
    )
}
export default RegisterYup;