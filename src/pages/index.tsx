import React, { useState, useRef, Suspense, useEffect } from "react";
import { NextPage } from 'next'
import path from '@/configs/model.json'
import Scene from '@/containers/Scene'
import DrawCanvas from '@/containers/DrawCanvas'
import Player from '@/containers/Player'
import Signboards from '@/containers/Signboard'
import Head from '@/containers/Head'
import FooterButton from '@/containers/FooterButton'
import { CameraControls } from '@react-three/drei'
import { Animationcharacters } from '@/containers/Animationcharacters'
import VideoBoard from '@/containers/VideoBoard'
import { 
  useDisclosure,
} from '@mantine/hooks';

const IndexPage: NextPage = () => {
  const btnInfo = useRef<any>({open: false, info: "none"}); 
  const cameraControlsRef = useRef<CameraControls>(null!);
  if(cameraControlsRef?.current != null) {  // @ts-ignore
    cameraControlsRef.current.mouseButtons.left = 0;  // @ts-ignore
    cameraControlsRef.current.touches.one = 0;
  }
  cameraControlsRef.current?.setPosition(1, 3, 4);
  const locked = useRef<boolean>(false);
  const [opened, { open, close }] = useDisclosure();

  return (
    <>
      <Head />
      <FooterButton opened={opened} close={close} />
      <DrawCanvas>
        <Scene
          modelPath={path.scene[0].model_path}
        />
        <Player
          cameraControlsRef={cameraControlsRef}
          locked={locked}
          modelPath={path.player.model_path}
        />
        
        <VideoBoard video_path={path.board.video_path}/>
        {path.professors.map((value, key) => {
          return (
            <Animationcharacters 
              modelPath={value.model_path}
              animationPath={value.animation_path}
              position={value.position}
              rotation={value.rotation}
              messages={value.messages}
              cameraControlsRef={cameraControlsRef}
              locked={locked}
            />
          );
        })}
        <Signboards/>
      </DrawCanvas>
    </>
  )
}

export default IndexPage