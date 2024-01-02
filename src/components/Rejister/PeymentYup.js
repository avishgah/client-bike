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

const arr = [
    { lableName: "שם של בעל הכרטיס", name: "Name", type: "text" },
    { lableName: "ת.ז של בעל הכרטיס", name: "Tz", type: "text" },
    { lableName: "מספר כרטיס אשראי", name: "Card", type: "text" },
    { lableName: "CVV", name: "Cvv", type: "text" },
    { lableName: "תוקף MM/YY", name: "Tokef", type: "text" },
];

const schema = yup.object({
    Name: yup.string().required("שדה זה חובה").min(4, 'השם אינו תקין'),
    Tz: yup.string()
        .matches(/^\d{9}$/, 'יש להזין מספר תעודת זהות חוקי בן 9 ספרות')
        .required('יש להזין מספר תעודת זהות'),

    Card: yup.string()
        .matches(/^\d{16}$/, 'מספר כרטיס לא תקין')
        .required('שדה זה הוא חובה'),
    Cvv: yup
        .string()
        .matches(/^\d{3}$/, 'CVV לא תקין')
        .required('שדה זה הוא חובה'),
    Tokef: yup
        .string()
        .matches(
            /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/,
            'תאריך תוקף לא תקין (MM/YY או MM/YYYY)'
        )
        .test('is-date-valid', 'תאריך תוקף אינו תקין', (value) => {
            if (!value) return false;

            // פירוק תאריך לחלקיו
            const [month, year] = value.split('/');
            if (!month || !year) return false;

            // קבלת התאריך הנוכחי
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear() % 100; // לקבלת שנת עשורים אחרונה

            // ודא תקינות התאריך - ייחודיות בהתאם לדרישות שלך
            if (
                parseInt(month, 10) < 1 ||
                parseInt(month, 10) > 12 ||
                parseInt(year, 10) < currentYear ||
                (parseInt(year, 10) === currentYear && parseInt(month, 10) < currentDate.getMonth() + 1)
            ) {
                return false;
            }

            return true;
        })
        .required('שדה זה הוא חובה')
})
    ;


const PeymentYup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [flag, setFlag] = React.useState(true);
    const user = useSelector(state => state.user);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    React.useEffect(() => { }, [user])

    const [listUsers, setlistUsers] = useState([]);

   

    const nav = useNavigate();

    // פונקצית הרשמה
    // הפונקציה מתבצעת במידה וכל הנתונים שהוזנו בשדות עונים לדרישות הסכמה
    const onSubmit = async (data) => {
        try {

            await schema.validate(data, { abortEarly: false }); // אימות עם Yup
            nav('/Profil');
            // פעולות נוספות במידת הצורך לאחר בדיקת תקינות מוצלחת
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
            <Button variant="contained"
                size="medium"
                type="submit"
                id="addR"
            >
                הרשם
            </Button>
            <br /> <br />
            <p className="move">
                כבר רשום? עבור <span onClick={() => navigate('/Connection')} >להתחברות</span>
            </p>
        </form>
    )
}
export default PeymentYup;