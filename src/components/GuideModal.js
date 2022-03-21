import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import { Html } from "@react-three/drei"
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import {bldgNames} from './BldgData';
import {path} from './BldgData';


export const GuideModal = ({guideNPC, setOpenModal, setSnackOpen, snackMessage}) => {

    const [page, setPage] = React.useState(1);

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

    function handlePage(event, value){
        setPage(value);
    }

    return (
        <>
        <Html position={[ 0,18, 0]} sprite transform occlude className="innerText bgWhite commentBox" distanceFactor={32} center>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', p:1}}>
                <Typography>どこに行く？</Typography>
            </Box>
            <Box
                sx={{
                bgcolor: 'background.paper',
                p: 1,
                height: "12em",
                overflow: 'auto'
                }}
            >
                <Stack spacing={0}>
                    {bldgNames.slice((parseInt(page)-1)*4, ((parseInt(page)-1)*4+4)).map((value, key) => {
                        return (
                            <Button key={key} size="large" onClick={() => handleDest(value.name)}>{value.name}</Button>
                        )
                    })}
                </Stack>
                
            </Box>
            <Box sx={{ pb:1}}>
                <Pagination count={Math.round(bldgNames.length/4)+1} onChange={handlePage} />
            </Box>
    </Html>
    
    </>
    );
}