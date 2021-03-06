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
        <>
            <Html zIndexRange={[100, 50]} position={[1.8, 2, 10.27]} transform occlude distanceFactor={1.4} center={true} >
                <YouTube  opts={opts} onReady={onPlayerReady} style={{zIndex:0}}/>
            </Html>
        </>
    );
}

export default Youtube