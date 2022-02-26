import React from 'react'
import * as Fiber from '@react-three/fiber';
import * as Drei from "@react-three/drei";
import { Model_map } from './Model_map';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

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
export const MainContents = () => {

    return (
        <React.Suspense centered fallback={
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><CircularProgress /></Box>
        }>
            <Fiber.Canvas shadows={true} shadowMap camera={{
                position: [0, 100, 100],
                fov: 20,
                aspect: window.innerWidth / window.innerHeight,
                near: 0.1,
                far: 2000
            }}>
                <Drei.OrbitControls enablePan={true} enableRotate={true} />
                <Drei.Environment preset="city" />
                <ambientLight intensity={0.4} />
                <directionalLight
                    castShadow
                    intensity={0.3}
                    position={[0, 0, 100]}
                    shadow-mapSize-height={1024}
                    shadow-mapSize-width={1024}
                />
                    
                    {model_list.map((modelPath, key) => {
                        return (
                            <Model_map modelPath={modelPath} key={key}/>
                        )
                    })}
                    <Drei.ContactShadows position={[0, 0, 0]} opacity={0.4} width={1000} height={1000} blur={0.2} far={4.5} />
                    <Drei.BakeShadows />
                    <gridHelper position={[0, -0.1, 0]} args={[1000, 200, `#565656`, `#2B2B2B`]} divisions={10} />
                    
                    </Fiber.Canvas>
        </React.Suspense>
    );
};
