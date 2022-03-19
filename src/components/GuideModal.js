import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import { Html } from "@react-three/drei"
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import {bldgNames} from './BldgData';
import {path} from './BldgData';


export const GuideModal = ({guideNPC, setOpenModal, setSnackOpen, snackMessage}) => {

    function handleDest(value){
        if(path[value] === undefined) {
            // snackメッセージを表示
            setSnackOpen(true);
            snackMessage.current = '現在 ' + value + ' はスライムによる案内に対応していません.';
            return;
        }
        setOpenModal(false);
        guideNPC.current.dest = value;
        return;
    }

    return (
        <>
        <Html position={[ 0,14, 0]} sprite transform occlude className="innerText bgWhite commentBox" distanceFactor={30} center>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', p:1}}>
                <Typography>どこに行く？</Typography>
            </Box>
            <Box
                sx={{
                bgcolor: 'background.paper',
                p: 2,
                height: "10em",
                overflow: 'auto'
                }}
            >
                <ButtonGroup
                orientation="vertical"
                aria-label="vertical contained button group"
                variant="text"
            >
                {bldgNames.map((value, key) => {
                    return (
                        <Button key={key} onClick={() => handleDest(value.name)}>{value.name}</Button>
                    )
                })}
            </ButtonGroup>
            </Box>
        
    </Html>
    
    </>
    );
}