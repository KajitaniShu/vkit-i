import React, {useState, useRef} from 'react';
import { Draw3D } from './Draw3D';
import { Draw2D } from './Draw2D';
import { InfoButton } from './InfoButton';
import { Form } from './Form';
import Box from '@mui/material/Box';
import * as THREE from 'three'


export const DisplayArea = ({itemList, setItemList}) => {
    const [     isMain,        setIsMain] = useState(true);
    const controllable = useRef(true); 

    const playerPos     = useRef(new THREE.Vector3(20, 2, 150));
    const playerAngle   = useRef(270);

    // ガイドNPCの位置座標
    const guidePos      = useRef(new THREE.Vector3(30, 2, 120));
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
                            playerAngle={playerAngle}
                            guidePos={guidePos}
                            dest={dest} 
                            setDest={setDest}
                            gIndex={gIndex} 
                            setGIndex={setGIndex}
                            controllable={controllable}
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
