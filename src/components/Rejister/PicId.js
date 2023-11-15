// import './Payment2.css';
import AttachmentIcon from '@mui/icons-material/Attachment';
import Box from '@mui/material/Box';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


let namePic;
let r = "1.png";


const Change = () => {
    alert("ll")

    namePic = document.querySelector('input').value;
    console.log(namePic);
    r = namePic.substring(12);
    console.log(r)

}

const PicId = () => {

    return (<>
        <h5>תצלום תעודת זהות / דרכון</h5>

        <div id="div-pic">
          
            <Button
                endIcon={<AttachmentIcon />}
                variant="contained"
                component="label"
                id="pid-button"
            >
                <input

                    type="file"
                // hidden
                />
            </Button>

        </div>

    </>)
}

export default PicId;



