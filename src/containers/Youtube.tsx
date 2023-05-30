import React, { FC, useEffect, useRef } from 'react'
import { Html, useGLTF, Image } from "@react-three/drei"
import { useFrame} from '@react-three/fiber';
import YouTube, { YouTubeProps } from 'react-youtube';
import SceneModel from '@/components/molecules/SceneModel'
import YoutubeProps from '@/types/interfaces/YoutubeProps'
import { Vector3 } from 'three';
import ReactPlayer from 'react-player/lazy'

const Youtube: FC<YoutubeProps> = ({playerRef}) => {
    const gltf = useGLTF("./board.glb");
    const player = useRef(null);

    return (
        <>
        <SceneModel 
            // @ts-ignore
            gltf={gltf} position={[-3, 0, 10.7]} scale={new Vector3(0.23, 0.23, 0.23)}
        />
        <mesh position={[-3, 0, 10.7]} scale={[1, 1.07, 1]}>
            <Html zIndexRange={[2, 0]} position={[0, 1.2, 0.02]} scale={[0.15, 0.15, 0.15]} transform  occlude>
                {/* @ts-ignore */}
                <ReactPlayer 
                    loop={true}
                    controls={false}
                    ref={player}
                    muted={true}
                    onReady={() => console.log('onReady')}
                    url='https://www.youtube.com/embed/36IO1k4Z6yg' 
                />
            </Html>
        </mesh>
        </>
    );
}

export default Youtube