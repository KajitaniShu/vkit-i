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

export const Model_map = ({modelPath}) => {
    console.log(modelPath);
    const { scene } = Drei.useGLTF(modelPath);
    const [pos, setPos] = useState([Math.round(value.pos[0])*5, Math.round(value.pos[1])*5, Math.round(value.pos[2])*5]);
    return (
    <mesh receiveShadow>
        <primitive position={pos} object={scene} roughness={0} smoothness={10} />
    </mesh>        
    )
}