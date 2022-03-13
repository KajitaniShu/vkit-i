import React, {useRef, useState} from 'react';
import {useFrame} from '@react-three/fiber';
import { Html } from "@react-three/drei"
import * as THREE from 'three'
import nextOffset from './NextOffset';
import {Comment} from './Comment';
import {path} from './BldgData';
import {GuideModal} from './GuideModal';
import {useBounds} from "@react-three/drei";

// 文字数をカウント (半角に対応)
function countText(text){
    var length = 0.0;
    for(var i=0; i < text.length; i++) {
        text[i].match(/[ -~]/) ? length += 0.5 : length += 1.0;
    }
    return length;
}

export const GuideNPC = ({playerPos, playerAngle, guidePos, dest, setDest, gIndex, setGIndex, controllable, isBound, setIsBound}) => {
    
    const [lead,           setLead] = useState(false);  // 先導フラグ(キャラクターが近くに来るまで待つ用)
    const [textBox,     setTextBox] = useState("");     // 説明を表示するテキストボックス
    const [openModal, setOpenModal] = useState(false);  // 行先を表示するモーダルウィンドウが開いているか閉じているか
    const count         = useRef(0);                    // NPCの歩行アニメーション用(画像変更タイミングを測る用)
    const step          = useRef(0);                    // NPCの歩行アニメーション用(画像変更用)
    const leadPointX    = useRef(30);                   // プレイヤーが歩いていく目的地(x)
    const leadPointZ    = useRef(120);                  // プレイヤーが歩いていく目的地(y)
    const countGtime    = useRef(0);                    // 説明を表示する時間を制御する用
    const srimePos      = useRef();                     // スライムの位置
    const srimeAngle    = useRef(0);                    // スライムの角度
    const clock     = new THREE.Clock();                // デルタタイム取得用

    // スライムのテクスチャを用意
    const texture = new THREE.TextureLoader().load('./images/guide.png');
    texture.wrapS  = THREE.RepeatWrapping;
    texture.repeat.set(0.33,0.25);
    texture.offset.x = 0.33;



    // プレイヤーをガイドのところまで移動させる
    function playerToNPC(x, z, deltaTime){
        var speed = 10;
        if(lead && (Math.abs(guidePos.current.x-playerPos.current.x)+Math.abs(guidePos.current.z-playerPos.current.z))<8) speed = 5;

        if      (leadPointX.current - playerPos.current.x >  1)  { playerPos.current.x+=deltaTime*speed; playerAngle.current = 180; }
        else if (leadPointX.current - playerPos.current.x < -1)  { playerPos.current.x-=deltaTime*speed; playerAngle.current =  90; }
        else if (leadPointZ.current - playerPos.current.z >  1)  { playerPos.current.z+=deltaTime*speed; playerAngle.current =   0; }
        else if (leadPointZ.current - playerPos.current.z < -1)  { playerPos.current.z-=deltaTime*speed; playerAngle.current = 270; }
        else{
            leadPointX.current = x;
            leadPointZ.current = z;
            setLead(true);
        }
    }

    // スライムの位置座標を変更
    function updateRefPos(pos){
        srimePos.current.position.x = pos.x;
        srimePos.current.position.y = pos.y;
        srimePos.current.position.z = pos.z;
    }

    // NPCを次の目的地まで移動させる
    function moveNPC(x, z, deltaTime){
        var speed = 10;

        // プレイヤーが近くに来るまでは静止
        if(!lead) speed = 0;

        // 目的地方向に移動
        if(x - guidePos.current.x > 1){ // 目的地が右方向にある場合
            guidePos.current.x+=deltaTime*speed;
            srimeAngle.current = 180;
            if(!controllable.current) playerToNPC(x, z, deltaTime);
            return true; 
        }
        else if (x - guidePos.current.x < -1) { // 目的地が左方向にある場合 
            guidePos.current.x-=deltaTime*speed; 
            srimeAngle.current =  90;
            if(!controllable.current) playerToNPC(x, z, deltaTime);
            return true; 
        }
        else if (z - guidePos.current.z >  1) { // 目的地が手前方向にある場合
            guidePos.current.z+=deltaTime*speed; 
            srimeAngle.current =   0;
            if(!controllable.current) playerToNPC(x, z, deltaTime);
            return true; 
        }
        else if (z - guidePos.current.z < -1) { // 目的地が奥方向にある場合
            guidePos.current.z-=deltaTime*speed; 
            srimeAngle.current = 270;
            if(!controllable.current) playerToNPC(x, z, deltaTime);
            return true; 
        }
        else return false;
    }

    // NPCの歩行アニメーション
    function animateNPC(deltaTime){
        count.current+=deltaTime;
        if(count.current >= 0.2){
            texture.offset.x = nextOffset(step.current= (step.current+1) % 4);   // 足踏みモーション
            texture.offset.y = 0.75 - (srimeAngle.current / 90 ) * 0.25;  // NPCの角度を更新
            count.current = 0;
        }
    }


    
    useFrame(() => {
        const deltaTime = clock.getDelta();                                 // デルタタイムを取得

        if(dest !== 'none'){
            var nextDest = path[dest].route[gIndex];                        // 次の曲がり角を設定

            // 目的地に向かっているとき
            if(nextDest[1] !== 100){
                if(controllable.current && gIndex === 0) controllable.current = false;   // ガイド中はコントロール不可にする
                if(nextDest[1] === -100) {
                    setDest('none');                                       // 定位置  (y座標が-100)についたら目的地を'none'に戻す
                    srimeAngle.current =   0;                              // 手前を向く
                    setLead(false);                                        // 先導フラグをオフ
                    setGIndex(0);                                          // 参照する曲がり角を0番目にする
                    leadPointX.current =  30;
                    leadPointZ.current = 120;
                }else{
                    // 目的地方向に移動 (曲がり角についたら次の曲がり角を設定)
                    if(!moveNPC(nextDest[0], nextDest[2], deltaTime)) setGIndex(++gIndex); 
                }
                
            // 目的地に到達したとき
            }else{
                // コントロール可能にする
                if(!controllable.current) controllable.current = true;
                
                // 手前を向く
                srimeAngle.current =   0;

                // 目的地に着いたら400カウントして帰る
                if(countGtime.current < 6) {
                    countGtime.current+=deltaTime;
                    if(countGtime.current < 0.1 && textBox === "") setTextBox(path[dest].comment[0]);   // 建物の説明 1/2個目 を表示
                    if(countGtime.current >   3 && textBox !== "") setTextBox(path[dest].comment[1]);  // 建物の説明 2/2個目 を表示
                }else{
                    setTextBox("");
                    // 定位置に帰り始める
                    countGtime.current = 0;
                    setGIndex(++gIndex);
                }
            }
        }else{
            // モーダルウィンドウを開く・閉じる
            if(((playerPos.current.x-guidePos.current.x)**2+(playerPos.current.z-guidePos.current.z)**2) < 40 && !openModal) setOpenModal(true);
            if(((playerPos.current.x-guidePos.current.x)**2+(playerPos.current.z-guidePos.current.z)**2) >= 40 && openModal) setOpenModal(false);
            
        }

        // NPCのアニメーション
        animateNPC(deltaTime);
        // NPCの位置座標を更新
        updateRefPos(guidePos.current);
    });
    
    return (
        <>
            <group ref={srimePos}>
                <mesh position={[0,0,0]}>
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