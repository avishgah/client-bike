import './AddStation.scss'
import * as React from 'react';
import Box from '@mui/material/Box';


import TextField from '@mui/material/TextField';
import { Button, Stack } from '@mui/material';

import axios from 'axios';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import '../AddBike/AddBike.css';

import { useState } from "react";
import ReactGoogleAutocomplete from 'react-google-autocomplete';
import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';




const AddStation = () => {


    const [isDisabled, setDisabled] = useState(false);

    const handleSubmits = () => {
        console.log('Your button was clicked and is now disabled');

    }

    const { register, handleSubmit, getValues, formState: { isValid, errors, dirtyFields, touchedFields, isDirty } } = useForm({
        mode: "all"
    });
    const nav = useNavigate();


    const [showPassword, setShowPassword] = React.useState(false);

    const [places, setPlace] = React.useState("");
    const [stations, setStations] = React.useState(0);
    const [city, setCity] = React.useState("");
    const [lat, setLat] = React.useState(0);
    const [lng, setLng] = React.useState(0);
    var stat = 0;
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const restasrt = () => {

    }

    const getDetails = (x, y, z, m) => {
        console.log(x)
        if (x.address_components.length > 4) {
            setPlace(x.address_components[0].long_name + " " + x.address_components[1].long_name)

        }
        else {
            setPlace(x.address_components[0].long_name)

        }

        setCity(x.address_components[2].long_name)
        // console.log(y.formatted_address)
        setLat(z.lat)
        setLng(m.lng)


    }
    const postStation = async (station) => {
        const x = await axios.post(`https://localhost:7207/api/Station`, station).then(res => {

            console.log(res.data + ";;;;;;");
            document.getElementById("addMore").style.display = "inline";
            document.getElementById("end").style.display = "inline";

            if (res.data == null) {
                alert("error")
                setDisabled(false);
                return null;
            }
        }).catch(console.log("err"))

    }

    const getStation = async () => {
        const x = await axios.get('https://localhost:7207/api/Station').then(res => {
            console.log(res.data.length);
            console.log(res.data)
            var d = res.data.length + 1;
            // add bikes num details
            // for (var i = 0; i < details.bike; i++) {
            //     console.log(d)
            //     const bike = {
            //         "id": 0,
            //         "code": "hh",
            //         "battery": 0,
            //         "idStation": d,
            //         "dateStart": new Date()
            //     }
            //     console.log(details);
            //     axios.post(`https://localhost:7207/api/Bike`, bike).then(res => {


            //         // document.getElementById("addMore").style.display = "inline";
            //         // document.getElementById("end").style.display = "inline";

            //         if (res.data == null) {
            //             alert("error")
            //             setDisabled(false);
            //             return null;
            //         }
            //     }).catch(console.log("err"))
            // }
        })

    }
    //הוספת אפנים עובד - בעיה - הקוד לא ייחודי 
    const submit = (details) => {
        const station = {
            "id": 0,
            "location": city,
            "name": places,
            "status": true,
            "lat": lat,
            "lng": lng
        }
        console.log(details);
        //add station

        postStation(station);
        getStation();
        //איך לרענן את הסקיואל
        //get the last station
        // window.location.reload(true);





    }

    return (<>


        <form id="formLoginR" onSubmit={handleSubmit(submit)}>
            <TextField
                label="מספר אפנים "
                id="demo-helper-text-aligned"
                {...register("bike", {})}
            /><br></br>
            {/* <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '& > :not(style)': { m: 1 },
                }}
            >
                <Stack>
                  
                    <TextField
                        label="כתובת "
                        id="demo-helper-text-aligned"
                        {...register("adress", {})}
                    />
                </Stack>

            </Box>
            {/* endIcon={<SendIcon />}  */}
            <ReactGoogleAutocomplete
                __
                style={{ padding: 10, borderColor: "rgb(30, 75, 199)", borderRadius: 10 }}
                apiKey={"AIzaSyDd2yrRfnh88OiKs8yCiH-8uK5aASNgve8"}
                onPlaceSelected={(place) => getDetails(place, { formatted_address: place.formatted_address.toString() }, { lat: place.geometry.location.lat() }, { lng: place.geometry.location.lng() })}

                options={{
                    componentRestrictions: { country: 'ISR' },
                    types: ["route"],
                }
                }

            />
            {console.log(places + "ll")}
            <Button type="button" id="addMore" onClick={() => (nav('/addStation'))}>
                הוסף עוד תחנה
            </Button>
            <Button type="button" id="end" onClick={() => (nav('/'))}>
                סיום
            </Button>
            <Stack direction="row" spacing={2}>

                <Button variant="contained" id="addR" type="submit">
                    התחבר
                </Button>

            </Stack>
        </form>
    </>)

}

export default AddStation;
