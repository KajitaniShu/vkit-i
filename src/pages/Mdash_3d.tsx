//@ts-nocheck
import React, { useRef, useEffect } from "react";
import path from '@/configs/model.json'
import Scene from '@/containers/Scene'
import Player from '@/containers/Player'
import Signboards from '@/containers/Signboard'
import { CameraControls, Preload } from '@react-three/drei'
import Animationcharacters from '@/containers/Animationcharacters'
import VideoBoard from '@/containers/VideoBoard'
import { Collider } from '@/containers/Collider'
import { 
  useDisclosure,
  useViewportSize
} from '@mantine/hooks';
import { Loader, Flex, Tabs, px, Text, Header } from '@mantine/core'
import useCharacterModel from '@/hooks/useCharacterModel'
import { NavigationProgress } from '@mantine/nprogress';
import DrawCanvas from '@/containers/DrawCanvas'
import Head from '@/containers/Head'
import { IconChevronLeft } from '@tabler/icons-react';

export default function Mdash_3d() {
  const { height } = useViewportSize();
  const cameraControlsRef = useRef<CameraControls>(null!);
  if(cameraControlsRef?.current != null) {  // @ts-ignore
    cameraControlsRef.current.mouseButtons.left = 0;  // @ts-ignore
    cameraControlsRef.current.touches.one = 0;
  }
  cameraControlsRef.current?.setPosition(1, 3, 4);
  const locked = useRef<boolean>(false);
  const [opened, { open, close }] = useDisclosure();
  const {loading, load, playerModel, characterModels} = useCharacterModel();

  const loadModel = async () => {
    await load(path.player, path.models);
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
          model={playerModel}
          animation_path={path.player.animation_path}
          cameraControlsRef={cameraControlsRef}
          locked={locked}
        />
        <Collider />
        <VideoBoard video_path={path.board.video_path_mdash} position={[-2.89, 1.174, -3.25]}/>

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
              url={value.url}
              cameraControlsRef={cameraControlsRef}
              locked={locked}
            />
          );
        })}
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
