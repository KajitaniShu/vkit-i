import React, {useRef, useState} from 'react';
import {useFrame} from '@react-three/fiber';
import { Html } from "@react-three/drei"
import * as THREE from 'three'
import nextOffset from './NextOffset';
import {Comment} from './Comment';
import {path} from './BldgData';
import {GuideModal} from './GuideModal';
import {useBounds} from "@react-three/drei";



export const GuideNPC = ({playerPos, setPlayerPos, playerAngle, setPlayerAngle, guidePos, setGuidePos, dest, setDest, gIndex, setGIndex, controllable, setControllable, isBound, setIsBound}) => {
    const [lead,           setLead] = useState(false);
    const [textBox,     setTextBox] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const count         = useRef(0);
    const step          = useRef(0);
    const leadPointX    = useRef(30);
    const leadPointZ    = useRef(120);
    const countGtime    = useRef(0);
    const ref           = useRef();
    const srime         = useRef();
    const guideAngle    = useRef(0);

    const texture = new THREE.TextureLoader().load('./images/guide.png');
    texture.wrapS  = THREE.RepeatWrapping;
    texture.repeat.set(0.33,0.25);
    texture.offset.x = 0.33;
    

    // 文字数をカウント (半角に対応)
    function countText(text){
        var length = 0.0;
        for(var i=0; i < text.length; i++) {
            text[i].match(/[ -~]/) ? length += 0.5 : length += 1.0;
        }
        return length;
    }

    // refの位置座標を変更
    function updateRefPos(pos){
        ref.current.position.x = pos.x;
        ref.current.position.y = pos.y;
        ref.current.position.z = pos.z;
    }

    // プレイヤーをガイドのところまで移動させる
    function playerToNPC(x, z){
        var speed = 0.2;
        if(lead && (Math.abs(guidePos.x-playerPos.x)+Math.abs(guidePos.z-playerPos.z))<8) speed = 0.01;

        if      (leadPointX.current - playerPos.x >  1)  { playerPos.x+=speed; playerAngle = 180; }
        else if (leadPointX.current - playerPos.x < -1)  { playerPos.x-=speed; playerAngle =  90; }
        else if (leadPointZ.current - playerPos.z >  1)  { playerPos.z+=speed; playerAngle =   0; }
        else if (leadPointZ.current - playerPos.z < -1)  { playerPos.z-=speed; playerAngle = 270; }
        else{
            leadPointX.current = x;
            leadPointZ.current = z;
            setLead(true);
        }

        setPlayerPos(playerPos);
        setPlayerAngle(playerAngle);
    }

    // NPCを次の目的地まで移動させる
    function moveNPC(x, z){
        var speed = 0.2;
        if(!lead) speed = 0;
        if      (x - guidePos.x >  1)  { 
            guidePos.x+=speed; 
            guideAngle.current = 180;
            if(!controllable) playerToNPC(x, z);
            return true; 
        }
        else if (x - guidePos.x < -1)  { 
            guidePos.x-=speed; 
            guideAngle.current =  90;
            if(!controllable) playerToNPC(x, z);
            return true; 
        }
        else if (z - guidePos.z >  1)  { 
            guidePos.z+=speed; 
            guideAngle.current =   0;
            if(!controllable) playerToNPC(x, z);
            return true; 
        }
        else if (z - guidePos.z < -1)  { 
            guidePos.z-=speed; 
            guideAngle.current = 270;
            if(!controllable) playerToNPC(x, z);
            return true; 
        }
        else return false;
    }

    // NPCの歩行アニメーション
    function animateNPC(){
        count.current++;
        if(count.current >= 10){
            texture.offset.x = nextOffset(step.current= (step.current+1) % 4);   // 足踏みモーション
            texture.offset.y = 0.75 - (guideAngle.current / 90 ) * 0.25;  // NPCの角度を更新
            count.current = 0;
        }
    }
    
    useFrame(() => {
        if(dest !== 'none'){
            var nextDest = path[dest].route[gIndex];                        // 次の曲がり角を設定

            // 目的地に向かっているとき
            if(nextDest[1] !== 100){
                if(controllable && gIndex === 0) setControllable(false);   // ガイド中はコントロール不可にする
                if(nextDest[1] === -100) {
                    setDest('none');                                       // 定位置  (y座標が-100)についたら目的地を'none'に戻す
                    guideAngle.current =   0;                              // 手前を向く
                    setLead(false);
                    setGIndex(0);
                    leadPointX.current =  30;
                    leadPointZ.current = 120;
                }else{
                    if(!moveNPC(nextDest[0], nextDest[2])) setGIndex(++gIndex); // 目的地方向に移動 (曲がり角についたら次の曲がり角を設定)
                }
                
            // 目的地に到達したとき
            }else{
                // コントロール可能にする
                if(!controllable) setControllable(true);
                
                // 手前を向く
                guideAngle.current =   0;

                // 目的地に着いたら400カウントして帰る
                if(countGtime.current < 600) {
                    countGtime.current++;
                    if(countGtime.current === 10) setTextBox(path[dest].comment[0]);   // 建物の説明 1/2個目 を表示
                    if(countGtime.current === 200) setTextBox(path[dest].comment[1]);  // 建物の説明 2/2個目 を表示
                }else{
                    setTextBox("");
                    // 定位置に帰り始める
                    countGtime.current = 0;
                    setGIndex(++gIndex);
                }
            }
        }else{
            // モーダルウィンドウを開く・閉じる
            if(((playerPos.x-guidePos.x)**2+(playerPos.z-guidePos.z)**2) < 40 && !openModal) setOpenModal(true);
            if(((playerPos.x-guidePos.x)**2+(playerPos.z-guidePos.z)**2) >= 40 && openModal) setOpenModal(false);
            
        }

        // NPCのアニメーション
        animateNPC();
        // NPCの位置座標を更新
        updateRefPos(guidePos);
    });
    
    return (
        <>
            <group ref={ref}>
                <mesh ref={srime} position={[0,0,0]}>
                    <planeBufferGeometry attach="geometry" args={[4,4]}/>
                    <meshStandardMaterial attach="material" map={texture} transparent={true}/>
                </mesh >
                {textBox !== "" ? <Comment comment={textBox} height={6}/> : ""}
                <Html position={[0,2.5,0]} sprite transform occlude distanceFactor={15} center className="innerText bgGray" style={{width: countText("ガイドスライム")+2+'em'}} >
                    <p>ガイドスライム</p>
                </Html>
                {openModal ? <GuideModal setDest={setDest} openModal={openModal} setOpenModal={setOpenModal}/> : "w"}
            </group>
        </>
    )
}