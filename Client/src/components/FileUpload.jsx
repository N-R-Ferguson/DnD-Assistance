import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { orange } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function FileUpload({ tabID }) {
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


    const handleFileUpload = async (event) => {
        const files = event.target.files;

        const formData = new FormData();

        formData.append('Tab', tabID)

        for (var i = 0; i < files.length; i++) {
            formData.append('File', files[i]);
        }


        console.log(formData)
        const url = "http://localhost:5000/upload/files";

        const options = {
            method: "POST",
            header: { "Content-Type": "multipart/form-data" },
            body: formData,
        }

        console.log(options)


        await fetch(url, options)
            .then((response) => {
                console.log(response.json());
            })
            .catch(err => {
                console.log(err)
            });
    }


    return (
        <>
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
        </>
    )
}