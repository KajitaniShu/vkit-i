import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import { Html } from "@react-three/drei"
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import {roomNames} from './BldgData';


export const RoomDetail = ({room, exp, setIsBound}) => {

    function handleBack(){
        setIsBound('none');
    }

    if(room!=='none'){
        return (
        <Html position={[71,  21,   0]} sprite transform occlude className="innerText bgWhite commentBox" distanceFactor={30} center>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', p:1}}>
                <Typography variant="h6">1101教室</Typography>
            </Box>
            <Box
                sx={{
                bgcolor: 'background.paper',
                p: 2,
                overflow: 'auto',
                width: '10em'
                }}
            >
                <Typography>{exp}</Typography>
            </Box>
            <Box sx={{textAlign:'right'}}>
            <Button onClick={handleBack}>戻る</Button>
            </Box>
            
        </Html>
        );
    }else return false;
}