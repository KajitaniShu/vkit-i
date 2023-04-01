import React from 'react'
import { Html } from "@react-three/drei"

import YouTube, { YouTubeProps } from 'react-youtube';

const Youtube = () => {
    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        event.target.mute();
        event.target.cueVideoById({
            'videoId': "LuB4VaScsHo"});
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

    return (
        
        <mesh position={[1.8, 2, 8]} scale={[1.4, 1, 0.05]}>
        <boxBufferGeometry >
            <Html position={[0, 0, 1]} scale={[0.2, 0.2, 0.2]} transform  >
                <YouTube  opts={opts} onReady={onPlayerReady} style={{zIndex:0}}/>
            </Html>
        </boxBufferGeometry>
        </mesh>
    );
}

export default Youtube