import React, {useRef, useState} from 'react'
import * as Fiber from '@react-three/fiber';
import {Canvas, useFrame} from '@react-three/fiber';
import * as Drei from "@react-three/drei";
import { Model3D } from './Model3D';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import * as THREE from 'three'
import nextOffset from './NextOffset';
import Player from './Player';
import {Modal} from './Modal';
import {Car} from './Car';


const model_list = [
    "./models/map_activity.glb",
    "./models/map_administration.glb",
    "./models/map_agora.glb",
    "./models/map_cafeteria.glb",
    "./models/map_career.glb",
    "./models/map_dormitory.glb",
    "./models/map_education.glb",
    "./models/map_gym.glb",
    "./models/map_nature.glb",
    "./models/map_incubation.glb",
    "./models/map_isc.glb",
    "./models/map_lecture.glb",
    "./models/map_lecture_large.glb",
    "./models/map_lecture2.glb",
    "./models/map_library.glb",
    "./models/map_machine_workshop.glb",
    "./models/map_MILAiS.glb",
    "./models/map_research.glb",
    "./models/map_research_satellite.glb",
    "./models/map_swimming_pool.glb",
    "./models/map_workshop.glb",
]

Drei.softShadows()
export const Draw3D = ({itemList, playerPos, setPlayerPos, playerAngle, setPlayerAngle, isMain}) => {
    const [forward, setForward]     = useState(false);
    const [back, setBack]           = useState(false);
    const [left, setLeft]           = useState(false);
    const [right, setRight]         = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [opened, setOpened]       = useState(false);

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
            setForward(false);
            setBack(false);
            setLeft(false);
            setRight(false);
            return;
        }
        switch(cmd){
            case "forward":
                setForward(true);
                break;
            case "back":
                setBack(true);
                break;
            case "left":
                setLeft(true);
                break;
            case "right":
                setRight(true);
                break;
            case "reset":
                setForward(false);
                setBack(false);
                setLeft(false);
                setRight(false);
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
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><CircularProgress /></Box>
        }>
            <Canvas ref={canvas} dpr={[1, 2]} className="relative" shadows={true} camera={{
                fov: 30,
                aspect: window.innerWidth / window.innerHeight,
                near: 0.1,
                far: 2000
            }}>
                <Drei.OrbitControls />
                <Drei.Environment preset="city" />
                <ambientLight intensity={0.5} />
                {model_list.map((value, key) => {
                    return (
                        <Model3D value={value} key={key}/>
                    )
                })}
                <Car />
                <Player playerPos={playerPos} setPlayerPos={setPlayerPos} playerAngle={playerAngle} setPlayerAngle={setPlayerAngle} forward={forward} back={back} left={left} right={right}/>
                <Drei.ContactShadows position={[0, 0, 0]} opacity={0.2} width={1000} height={1000} blur={0.1} far={1} />
                <Drei.BakeShadows />
                
            </Canvas>
            <Modal playerPos={playerPos} openModal={openModal} setOpenModal={setOpenModal} opened={opened} setOpened={setOpened}/>
        </React.Suspense>
    );
};
