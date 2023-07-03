import React from 'react'
import { Html } from "@react-three/drei"
import { Vector3 } from 'three';

const bldgCenterPos = [
    // 各施設のマップ上での位置
    {name: '研究管理棟',                 pos: new Vector3( -1.8, 1.2, -6.0)},
    {name: '図書館',                    pos: new Vector3(  5.4, 1.5, -6.5)},
    {name: '講義棟',                    pos: new Vector3(  7.1, 2.1, -14.0)},
    {name: '研究棟',                    pos: new Vector3(  1.6, 3.5, -14.6)},
    {name: '総合研究棟',                 pos: new Vector3( -6.1, 3.5, -13.2)},
    {name: 'マイクロ化総合技術センター',    pos: new Vector3(  0.7, 1.4, -21.0)},
    {name: '課外活動共用施設',            pos: new Vector3( 10.3, 1.3, -23.3)},
    {name: '体育館',                    pos: new Vector3( 10.4, 1.8, -31.5)},
    {name: 'ポルト棟',                  pos: new Vector3( 11.9, 1.0, -9.0)},
    {name: '共通教育研究棟',             pos: new Vector3(  2.7, 2.2, -8.2)},
    {name: '情報基盤センター',            pos: new Vector3( -2.2, 1.8, -10.2)},
    {name: 'インキュベーション施設',       pos: new Vector3( -5.8, 1.25, -10.2)},
    {name: 'ラーニングアゴラ棟',          pos: new Vector3( 10.5, 1.0, -18.2)},
    {name: '福利棟',                    pos: new Vector3(  6.4, 1.2, -18.2)},
    {name: '実習棟',                    pos: new Vector3( -2.6, 1.0, -21.0)},
    {name: 'MILAiS',                   pos: new Vector3(11.95, 0.7, -11.7)},
    { name: 'スチューデント・レジデンス', pos: new Vector3(-8.9, 2.0, -34.8) }
]

function countText(text: String) {
    var length = 0.0;
    for (var i = 0; i < text.length; i++) {
        text[i].match(/[ -~]/) ? length += 0.5 : length += 1.0;
    }
    return length;
}

const Signboards = () => {
    return (
        <>
            {bldgCenterPos.map((value, key) => {
                return (
                    <Html sprite={true} zIndexRange={[1, 0]} position={value.pos} transform occlude distanceFactor={4} center={true} key={key} style={{ width: countText(value.name) + 2 + 'em' }} >
                        <div style={{ backgroundColor: "#343434", textAlign: "center", lineHeight: "0.5em", padding: "0.1em", borderRadius: "5px", userSelect: "none" }}>
                            <p style={{ color: "white" }}> {value.name} </p>
                        </div>
                    </Html>
                );
            })}
        </>
    );
}
export default Signboards