import React, {useState, useRef} from 'react'
import { useDrag } from "@use-gesture/react";
import * as Drei from "@react-three/drei";
import { Html, Stats } from "@react-three/drei";
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { Canvas, extend, useThree, useLoader } from "react-three-fiber"
import * as THREE from 'three'

extend({ DragControls })

export const MouseControls = ({player}) => {
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const [state, setState] = useState(false);

    const forward   = [0,0];
    const back      = [0,0];
    const left      = [0,0];
    const right     = [1,0];

    var _pos = new THREE.Vector3();
    
    const bind = useDrag((props) => {
        if(!player.current.controllable) return;
        
        // マウスのボタンが離されたらフラグをfalseにする
        if(!props.down) {
            player.current.forward=false;
            player.current.back=false;
            player.current.left=false;
            player.current.right=false;
            return;
        }

        // クリックされた位置からの移動方向(axis)とその位置関係からプレイヤーの移動フラグを制御
        if(props.axis === "x" && props.initial[0] < props.xy[0]) player.current.right   =true;
        if(props.axis === "x" && props.initial[0] > props.xy[0]) player.current.left    =true;

        if(props.axis === "y" && props.initial[1] < props.xy[1]) player.current.back    =true;
        if(props.axis === "y" && props.initial[1] > props.xy[1]) player.current.forward =true;
        return;
    });

    return (
        <mesh {...bind()} rotation={[-Math.PI/2, 0, 0]}>
            <planeBufferGeometry  args={[1000,1000]}/>
            <meshBasicMaterial transparent={true} opacity={0} />
        </mesh>
    )
}