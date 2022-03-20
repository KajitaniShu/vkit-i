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

export const GuideNPC = ({player, guideNPC, setSnackOpen, snackMessage}) => {
    const [textBox, setTextBox]     = useState("");     // 説明を表示するテキストボックス
    const [openModal, setOpenModal] = useState(false);  // 行先を表示するモーダルウィンドウが開いているか閉じているか
    const count         = useRef(0);                    // NPCの歩行アニメーション用(画像変更タイミングを測る用)
    const step          = useRef(0);                    // NPCの歩行アニメーション用(画像変更用)
    const srimePos      = useRef();                     // スライムの位置
    const srimeAngle    = useRef(0);                    // スライムの角度
    const clock     = new THREE.Clock();                // デルタタイム取得用

    // スライムのテクスチャを用意
    const texture = new THREE.TextureLoader().load('./images/guide.png');
    texture.wrapS  = THREE.RepeatWrapping;
    texture.repeat.set(0.33,0.25);
    texture.offset.x = nextOffset(step.current= (step.current+1) % 4);   // 足踏みモーション
    texture.offset.y = 0.75 - (srimeAngle.current / 90 ) * 0.25;  // NPCの角度を更新



    // プレイヤーをガイドのところまで移動させる
    function playerToNPC(x, z, deltaTime){
        var speed = 10;
        if(guideNPC.current.lead && (Math.abs(guideNPC.current.pos.x-player.current.pos.x)+Math.abs(guideNPC.current.pos.z-player.current.pos.z))<8) speed = 5;

        if      (guideNPC.current.leadPointX - player.current.pos.x >  1)  { player.current.pos.x+=deltaTime*speed; player.current.angle = 180; }
        else if (guideNPC.current.leadPointX - player.current.pos.x < -1)  { player.current.pos.x-=deltaTime*speed; player.current.angle =  90; }
        else if (guideNPC.current.leadPointZ - player.current.pos.z >  1)  { player.current.pos.z+=deltaTime*speed; player.current.angle =   0; }
        else if (guideNPC.current.leadPointZ - player.current.pos.z < -1)  { player.current.pos.z-=deltaTime*speed; player.current.angle = 270; }
        else{
            guideNPC.current.leadPointX = x;
            guideNPC.current.leadPointZ = z;
            guideNPC.current.lead = true;
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
        if(!guideNPC.current.lead) speed = 0;

        // 目的地方向に移動
        if(x - guideNPC.current.pos.x > 1){ // 目的地が右方向にある場合
            guideNPC.current.pos.x+=deltaTime*speed;
            srimeAngle.current = 180;
            if(!player.current.controllable) playerToNPC(x, z, deltaTime);
            return true; 
        }
        else if (x - guideNPC.current.pos.x < -1) { // 目的地が左方向にある場合 
            guideNPC.current.pos.x-=deltaTime*speed; 
            srimeAngle.current =  90;
            if(!player.current.controllable) playerToNPC(x, z, deltaTime);
            return true; 
        }
        else if (z - guideNPC.current.pos.z >  1) { // 目的地が手前方向にある場合
            guideNPC.current.pos.z+=deltaTime*speed; 
            srimeAngle.current =   0;
            if(!player.current.controllable) playerToNPC(x, z, deltaTime);
            return true; 
        }
        else if (z - guideNPC.current.pos.z < -1) { // 目的地が奥方向にある場合
            guideNPC.current.pos.z-=deltaTime*speed; 
            srimeAngle.current = 270;
            if(!player.current.controllable) playerToNPC(x, z, deltaTime);
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

        if(guideNPC.current.dest !== 'none'){
            var nextDest = path[guideNPC.current.dest].route[guideNPC.current.gIndex];                        // 次の曲がり角を設定

            // 目的地に向かっているとき
            if(nextDest[1] !== 100){
                if(player.current.controllable && guideNPC.current.gIndex === 0) player.current.controllable = false;   // ガイド中はコントロール不可にする
                if(nextDest[1] === -100) {
                    guideNPC.current.dest = 'none'                                       // 定位置  (y座標が-100)についたら目的地を'none'に戻す
                    srimeAngle.current =   0;                                            // 手前を向く
                    guideNPC.current.lead = false;                                       // 先導フラグをオフ
                    guideNPC.current.gIndex = 0;                                         // 参照する曲がり角を0番目にする
                    guideNPC.current.leadPointX =  30;
                    guideNPC.current.leadPointZ = 120;
                }else{
                    // 目的地方向に移動 (曲がり角についたら次の曲がり角を設定)
                    if(!moveNPC(nextDest[0], nextDest[2], deltaTime)) guideNPC.current.gIndex++; 
                }
                
            // 目的地に到達したとき
            }else{
                // コントロール可能にする
                if(!player.current.controllable) player.current.controllable = true;
                
                // 手前を向く
                srimeAngle.current =   0;

                // 目的地に着いたら400カウントして帰る
                if(guideNPC.current.gTime < 6) {
                    guideNPC.current.gTime+=deltaTime;
                    if(guideNPC.current.gTime < 0.1 && textBox === "") setTextBox(path[guideNPC.current.dest].comment[0]);   // 建物の説明 1/2個目 を表示
                    if(guideNPC.current.gTime >   3 && textBox !== "") setTextBox(path[guideNPC.current.dest].comment[1]);  // 建物の説明 2/2個目 を表示
                }else{
                    setTextBox("");
                    // 定位置に帰り始める
                    guideNPC.current.gTime = 0;
                    guideNPC.current.gIndex++;
                }
            }
        }else{
            // モーダルウィンドウを開く・閉じる
            if(((player.current.pos.x-guideNPC.current.pos.x)**2+(player.current.pos.z-guideNPC.current.pos.z)**2)  < 40 && !openModal) setOpenModal(true);
            if(((player.current.pos.x-guideNPC.current.pos.x)**2+(player.current.pos.z-guideNPC.current.pos.z)**2) >= 40 && openModal)  setOpenModal(false);
            
        }

        // NPCのアニメーション
        animateNPC(deltaTime);
        // NPCの位置座標を更新
        updateRefPos(guideNPC.current.pos);
    });
    
    return (
        <>
            <group ref={srimePos}>
                <mesh position={[0,0,0]}>
                    <planeBufferGeometry attach="geometry" args={[4,4]}/>
                    <meshStandardMaterial attach="material" map={texture} transparent={true}/>
                </mesh >
                {textBox !== "" ? <Comment comment={textBox} height={6}/> : ""}
                <Html position={[0,2.5,0]}  transform occlude distanceFactor={17} center className="innerText bgGray" style={{width: countText("ガイドスライム")+2+'em'}} >
                    <p>ガイドスライム</p>
                </Html>
                {openModal ? <GuideModal guideNPC={guideNPC} setOpenModal={setOpenModal} setSnackOpen={setSnackOpen} snackMessage={snackMessage} /> : ""}
            </group>
        </>
    )
}