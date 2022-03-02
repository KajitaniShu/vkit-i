import { Html } from "@react-three/drei"
import {bldgCenterPos} from './BldgData';


export const Signboard = ({playerPos, openModal, setOpenModal, opened, setOpened}) => {
    // 文字数をカウント (半角に対応)
    function countText(text){
        var length = 0.0;
        for(var i=0; i < text.length; i++) {
            text[i].match(/[ -~]/) ? length += 0.5 : length += 1.0;
        }
        return length;
    }

    return (
        {bldgCenterPos.map((key) => {
            return (
                <Html position={bldgCenterPos[key].pos} transform occlude distanceFactor={20} center={true} className="innerText" style={{width: countText("1234567890")+2+'em'}} >
                    <p>{bldgCenterPos[key].name}</p>
                </Html>
            )
        })}
        
    );
}