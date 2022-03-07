import React, {useRef} from 'react'
import * as Drei from "@react-three/drei";
import {Bounds, useBounds} from "@react-three/drei";
import {model_list} from './BldgData';

// 文字数をカウント (半角に対応)
function count(text){
    var length = 0.0;
    for(var i=0; i < text.length; i++) {
        text[i].match(/[ -~]/) ? length += 0.5 : length += 1.0;
    }
    return length;
}

const mapModel = (model) =>{
    const {scene} = Drei.useGLTF(model);
    return(
        <primitive object={scene} roughness={0}/>
    );
}


export const Model3D = ({isBound}) => {
    const bound                 = useBounds();
    const activity              = useRef();
    const administration        = useRef();
    const agora                 = useRef();
    const cafeteria             = useRef();
    const career                = useRef();
    const dormitory             = useRef();
    const education             = useRef();
    const _500                  = useRef();
    const microelectronic       = useRef();
    const gym                   = useRef();
    const nature                = useRef();
    const incubation            = useRef();
    const isc                   = useRef();
    const lecture               = useRef();
    const lecture_large         = useRef();
    const lecture2              = useRef();
    const library               = useRef();
    const machine_workshop      = useRef();
    const MILAiS                = useRef();
    const research              = useRef();
    const research_satellite    = useRef();
    const swimming_pool         = useRef();
    const workshop              = useRef();
    
    if(activity.current !== undefined && isBound === 'activity') {bound.refresh(activity.current).fit(); console.log(isBound); }
    if(activity.current !== undefined && isBound === 'lecture') {bound.refresh(lecture.current).fit(); console.log(isBound); }

    return (
        <Bounds>
        <mesh receiveShadow ref={activity}>{mapModel("./models/map_activity.glb")}</mesh>
        <mesh receiveShadow>{mapModel("./models/map_administration.glb")}</mesh>      
        <mesh receiveShadow>{mapModel("./models/map_agora.glb")}</mesh>      
        <mesh receiveShadow>{mapModel("./models/map_cafeteria.glb")}</mesh>      
        <mesh receiveShadow>{mapModel("./models/map_career.glb")}</mesh>      
        <mesh receiveShadow>{mapModel("./models/map_dormitory.glb")}</mesh>      
        <mesh receiveShadow>{mapModel("./models/map_education.glb")}</mesh>      
        <mesh receiveShadow>{mapModel("./models/map_500.glb")}</mesh>
        <mesh receiveShadow>{mapModel("./models/map_microelectronic.glb")}</mesh>
        <mesh receiveShadow>{mapModel("./models/map_gym.glb")}</mesh>
        <mesh receiveShadow>{mapModel("./models/map_nature.glb")}</mesh>
        <mesh receiveShadow>{mapModel("./models/map_incubation.glb")}</mesh>
        <mesh receiveShadow>{mapModel("./models/map_isc.glb")}</mesh>
        <mesh receiveShadow ref={lecture}>{mapModel("./models/map_lecture.glb")}</mesh>
        <mesh receiveShadow>{mapModel("./models/map_lecture_large.glb")}</mesh>
        <mesh receiveShadow >{mapModel("./models/map_lecture2.glb")}</mesh>
        <mesh receiveShadow>{mapModel("./models/map_library.glb")}</mesh>
        <mesh receiveShadow>{mapModel("./models/map_machine_workshop.glb")}</mesh>
        <mesh receiveShadow>{mapModel("./models/map_MILAiS.glb")}</mesh>
        <mesh receiveShadow>{mapModel("./models/map_research.glb")}</mesh>
        <mesh receiveShadow>{mapModel("./models/map_research_satellite.glb")}</mesh>
        <mesh receiveShadow>{mapModel("./models/map_swimming_pool.glb")}</mesh>
        <mesh receiveShadow>{mapModel("./models/map_workshop.glb")}</mesh>
        </Bounds>
    )
}