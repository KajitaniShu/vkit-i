import React from 'react'
import { Html } from "@react-three/drei"

// 文字数をカウント (半角に対応)
function countText(text){
    var length = 0.0;
    for(var i=0; i < text.length; i++) {
        text[i].match(/[ -~]/) ? length += 0.5 : length += 1.0;
    }
    return length;
}

export const Comment = ({comment, height}) => {
    return (
        <Html position={[0, height, 0]} transform occlude distanceFactor={25} center={true} className="innerText bgWhite commentBox" style={{width: "12em"}} >
            <p>{comment}</p>
        </Html>
    );
}

