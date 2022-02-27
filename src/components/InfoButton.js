import React, {useState}from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import { IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Fab } from '@mui/material';

const useStyles = makeStyles({
    text: {
        background: "#282c34", 
        color: '#B2BAC2',
        fontWeight: 'light'
    }
});

export const InfoButton = ({isMain, setIsMain}) => {
    const style = useStyles();
    
    const handleChange = () => {
        setIsMain(!isMain);
    };

    return (
        <Box sx={{position: "absolute", top:10, right:10, fontWeight: 'light', p:2, pr:4}} >
            <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
            >
                <IconButton onClick={handleChange}>
                    <InfoOutlinedIcon size="large"/>
                </IconButton>
            </Grid>
        </Box>
    );
}
