import React, {useState, useRef} from 'react'
import * as Drei from "@react-three/drei";
import { Html, Stats } from "@react-three/drei";

// 文字数をカウント (半角に対応)
function count(text){
    var length = 0.0;
    for(var i=0; i < text.length; i++) {
        text[i].match(/[ -~]/) ? length += 0.5 : length += 1.0;
    }
    return length;
}

export const Model3D = ({value}) => {
    const { scene } = Drei.useGLTF(value);
    return (
    <mesh receiveShadow>
        <primitive object={scene} roughness={10}/>
        
    </mesh>        
    )
}