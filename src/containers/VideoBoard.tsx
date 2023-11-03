import React, { FC, useEffect, useRef, useState, Suspense } from 'react'
import { Html, useGLTF, useVideoTexture, Plane, PositionalAudio } from "@react-three/drei"
import { useFrame} from '@react-three/fiber';
import path from '@/configs/model.json'
import SceneModel from '@/components/molecules/SceneModel'
import YoutubeProps from '@/types/interfaces/VideoProps'
import { Vector3, RepeatWrapping } from 'three';
import ReactPlayer from 'react-player/lazy'
import VideoProps from '@/types/interfaces/VideoProps'

const VideoBoard: FC<VideoProps> = ({video_path, position}) => {
    const [video, setVideo] = useState()
    const gltf = useGLTF(path.board.model_path);
    const texture = useVideoTexture(video_path);

    return (
        <>
        <mesh position={position}>
            <Plane args={[2.13, 1.4]}>
                <meshBasicMaterial map={texture}  />
            </Plane>
            
        </mesh>
        </>
    );
}

export default VideoBoard