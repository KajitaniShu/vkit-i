import React, {useState, useRef, useEffect}from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

const useStyles = makeStyles({
    text: {
        background: "#282c34", 
        color: '#B2BAC2',
        fontWeight: 'light'
    }
});


export const Form = ({isBound, setIsBound, player, setSnackOpen, snackMessage}) => {
    const [input, setInput] = useState('');

    const handleChange = (text) => {
        setInput(text);
    };

    const handleFocus = () => {
        player.current.controllable = false;
    }

    const handleRemove = () => {
        player.current.controllable = true;
    }

    const handleButton = () => {
        if(input === '1101教室') setIsBound('lecture');
        else {
            // snackメッセージを表示
            setSnackOpen(true);
            snackMessage.current = '現在 ' + input + ' には対応していません.';
        }
        setInput('');

    }

    return (
        <Box sx={{position: "absolute", top:5, left:40, fontWeight: 'light', }} >
            <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                
                maxWidth="50%"
            >
                <FormControl sx={{ m: 1 }} variant="standard">
                <TextField
                    label="教室を探す"
                    onFocus={handleFocus}
                    onBlur={handleRemove} 
                    variant="standard"
                    onChange={(event) => handleChange(event.target.value)} 
                    value={input}
                    InputProps={{
                        endAdornment:(
                            <InputAdornment position="end">
                                <IconButton 
                                    type="submit" 
                                    aria-label="search" 
                                    onClick={handleButton}
                                    edge="end"
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    
                
                />
                </FormControl>
                
                
            </Grid>
        </Box>
    );
}