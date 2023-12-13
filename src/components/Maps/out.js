import { pl } from "date-fns/locale"
import ReactGoogleAutocomplete from "react-google-autocomplete"

const Out = () => {
    return <ReactGoogleAutocomplete

        style={{ padding: 10, borderColor: "rgb(30, 75, 199)", borderRadius: 10 }}
        apiKey={"AIzaSyDd2yrRfnh88OiKs8yCiH-8uK5aASNgve8"}
        onPlaceSelected={(place) => console.log(place, { lat: place.geometry.location.lat() }, { lng: place.geometry.location.lng() })}
        options={{
            componentRestrictions: { country: 'ISR' },
            types: ["route"],
        }
        }
    ////////////////
    // function calculateDistances(pt,closest,numberOfResults) {
    //     var service = new google.maps.DistanceMatrixService();
    //     var request =    {
    //         origins: [pt],
    //         destinations: [],
    //         travelMode: google.maps.TravelMode.DRIVING,
    //         unitSystem: google.maps.UnitSystem.METRIC,
    //         avoidHighways: false,
    //         avoidTolls: false
    //       };
    //     for (var i=0; i<closest.length; i++) {
    //       request.destinations.push(closest[i].getPosition());
    //     }
    //     service.getDistanceMatrix(request, function (response, status) {
    //       if (status != google.maps.DistanceMatrixStatus.OK) {
    //         alert('Error was: ' + status);
    //       } else {
    //         var origins = response.originAddresses;
    //         var destinations = response.destinationAddresses;
    //         var outputDiv = document.getElementById('side_bar');
    //         outputDiv.innerHTML = '';

    //         var results = response.rows[0].elements;
    //         // save title, address and index of marker in record for sorting
    //         for (var i=0; i<closest.length;i++) {
    //            results[i].title = closest[i].title;
    //            results[i].address = closest[i].address;
    //        results[i].idx_closestMark = i;
    //         }
    //         results.sort(sortByDistDM);
    //         for (var i = 0; ((i < numberOfResults) && (i < closest.length)); i++) {
    //           closest[i].setMap(map);
    //           outputDiv.innerHTML += "<a href='javascript:google.maps.event.trigger(closest["+results[i].idx_closestMark+"],\"click\");'>"+results[i].title + '</a><br>' + results[i].address+"<br>"
    //               + results[i].distance.text + ' appoximately '
    //               + results[i].duration.text + '<br><hr>';
    //         }
    //       }
    //     });
    //   }

    //   function sortByDistDM(a,b) {
    //      return (a.distance.value- b.distance.value)
    //   }
    />
}

export default Out;