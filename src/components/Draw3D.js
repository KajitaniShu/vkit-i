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
import { Form } from './Form';
import { Snack } from './Snack';
import { MouseControls } from './MouseControls';



Drei.softShadows()
export const Draw3D = ({player, guideNPC, isMain, isBound, setIsBound}) => {
    const canvas = useRef();
    const [isDebug, setIsDebug] = useState(false);
    const [snackOpen, setSnackOpen] = useState(false);
    const snackMessage = useRef('');
    

    const key = {
        'w':'forward',
        's': 'back',
        'a': 'left',
        'd': 'right',
        'ctrl+d': 'debug',

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
            player.current.forward = false;
            player.current.back    = false;
            player.current.left    = false;
            player.current.right   = false;
            return;
        }
        switch(cmd){
            
            case "forward":
                player.current.forward = true;
                break;
            case "back":
                player.current.back    = true;
                break;
            case "left":
                player.current.left    = true;
                break;
            case "right":
                player.current.right   = true;
                break;
            case "reset":
                player.current.forward = false;
                player.current.back    = false;
                player.current.left    = false;
                player.current.right   = false;
                break;
            case "debug":
                setIsDebug(!isDebug);
        }
        
        
        
    }

    ////////// キー操作 //////////
    // キーを押した時
    document.addEventListener('keyup', (event) => {
        if (!isMain || !player.current.controllable) return false;
        if(key[event.key]) command('reset');
        event.preventDefault();
    }, {passive:false});

    // キーから手を離したとき
    document.addEventListener('keydown', (event) => {
        if (!isMain || !player.current.controllable) return false;
        // 操作キーが押された場合
        if(key[event.key] && !(event.ctrlKey || event.metaKey)) command(key[event.key]);
        // Ctrl+D → debug mode
        else if (event.key == '1'  && (event.ctrlKey || event.metaKey)) command('debug');
        
        event.preventDefault();
    }, {passive:false});

    ////////// タッチ入力 //////////
    // 画面をタッチしたとき
    function touchStart(){
        if (!isMain || !player.current.controllable) return false;
        if(event.touches.length > 1) return;
        //this.player.recordStartPoint(event.touches[0].clientX, event.touches[0].clientY);
        event.preventDefault();
    }

    // タッチした手を動かしたとき
    function touchMove(){
        if (!isMain || !player.current.controllable) return false;
        if(event.touches.length > 1) return;
        //this.player.touchMove(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
        event.preventDefault();
    }

    // 画面から手を離したとき
    function touchEnd(){
        command("reset");
        event.preventDefault();
    }

    ////////// マウス操作 //////////
    // マウスをクリックしたとき
    function mouseDown(){
        if (!isMain || !player.current.controllable) return false;
        //if(this.controls.enableRotate) return;
        //this.player.recordStartPoint(event.clientX, event.clientY);
        //this.mouseFlag = true;
        event.preventDefault();
    }

    // マウスをドラッグしたとき
    function mouseMove(event){

        console.log("drag : " + event.screenX, event.screenY);
        //if(this.controls.enableRotate) return;
        //if(this.mouseFlag) this.player.touchMove(event.clientX, event.clientY);
    }

    // マウスのボタンを離したとき
    function mouseUp(){
        //if(this.controls.enableRotate) return;
        //this.player.command("reset");
        //this.mouseFlag = false;
        event.preventDefault();
    }
    
    return (
        <React.Suspense centered fallback={
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', pt:'47vh'}}><CircularProgress /></Box>
        }>
                <Canvas  
                    ref={canvas} 
                    dpr={[1, 2]} 
                    id="canvas"
                    className="relative"  
                    camera={{
                        position: [200, 100, 400],
                        fov: 30,
                        aspect: window.innerWidth / window.innerHeight,
                        near: 0.1,
                        far: 2000
                    }}
                >
                    {isDebug ? <Drei.OrbitControls/> : <></>}
                    <Drei.Environment preset="city" />
                    <ambientLight intensity={0.5} />
                    <Bounds><Model3D isBound={isBound} /></Bounds>
                    <Car />
                    <Signboards />
                    <Player   
                        player={player}
                        isBound={isBound}
                        isDebug={isDebug}
                    />
                    <GuideNPC 
                        player={player}
                        guideNPC={guideNPC}
                        setSnackOpen={setSnackOpen}
                        snackMessage={snackMessage}
                    />
                    
                    <MouseControls player={player}/>
                    <RoomDetail room={isBound} exp={"講義棟 1F"} setIsBound={setIsBound} player={player}/>
                    <Drei.ContactShadows position={[0, 0, 0]} opacity={0.2} width={1000} height={1000} blur={0.1} far={1} />
                    <Drei.BakeShadows />
                </Canvas>
            <Form 
                    isBound={isBound}
                    setIsBound={setIsBound}
                    player={player}
                    setSnackOpen={setSnackOpen}
                    snackMessage={snackMessage}
            />
            <Snack 
                snackOpen={snackOpen}
                setSnackOpen={setSnackOpen}
                snackMessage={snackMessage}
            />
        </React.Suspense>
    );
};
