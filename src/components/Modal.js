import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import {bldgPos, bldgURL} from './BldgData';

function where(x, z){
    let ret = null;
    Object.keys(bldgPos).forEach((key) => {
        const pos = bldgPos[key];
        if((pos.leftX < x && x < pos.rightX) && (pos.backY < z && z < pos.frontY)) ret = key;
    });
    return ret;
}

export const Modal = ({playerPos, openModal, setOpenModal, opened, setOpened}) => {
    var pos = where(playerPos.x,playerPos.z);
    if(pos != null){
        if(!opened){
            // 特殊なタイプの処理
        if(pos == "講義棟"){
            var num = Math.floor( Math.random() * 5 ) + 1;
            pos += "_" + num;
        }else if(pos == "研究棟" || pos == "総合研究棟"){
            pos = "研究棟";
            var num = Math.floor( Math.random() * 13 ) + 1;
            pos += "_" + num;
        }else if(pos == "課外活動共用施設" || pos == "体育館"){
            pos = "課外活動共用施設";
        }
            setOpenModal(true);
            setOpened(true);
        }
    }else{
        setOpenModal(false);
        setOpened(false);
    }

    function handleClose(){
        setOpenModal(false);
    }

    return (
        <>
        <Dialog
            maxWidth={"lg"}
            open={openModal}
        >
        <DialogTitle>{pos}</DialogTitle>
        <DialogContent>
            <Box
                noValidate
                component="form"
                sx={{
                display: 'flex',
                flexDirection: 'column',
                minWidth:'500',
                m: 'auto',
                }}
            >
                {pos !== null ? <iframe
                    src={bldgURL[pos].url}
                    title="YouTube"
                    frameBorder="0"
                    sx={{width: "300px"}}
                ></iframe> : ""}
            </Box>
        </DialogContent>
        
        <DialogActions>
            <Button onClick={handleClose}>Close</Button>
        </DialogActions>
        
        </Dialog>
    </>
    );
}