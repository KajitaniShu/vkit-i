import React, {useRef, useState, useEffect} from 'react'
import * as Fiber from '@react-three/fiber';
import {Canvas, useFrame} from '@react-three/fiber';
import * as Drei from "@react-three/drei";
import { Html } from "@react-three/drei"
import * as THREE from 'three'
import nextOffset from './NextOffset';



function Player({playerPos, setPlayerPos, playerAngle, setPlayerAngle, forward, back, left, right}) {
    // 文字数をカウント (半角に対応)
    function countText(text){
        var length = 0.0;
        for(var i=0; i < text.length; i++) {
            text[i].match(/[ -~]/) ? length += 0.5 : length += 1.0;
        }
        return length;
    }

    const ref = useRef();
    const name = useRef();

    const texture = new THREE.TextureLoader().load('./images/player1.png');
    texture.wrapS  = THREE.RepeatWrapping;
    texture.repeat.set(0.33,0.25);
    texture.offset.x = 0.33;
    
    let count = 0;
    let step = 0;

    useFrame(({camera}) => {
        if(forward) { playerPos.z -= 0.3; playerAngle = 270}
        if(back)    { playerPos.z += 0.3; playerAngle = 0}
        if(left)    { playerPos.x -= 0.3; playerAngle = 90}
        if(right)   { playerPos.x += 0.3; playerAngle = 180}

        setPlayerPos(playerPos);
        setPlayerAngle(playerAngle);

        ref.current.position.x = playerPos.x;
        ref.current.position.y = playerPos.y;
        ref.current.position.z = playerPos.z;
        /*
        camera.position.x = ref.current.position.x;
        camera.position.y = ref.current.position.y+50;
        camera.position.z = ref.current.position.z+100;
        camera.lookAt(playerPos.x, playerPos.y,  playerPos.z);
        */
        console.log(ref.current.position.x, ref.current.position.z);
        texture.offset.y = 0.75 - (playerAngle / 90 ) * 0.25;
        count++;
        if(count >= 10){                 // 0.15毎に足踏み
            texture.offset.x = nextOffset(step= (step+1) % 4);
            count = 0;
        }
    });
    
    return (
        <group ref={ref}>
            <mesh position={[0,0,0]}>
                <planeBufferGeometry attach="geometry" args={[4,4]}/>
                <meshStandardMaterial attach="material" map={texture} transparent={true}/>
            </mesh >
            <Html position={[0,4,0]} transform occlude distanceFactor={20} center={true} className="innerText" style={{width: countText("1234567890")+2+'em'}} >
                <p>1234567890</p>
            </Html>
        </group>
    )
}

export default Player;