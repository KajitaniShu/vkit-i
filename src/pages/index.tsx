import React, { useState, useRef, Suspense, useEffect } from "react";
import { NextPage } from 'next'
import path from '@/configs/model.json'
import Scene from '@/containers/Scene'
import DrawCanvas from '@/containers/DrawCanvas'
import Player from '@/containers/Player'
import Signboards from '@/containers/Signboard'
import Head from '@/containers/Head'
import FooterButton from '@/containers/FooterButton'
import { CameraControls, Preload, AdaptiveDpr, Text } from '@react-three/drei'
import Animationcharacters from '@/containers/Animationcharacters'
import VideoBoard from '@/containers/VideoBoard'
import { 
  useDisclosure,
} from '@mantine/hooks';
import useCharacterModel from '@/hooks/useCharacterModel'
import {Loading} from '@/containers/Loading'

const IndexPage: NextPage = () => {
  const cameraControlsRef = useRef<CameraControls>(null!);
  if(cameraControlsRef?.current != null) {  // @ts-ignore
    cameraControlsRef.current.mouseButtons.left = 0;  // @ts-ignore
    cameraControlsRef.current.touches.one = 0;
  }
  cameraControlsRef.current?.setPosition(1, 3, 4);
  const locked = useRef<boolean>(false);
  const [opened, { open, close }] = useDisclosure();
  const {characters, loading, progress, load, characterModels} = useCharacterModel();

  const loadModel = async () => {
    await load(path.professors);
  }

  useEffect(() => {
    if(!characterModels) loadModel();
  }, []);

  return (
    <>
      <Head />
      {!loading ?

        <DrawCanvas>
          <Preload all />
          <Scene
            modelPath={path.scene[0].model_path}
          />
          <CameraControls
            ref={cameraControlsRef}
            minDistance={4}
            distance={10}
            maxDistance={35}
            enabled={true}
            verticalDragToForward={false}
            dollyToCursor={false}
            infinityDolly={false}
          />
          <Player
            cameraControlsRef={cameraControlsRef}
            locked={locked}
            modelPath={path.player.model_path}
          />
          <AdaptiveDpr pixelated />
          <VideoBoard video_path={path.board.video_path}/>
          {characterModels && characterModels.length > 0 && characterModels.map((value: any, key: any) => {
            return (
              <Animationcharacters
                model={value.models}
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
      :
        <Loading progress={progress} />
      }
    </>
  )
}

export default IndexPage