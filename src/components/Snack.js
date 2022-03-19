import React from 'react'
import Snackbar from '@mui/material/Snackbar';


export const Snack = ({snackOpen, setSnackOpen, snackMessage}) => {
    function handleClose(event){
        setSnackOpen(false);
        snackMessage.current = '';
    };

    return (
        <Snackbar
            open={snackOpen}
            autoHideDuration={3000}
            message={snackMessage.current}
            onClose={handleClose}
        />
    );
}