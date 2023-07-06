import React, { useState, useRef, Suspense, useEffect } from "react";
import { NextPage } from 'next'
import path from '@/configs/model.json'
import Scene from '@/containers/Scene'
import DrawCanvas from '@/containers/DrawCanvas'
import Player from '@/containers/Player'
import Signboards from '@/containers/Signboard'
import Head from '@/containers/Head'
import FooterButton from '@/containers/FooterButton'
import { CameraControls, Preload, AdaptiveDpr } from '@react-three/drei'
import Animationcharacters from '@/containers/Animationcharacters'
//import NonAnimationcharacters from '@/containers/NonAnimationcharacters'
import VideoBoard from '@/containers/VideoBoard'
import { 
  useDisclosure,
  useViewportSize
} from '@mantine/hooks';
import { Loader, Flex, rem, px, Text, Group } from '@mantine/core'
import useCharacterModel from '@/hooks/useCharacterModel'
import { NavigationProgress } from '@mantine/nprogress';

const IndexPage: NextPage = () => {
  const { width, height } = useViewportSize();
  const cameraControlsRef = useRef<CameraControls>(null!);
  if(cameraControlsRef?.current != null) {  // @ts-ignore
    cameraControlsRef.current.mouseButtons.left = 0;  // @ts-ignore
    cameraControlsRef.current.touches.one = 0;
  }
  cameraControlsRef.current?.setPosition(1, 3, 4);
  const locked = useRef<boolean>(false);
  const [opened, { open, close }] = useDisclosure();
  const {loading, load, characterModels} = useCharacterModel();

  const loadModel = async () => {
    await load(path.professors, path.students_man);
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

          {/* 教授キャラクター(クローンが使えないパターン) */}
          {characterModels && characterModels.length > 0 && characterModels.map((value: any, key: any) => {
            return (
              <Animationcharacters
                key={key}
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

          {/* 学生キャラクター(クローンが使えるパターン) */}
          {/*
            manModel && path.students_man.property.map((value: any, key: any) => {
              return (
                <NonAnimationcharacters
                  key={key}
                  model={manModel}
                  animationPath={value.animation_path}
                  position={value.position}
                  rotation={value.rotation}
                  messages={value.messages}
                  cameraControlsRef={cameraControlsRef}
                  locked={locked}
                />
              );
            })
          */}

          <Signboards/>
        </DrawCanvas>
      :
      <>
        <NavigationProgress />
        <Flex
          h={height}
          gap="md"
          justify="center"
          align="center"
          direction="column"
          wrap="nowrap"
        >
          
          <Loader size="lg" variant="bars" />
          <Text color="gray">読み込み中...</Text>
        </Flex>
        </>
      }
    </>
  )
}

export default IndexPage