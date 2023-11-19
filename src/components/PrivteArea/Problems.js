
import './Adit.css';


const PlaceProblem=['תקלה באופניים','תקלה בתחנה'];
const Problems = () => {


    return (<>

        <h1>? תקלה באופניים או בתחנות העגינה </h1>
        <select
            onChange={({ target }) => setSlectedPoint(target.value)}>
            {PlaceProblem.map(marker => <option selected={selectPoin === marker.id} value={marker.Id}>{marker.name} {marker.location}</option>)}
        </select>
    </>)
}
export default Problems