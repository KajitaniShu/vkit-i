import { FC, useEffect, useState, useRef } from 'react'
import { useFrame} from '@react-three/fiber';
import { Html, useAnimations, useGLTF, CameraControls, Circle } from '@react-three/drei'
import YoutubePosterProps from '@/types/interfaces/YoutubePoster'
import YoutubePosterModal from '@/components/organisms/YoutubePosterModal'
import { Mesh } from "three"
import { 
  Button,
  MantineProvider, 
  ColorSchemeProvider, 
  ColorScheme, 
  Header,
  Container,
  Group,
  Title,
  Modal,
  ActionIcon,
  ScrollArea,
  Table,
  Tooltip,
  Badge,
  Text,
  Paper
} from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';
import { 
  IconInfoSmall 
} from '@tabler/icons-react';


const YoutubePoster: FC<YoutubePosterProps> = ({ playerRef, cameraControlsRef, locked, modelPath, position, modal_header, messages, modal_message, modal_url, btnInfo, ids }) => {
  const gltf = useGLTF(modelPath)
  const meshRef = useRef<Mesh>(null!);
  const [isOpen, setIsOpen] = useState(false);
  const [msgOpen, setMsgOpen] = useState(false);
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const { scene, animations } = useGLTF(modelPath);
  const { actions } = useAnimations(animations, scene);

  // メッセージの切り替え用
  const [messageIdx, setMessageIdx] = useState<number>(0);
  let timer: number = 0.0;  

  useEffect(() => {
    actions.Idle?.play();
  }, [actions, scene]);

  useFrame((_, delta) => {
    // @ts-ignore
    if(Math.abs(playerRef.current.position.x - position.x) + Math.abs(playerRef.current.position.z - position.z) < 0.7) {    // キャラクターが話しかける圏内に入った
      // @ts-ignore
      if(!isOpen && locked.current != null && cameraControlsRef.current != null && btnInfo.current != null) {
        // @ts-ignore
        locked.current = true;
        // @ts-ignore
        cameraControlsRef.current?.setTarget(meshRef.current?.position.x, meshRef.current?.position.y, meshRef.current?.position.z, true);
        // @ts-ignore
        cameraControlsRef.current?.saveState();

        // @ts-ignore
        if(cameraControlsRef != null) cameraControlsRef.current.fitToBox(meshRef.current, true);
        setIsOpen(true);
        setMsgOpen(true);
      }

      if(messageIdx >= messages.length) {  // 話が終わった
        // @ts-ignore
        btnInfo.current.open = false
        setMsgOpen(false);
        // @ts-ignore
        if(locked.current != null && cameraControlsRef.current != null) {
          // @ts-ignore
          locked.current = false;
          // @ts-ignore
          cameraControlsRef.current?.reset(true);
        }
  
        setMessageIdx(0);
      }
      else{     // 話し中
        if(timer > 3) {
          setMessageIdx(messageIdx+1);  // timer > 1.5 で次のメッセージを表示
          timer = 0.0;
        }
        timer += delta;
      }
    }else{
      if(isOpen) setIsOpen(false);
    }
    
  });

  function countText(text: String){
      var length = 0.0;
      for(var i=0; i < text.length; i++) {
          text[i].match(/[ -~]/) ? length += 0.5 : length += 1.0;
      }
      return length;
  }
  
  return (
    <>
      {/*
      <Html zIndexRange={[40, 0]} position={position} transform occlude distanceFactor={4} center={true} style={{ width: countText(modal_header + "の情報を知りたい？") + 2 + 'em' }} >
        <div style={{ backgroundColor: "#343434", textAlign: "center", padding: "0.1em", borderRadius: "5px", userSelect: "none" }}>
          <p style={{ color: "white" }}> {modal_header}の情報を知りたい？ </p>
        </div>
      </Html>
      */}

      
      {/* @ts-ignore */}
      <Html zIndexRange={[4, 2]} position={[position.x, 1, position.z]} occlude distanceFactor={4} center={true} style={{width: "16em"}}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          {msgOpen && 
          <Paper shadow="xs" radius="md" p="md" style={{textAlign: "center"}}>
            <Text>{messages[messageIdx]}</Text>
          </Paper>
          }
        </MantineProvider>
      </Html>
        
      
      <mesh>
        <primitive
          ref={meshRef}
          object={gltf.scene.clone()}
          position={position}
          scale={[0.3, 0.3, 0.3]}
        />
      </mesh>

{/*
      <ChakraWrapper>
        <YoutubePosterModal
          opened={false}
          onClose={handleClose}
          modal_header={modal_header}
          modal_message={modal_message}
          modal_url={modal_url}
          ids={ids}
        />
      </ChakraWrapper>
    */}
    </>
  )
}

export default YoutubePoster