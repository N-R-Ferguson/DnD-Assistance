import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { orange } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function FileUpload() {
    const FileUploadButton = styled('input')({
        clip: 'rect(0,0,0,0)',
        clipPath: 'insert(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
    });

    const BootstrapUploadButton = styled(Button)({
        color: orange[600],
        borderColor: orange[600],
        '&:hover': {
            color: orange[200],
            borderColor: orange[200],
        },
        'background-color': 'transparent'
    });


    const handleFileUpload = (event) => {
        console.log(event.target.files)
    }


    return(
        <>
            <div>
                <BootstrapUploadButton
                    component='label'
                    role={undefined}
                    variant='contained'
                    startIcon={<CloudUploadIcon />}
                >
                    <FileUploadButton 
                        type='file'
                        onChange={handleFileUpload}
                        multiple
                    />
                    Upload Files
                </BootstrapUploadButton>
            
            </div>
        </>
    )
}