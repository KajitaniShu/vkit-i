import React, {useState} from 'react';
import { Draw3D } from './Draw3D';
import { Draw2D } from './Draw2D';
import { InfoButton } from './InfoButton';
import { Form } from './Form';
import Box from '@mui/material/Box';
import * as THREE from 'three'


export const DisplayArea = ({itemList, setItemList}) => {
    const [     isMain,        setIsMain] = useState(true);
    const [  playerPos,     setPlayerPos] = useState(new THREE.Vector3(20, 2, 150));
    const [playerAngle,   setPlayerAngle] = useState(270);
    const [controllable, setControllable] = useState(true); 

    // ガイドNPCの位置座標
    const [guidePos,     setGuidePos] = useState(new THREE.Vector3(30, 2, 120));
    const [    dest,         setDest] = useState('none');
    const [  gIndex,       setGIndex] = useState(0);

    // 教室検索システム
    const [isBound, setIsBound]     = useState('none');


    return (
        <Box
            sx={{
                bgcolor: 'background.paper',
                width: "100%",
                height:"100%",
                position: 'relative',
            }}
        >
            {isMain ?   <Draw3D 
                            className="main-contents" 
                            itemList={itemList} 
                            playerPos={playerPos} 
                            setPlayerPos={setPlayerPos} 
                            playerAngle={playerAngle} 
                            setPlayerAngle={setPlayerAngle} 
                            guidePos={guidePos}
                            setGuidePos={setGuidePos}
                            dest={dest} 
                            setDest={setDest}
                            gIndex={gIndex} 
                            setGIndex={setGIndex}
                            controllable={controllable}
                            setControllable={setControllable}
                            isMain={isMain}
                            isBound={isBound}
                            setIsBound={setIsBound}
                        /> :
                        <Draw2D 
                            itemList={itemList} 
                            setItemList={setItemList}
                        />
            }
            <InfoButton 
                isMain={isMain}
                setIsMain={setIsMain}
            />
            <Form 
                isBound={isBound}
                setIsBound={setIsBound}
            />
        </Box>
    );
}
