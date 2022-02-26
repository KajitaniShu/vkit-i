import React, {useState}from 'react';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';


const useStyles = makeStyles({
    text: {
        background: "#282c34", 
        color: '#B2BAC2',
        fontWeight: 'light'
    }
});

export const InfoButton = ({isMain, setIsMain}) => {
    const changeScene = () => {
        console.log(isMain);
        setIsMain(!isMain);
    };

    return (
        <Box sx={{m: 1}}>
            <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            >
                <IconButton 
                    size="large" 
                    onClick={changeScene}
                >
                    <InfoIcon />
                </IconButton>
            </Grid>
            
        </Box>
            
    );
}
