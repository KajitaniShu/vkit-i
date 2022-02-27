import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';


export const Draw2D = ({isMain, setIsMain, itemList, setItemList}) => {
const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
});
    return (
        <>
        <Container maxWidth="md">
        <Box sx={{fontWeight:500, pt:"7em"}}>
                <Typography gutterBottom variant="h4" component="div">
                    操作方法
                </Typography>
            </Box>
            <Box sx={{ pl:1}}>
                <Typography gutterBottom variant="h6" component="div">
                    前後移動
                </Typography>
                <Img  src="./images/description1.svg" className="topimg" loading="lazy" alt="操作方法"/>
            </Box>
            <Box sx={{ pl:1}}>
                <Typography gutterBottom variant="h6" component="div">
                    左右移動
                </Typography>
                <Img src="./images/description2.svg" className="topimg" loading="lazy" alt="操作方法"/>
            </Box>
            <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                sx={{pt:10}}
            >
                <Button variant="outlined" href="https://forms.gle/LMqXUxmWncNP4FhG9">開発メンバー募集中</Button>
            </Grid>
            
        </Container>
        </>
    );
};
