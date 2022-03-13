import React, {useRef, useState} from 'react'
import {Canvas} from '@react-three/fiber';
import * as Drei from "@react-three/drei";
import { Model3D } from './Model3D';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {Player} from './Player';
import {Car} from './Car';
import {Signboards} from './Signboard';
import {model_list} from './BldgData';
import {GuideNPC} from './GuideNPC';
import {GuideModal} from './GuideModal';
import {RoomDetail} from './RoomDetail';
import {Bounds, useBounds} from "@react-three/drei";


Drei.softShadows()
export const Draw3D = ({itemList, playerPos, playerAngle, guidePos, setGuidePos, dest, gIndex, controllable, isMain, isBound, setIsBound, lead}) => {
    const forward   = useRef(false);
    const back      = useRef(false);
    const left      = useRef(false);
    const right     = useRef(false);

    const canvas = useRef();
    const key = {
        'w':'forward',
        's': 'back',
        'a': 'left',
        'd': 'right',
        'ctrl+1': 'debug',

        'ArrowUp'   : 'forward',
        'ArrowDown' : 'back',
        'ArrowLeft' : 'left',
        'ArrowRight': 'right',

        'touchUp'    : 'forward',
        'touchDown'  : 'back',
        'touchLeft'  : 'left',
        'touchRight' : 'right',
    };

    function command(cmd){
        if(!isMain) {
            forward.current = false;
            back.current    = false;
            left.current    = false;
            right.current   = false;
            return;
        }
        switch(cmd){
            
            case "forward":
                forward.current = true;
                break;
            case "back":
                back.current    = true;
                break;
            case "left":
                left.current    = true;
                break;
            case "right":
                right.current   = true;
                break;
            case "reset":
                forward.current = false;
                back.current    = false;
                left.current    = false;
                right.current   = false;
            break;
        }
        
        
        
    }

    ////////// キー操作 //////////
    // キーを押した時
    document.addEventListener('keyup', (event) => {
        if (!isMain) return false;
        if(key[event.key]) command('reset');
        event.preventDefault();
    }, {passive:false});

    // キーから手を離したとき
    document.addEventListener('keydown', (event) => {
        if (!isMain) return false;
        // 操作キーが押された場合
        if(key[event.key] && !(event.ctrlKey || event.metaKey)) command(key[event.key]);
        // Ctrlも一緒に押していた場合
        else if (event.key == '1'  && (event.ctrlKey || event.metaKey)) command('debug');
        
        event.preventDefault();
    }, {passive:false});
    
    return (
        <React.Suspense centered fallback={
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', pt:'47vh'}}><CircularProgress /></Box>
        }>
            <Canvas ref={canvas} dpr={[1, 2]} className="relative"  camera={{
                position: [200, 100, 400],
                fov: 30,
                aspect: window.innerWidth / window.innerHeight,
                near: 0.1,
                far: 2000
            }}>
                <Drei.Environment preset="city" />
                <ambientLight intensity={0.5} />
                <Bounds><Model3D isBound={isBound} /></Bounds>
                
                
                <Car />
                <Signboards />
                <Player   
                    playerPos={playerPos}
                    playerAngle={playerAngle}
                    forward={forward} 
                    back={back} 
                    left={left} 
                    right={right}
                    controllable={controllable}
                    guidePos={guidePos} 
                    isBound={isBound} 
                />
                
                <GuideNPC 
                    playerPos={playerPos}
                    playerAngle={playerAngle}
                    guidePos={guidePos}
                    dest={dest}
                    gIndex={gIndex}
                    controllable={controllable}
                    lead={lead}
                />
                
                <RoomDetail room={isBound} exp={"講義棟 1F"} setIsBound={setIsBound}/>
                <Drei.ContactShadows position={[0, 0, 0]} opacity={0.2} width={1000} height={1000} blur={0.1} far={1} />
                
            </Canvas>
        </React.Suspense>
    );
};
