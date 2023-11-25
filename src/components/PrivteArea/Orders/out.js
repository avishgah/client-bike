import { pl } from "date-fns/locale"
import ReactGoogleAutocomplete from "react-google-autocomplete"

const Out = () => {
    return <ReactGoogleAutocomplete

        style={{  padding:10 , borderColor:"rgb(30, 75, 199)", borderRadius:10}}
        apiKey={"AIzaSyDd2yrRfnh88OiKs8yCiH-8uK5aASNgve8"}
        onPlaceSelected={(place) => console.log(place, { lat: place.geometry.location.lat() }, { lng: place.geometry.location.lng() })}
        options={{
            componentRestrictions: { country: 'ISR' },
            types: ["route"],
        }
        }

    />
}

export default Out;