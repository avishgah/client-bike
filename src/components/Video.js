import { Card } from "@mui/material";

const Video = () => {

    return (<>
        <Card sx={{ marginLeft: "32vw", marginTop: "3vw", boxShadow: "none" }}>
            <h1 style={{marginRight:"27vw"}}>תהליך השכרת אופניים חשמליים</h1><br></br>
            <video width="320" height="240" controls>
                <source src="./Images/video.mp4" type="video/mp4"></source>
                Your browser does not support the video tag.
            </video>
        </Card><br></br><br></br>
    </>)
}


export default Video;