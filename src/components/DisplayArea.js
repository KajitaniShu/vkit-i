import React, {useState} from 'react';
import { Draw3D } from './Draw3D';
import { Draw2D } from './Draw2D';
import { InfoButton } from './InfoButton';
import Box from '@mui/material/Box';
import * as THREE from 'three'


export const DisplayArea = ({itemList, setItemList}) => {
    const [isMain, setIsMain] = useState(true);
    const [playerPos, setPlayerPos] = useState(new THREE.Vector3(20, 2, 100));
    const [playerAngle, setPlayerAngle] = useState(270);

    return (
        <Box
            sx={{
                bgcolor: 'background.paper',
                width: "100%",
                height:"100%",
                position: 'relative',
            }}
        >
            {isMain ? <Draw3D className="main-contents" itemList={itemList} playerPos={playerPos} setPlayerPos={setPlayerPos} playerAngle={playerAngle} setPlayerAngle={setPlayerAngle} isMain={isMain}/> :<Draw2D itemList={itemList} setItemList={setItemList}/>}
            <InfoButton isMain={isMain}  setIsMain={setIsMain} />
        </Box>
    );
}
