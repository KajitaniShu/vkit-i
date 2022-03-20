import React, {useRef, useState} from 'react';
import {useFrame} from '@react-three/fiber';
import Drei, { Html, CirecleBufferGeometry} from "@react-three/drei"
import * as THREE from 'three'
import nextOffset from './NextOffset';
import { CircleBufferGeometry } from 'three';

// 文字数をカウント (半角に対応)
function countText(text){
    var length = 0.0;
    for(var i=0; i < text.length; i++) {
        text[i].match(/[ -~]/) ? length += 0.5 : length += 1.0;
    }
    return length;
}

export const Player = ({player, isBound, isDebug}) => {
    const pPos = useRef();                      // プレイヤーモデルの位置
    const clock     = new THREE.Clock();        // デルタタイム取得用
    var speed = 17;                             // プレイヤーの歩くスピード
    var count = 0;                              // プレイヤーの足踏みモーション用(カウント)
    var step = 0;                               // プレイヤーの足踏みモーション用(画像タイプ)

    // プレイヤーのテクスチャを用意する
    const texture = new THREE.TextureLoader().load('./images/player1.png');
    texture.wrapS  = THREE.RepeatWrapping;
    texture.repeat.set(0.33,0.25);
    texture.offset.x = 0.33;

    useFrame(({camera}) => {
        //console.log(pPos.current.position.x, pPos.current.position.z);

        const deltaTime = clock.getDelta(); // デルタタイムを取得
        count+=deltaTime;                   // 足踏みモーション用カウント変数を更新

        // プレイヤーの位置を更新
        if(player.current.controllable){
            if(player.current.forward) { player.current.pos.z -= deltaTime*speed; player.current.angle = 270}
            if(player.current.back)    { player.current.pos.z += deltaTime*speed; player.current.angle =   0}
            if(player.current.left)    { player.current.pos.x -= deltaTime*speed; player.current.angle =  90}
            if(player.current.right)   { player.current.pos.x += deltaTime*speed; player.current.angle = 180}
        }

        // 3Ｄ空間内のプレイヤーの位置を更新
        pPos.current.position.x = player.current.pos.x;
        pPos.current.position.y = player.current.pos.y;
        pPos.current.position.z = player.current.pos.z;

        // 「教室を探す」昨日が使われてなければカメラの位置と注視点を更新
        if(isBound==='none' && !isDebug){
            camera.position.x = pPos.current.position.x;
            camera.position.y = pPos.current.position.y+70;
            camera.position.z = pPos.current.position.z+130;
            camera.lookAt(player.current.pos.x, player.current.pos.y,  player.current.pos.z);
        }
        
        // プレイヤーの足踏みモーション
        texture.offset.y = 0.75 - (player.current.angle / 90 ) * 0.25;
        if(count >= 0.2){                 // 0.15毎に足踏み
            texture.offset.x = nextOffset(step= (step+1) % 4);
            count = 0;
        }
    });
    
    return (
        <>
            <group ref={pPos}>
                <mesh position={[0,0,0]}>
                    <planeBufferGeometry attach="geometry" args={[4,4]}/>
                    <meshStandardMaterial attach="material" map={texture} transparent={true}/>
                </mesh >
                {/*
                <Html position={[0,4,0]} sprite transform occlude distanceFactor={15} center className="innerText bgGray" style={{width: countText("かじたに")+2+'em'}} >
                    <p>なまえ</p>
                </Html>
                */}
            </group>
        </>
    )
}
