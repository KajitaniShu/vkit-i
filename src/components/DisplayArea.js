import React, {useState, useRef} from 'react';
import { Draw3D } from './Draw3D';
import { Draw2D } from './Draw2D';
import { InfoButton } from './InfoButton';
import Box from '@mui/material/Box';
import * as THREE from 'three'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


export const DisplayArea = () => {
    const [isMain, setIsMain] = useState(true);
    const controllable = useRef(true); 

    const player    = useRef({
                            pos:            new THREE.Vector3(20, 2, 150), 
                            angle:          270,
                            forward:        false,
                            back:           false,
                            left:           false,
                            right:          false,
                            controllable:   true
                        });

    // ガイドNPCの位置座標
    const guideNPC = useRef({
                            pos: new THREE.Vector3(30, 2, 120), 
                            angle: 0,
                            dest: 'none',
                            gIndex: 0,
                            lead: false,                             // 先導フラグ(キャラクターが近くに来るまで待つ用)
                            leadPointX: 30,
                            leadPointZ: 120,
                            gTime: 0
                        });

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
                            player={player}
                            guideNPC={guideNPC}
                            controllable={controllable}
                            isMain={isMain}
                            isBound={isBound}
                            setIsBound={setIsBound}
                        /> :
                        <Draw2D/>
            }
            <InfoButton 
                isMain={isMain}
                setIsMain={setIsMain}
            />
        </Box>
    );
}
