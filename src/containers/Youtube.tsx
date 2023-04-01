import React, { FC, useEffect } from 'react'
import { Html, useGLTF, Image } from "@react-three/drei"
import { useFrame} from '@react-three/fiber';
import YouTube, { YouTubeProps } from 'react-youtube';
import SceneModel from '@/components/molecules/SceneModel'
import YoutubeProps from '@/types/interfaces/YoutubeProps'
import { Vector3 } from 'three';

const Youtube: FC<YoutubeProps> = ({playerRef}) => {
    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        event.target.mute();
        event.target.cueVideoById({
            'videoId': "36IO1k4Z6yg"});
        event.target.playVideo();
    }

    
    const opts: YouTubeProps['opts'] = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            loop: 1,
            rel: 0
        },
        controls: 0
    };
    const gltf = useGLTF("./board.glb");
    return (
        <>
        <SceneModel 
            // @ts-ignore
            gltf={gltf} position={[-3, 0, 10.7]} scale={new Vector3(0.23, 0.23, 0.23)}
        />
        <mesh position={[-3, 0, 10.7]} scale={[1, 1.07, 1]}>
            <Html position={[0, 1.2, 0.02]} scale={[0.15, 0.15, 0.15]} transform  occlude>
                <YouTube  opts={opts} onReady={onPlayerReady} style={{zIndex:0}}/>
            </Html>
        </mesh>
        </>
    );
}

export default Youtube