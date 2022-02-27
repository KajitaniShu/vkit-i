import React from 'react'
import * as Fiber from '@react-three/fiber';
import * as Drei from "@react-three/drei";
import { Model3D } from './Model3D';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { DepthOfField, EffectComposer } from '@react-three/postprocessing'

const model_list = [
    "./models/map_activity.glb",
    "./models/map_administration.glb",
    "./models/map_agora.glb",
    "./models/map_cafeteria.glb",
    "./models/map_career.glb",
    "./models/map_dormitory.glb",
    "./models/map_education.glb",
    "./models/map_gym.glb",
    "./models/map_nature.glb",
    "./models/map_incubation.glb",
    "./models/map_isc.glb",
    "./models/map_lecture.glb",
    "./models/map_lecture_large.glb",
    "./models/map_lecture2.glb",
    "./models/map_library.glb",
    "./models/map_machine_workshop.glb",
    "./models/map_MILAiS.glb",
    "./models/map_research.glb",
    "./models/map_research_satellite.glb",
    "./models/map_swimming_pool.glb",
    "./models/map_workshop.glb",
    ]

Drei.softShadows()
export const Draw3D = ({itemList}) => {

    return (
        <React.Suspense centered fallback={
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><CircularProgress /></Box>
        }>
            <Fiber.Canvas dpr={[1, 2]} className="relative" shadows={true}shadowMap camera={{
                position: [0, 100, 100],
                fov: 30,
                aspect: window.innerWidth / window.innerHeight,
                near: 0.1,
                far: 2000
            }}>
                <Drei.OrbitControls enablePan={true} enableRotate={true} />
                <Drei.Environment preset="city" />
                <ambientLight intensity={0.5} />
                    {model_list.map((value, key) => {
                        return (
                            <Model3D value={value} key={key}/>
                        )
                    })}
                    <Drei.ContactShadows position={[0, 0, 0]} opacity={0.2} width={1000} height={1000} blur={0.1} far={1} />
                    <Drei.BakeShadows />
                    
            </Fiber.Canvas>
        </React.Suspense>
    );
};
