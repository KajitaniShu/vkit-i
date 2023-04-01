import React from 'react'
import { Html } from "@react-three/drei"
import YouTube, { YouTubeProps } from 'react-youtube';

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.css";

// @ts-ignore
const IntroYoutube = (ref) => {
    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        event.target.mute();
        event.target.cueVideoById({
            'videoId': "LuB4VaScsHo"});
        event.target.playVideo();
    }


    const opts: YouTubeProps['opts'] = {
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            loop: 1
        },
        controls: 0
    };

    return (
        <>
            <Html zIndexRange={[100, 50]} position={[1.8, 2, 10.27]} transform occlude distanceFactor={1.4} center={true} >
                <Carousel autoPlay={true}  width={"640px"} showStatus={false} autoFocus={true} infiniteLoop={true} stopOnHover={true}>
                    <div>
                        <YouTube opts={opts} onReady={onPlayerReady} style={{ zIndex: 0 }} />
                    </div>
                    <div>
                        <YouTube opts={opts} onReady={onPlayerReady} style={{ zIndex: 0 }} />
                    </div>
                    <div>
                        <YouTube opts={opts} onReady={onPlayerReady} style={{ zIndex: 0 }} />
                    </div>
                </Carousel>
            </Html>

        </>
    );
}

export default IntroYoutube