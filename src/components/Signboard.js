import React from 'react'
import { Html } from "@react-three/drei"
import {bldgCenterPos} from './BldgData';

// 文字数をカウント (半角に対応)
function countText(text){
    var length = 0.0;
    for(var i=0; i < text.length; i++) {
        text[i].match(/[ -~]/) ? length += 0.5 : length += 1.0;
    }
    return length;
}

export const Signboards = () => {
    return (
        <>
        {bldgCenterPos.map((value, key) => {
            return (
                <Html position={value.pos} transform occlude distanceFactor={30} center={true} className="innerText bgBlack" key={key} style={{width: countText(value.name)+2+'em'}} >
                    <p>{value.name}</p>
                </Html>
            );
        })}
    </>
    );
}

