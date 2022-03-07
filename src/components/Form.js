import React, {useState, useRef}from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const useStyles = makeStyles({
    text: {
        background: "#282c34", 
        color: '#B2BAC2',
        fontWeight: 'light'
    }
});

export const Form = ({isBound, setIsBound}) => {
    const [input, setInput] = useState('');
    const style = useStyles();
    
    const handleChange = (text) => {
        setInput(text);
    };

    const handleButton = () => {
        if(input === '１１０１') setIsBound('lecture');
        setInput('');

    }

    

    return (
        <Box sx={{position: "absolute", top:5, left:40, fontWeight: 'light', }} >
            <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
            >
                <TextField id="outlined-basic"  label="教室を探す" onChange={(event) => handleChange(event.target.value)} value={input} variant="standard" />
                <IconButton type="submit" sx={{top:10}}aria-label="search" onClick={handleButton}>
                    <SearchIcon />
                </IconButton>
            </Grid>
        </Box>
    );
}