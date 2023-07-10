import React, {useState, useEffect, useRef } from 'react'
import { useFrame } from 'react-three-fiber'
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { VRMLoaderPlugin, VRMUtils, VRM } from '@pixiv/three-vrm'
import THREE, { Scene, AnimationMixer, Clock, Mesh, Vector3 } from 'three'
import { Html, useGLTF, useAnimations } from '@react-three/drei'
import { loadMixamoAnimation } from '@/containers/loadMixamoAnimation'
import { Physics, RigidBody, BallCollider } from "@react-three/rapier";
import { 
  ActionIcon,
  Text,
  Paper,
  Group,
  Button,
  Box
} from '@mantine/core';
import { IconSquareRoundedX, IconExternalLink } from '@tabler/icons-react';


const Animationcharacters = React.memo(function Animationcharacters({model, animationPath, position, rotation, messages, url, cameraControlsRef, locked}: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [messageIdx, setMessageIdx] = useState<number>(0);  // メッセージの切り替え用
  const mesh = useRef<Mesh>();
  const _position = new Vector3(position[0], position[1]+0.5, position[2]);

  let timer = 0.0;
  const clock = new Clock();
  let mixer: any;
  let frame = 0;
  let tmpDelta = 0.0;

  function animate() {
    requestAnimationFrame(animate);
    const distance = _position.distanceTo(cameraControlsRef.current?._target);  // カメラのターゲット(主にプレイヤーの位置)とアニメーションキャラクターの距離
    if(distance > 5) return;  // 距離が5より大きい場合アニメーションさせない

    let skipFrame = 3;
    if(distance < 2) skipFrame = 2;

    // skipFrame回に一回だけアニメーションを更新
    frame++;
    tmpDelta += clock.getDelta();
    if(frame < skipFrame) return;
    
    if ( mixer ) mixer.update(tmpDelta * 1.5);
    if ( model ) model.update(tmpDelta * 1.5);
    
    // デルタタイムとframeを初期化
    tmpDelta = 0.0;
    frame = 0;
  }

  function initTalk(e: any){
    // @ts-ignore
    if(!isOpen && locked.current != null && cameraControlsRef.current != null) {
      // @ts-ignore
      locked.current = true;
      // @ts-ignore
      cameraControlsRef.current?.saveState();
      
      // @ts-ignore
      if(cameraControlsRef != null) {
        cameraControlsRef.current.setLookAt(_position.x, _position.y+1.5, _position.z+3, _position.x, _position.y+0.5, _position.z, true);
      }
      setIsOpen(true);
    }
  }

  useEffect(() => {
    mixer = new AnimationMixer(model.scene);
    loadMixamoAnimation( animationPath, model).then( ( clip ) => {
      mixer.clipAction(clip).play();
      mixer.timeScale = 0.6;

      const delta = clock.getDelta();
      if ( mixer ) mixer.update(delta * 1.5);
      if ( model ) model.update(delta * 1.5);
    } );
    animate();
  }, []);

  
  useFrame((_, delta) => {
    if(isOpen){
      if(messageIdx >= messages.length) {  // 話が終わった または 閉じるボタンを押した
        // @ts-ignore
        if(locked.current != null && cameraControlsRef.current != null) {
          // @ts-ignore
          locked.current = false;
          // @ts-ignore
          cameraControlsRef.current?.reset(true);
        }
          setMessageIdx(0);
          setIsOpen(false);
      }
      else{     // 話し中
        if(timer > 4.5) {               // timer > 6 で次のメッセージを表示
          setMessageIdx(messageIdx+1);  
          timer = 0.0;
        }
        timer += delta;
      }
    }
  });
console.log(url)
  return(
    
    <> 
    {/* @ts-ignore */}
    <Html zIndexRange={[4, 2]} position={[_position.x, _position.y+1, _position.z]} occlude distanceFactor={4} center={true} style={{width: "16em"}}>
          {isOpen && 
          <Box
            sx={(theme) => ({
              textAlign: 'center',
              borderRadius: theme.radius.md,
              backgroundColor: theme.white,
              border: "2px solid #422612",
              padding: `${theme.spacing.md} ${theme.spacing.md}`,
              fontSize: theme.fontSizes.sm,
      
              '&:hover': {
                backgroundColor:
                  theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
              },
            })}
          >
            <Group position="right" noWrap>
            <ActionIcon title="閉じる" onClick={() => setMessageIdx(messages.length)} variant="transparent">
              <IconSquareRoundedX color="#422612" size="1.125rem" />
            </ActionIcon>
            </Group>
            <Text color="#422612">{messages[messageIdx]}</Text>
            <Group position="right" noWrap>
            {!(url === "") && 
              <Button 
                variant="fill" 
                compact 
                mt="lg" 
                size="sm" 
                component="a"
                target="_blank"
                href={url}
                styles={(theme) => ({
                  root: {
                    backgroundColor: '#422612',
                    color: 'white',
                    fontSize: theme.spacing.xs,
                    border: 0,
                    '&:not([data-disabled])': theme.fn.hover({
                      backgroundColor: theme.fn.darken('#422612', 0.05),
                    }),
                  },
                })}
                rightIcon={<IconExternalLink size="0.9rem" />}>
                  もっと知る
              </Button>
            }
            </Group>
              </Box>
          }
    </Html>
      <RigidBody
        type="fixed"
        colliders={false}
      >
        <BallCollider 
          position={_position} args={[0.5]} 
          sensor
          onIntersectionEnter={(e) => initTalk(e)} /> {/* @ts-ignore */}
          <mesh scale={[1.2, 1.2, 1.2]} rotation={rotation} position={position} ref={mesh}>
            {model ?
              <primitive
                object={model.scene}
              />
              :
              <></>
            }
          </mesh>
      </RigidBody>
    </>
  )
})

export default Animationcharacters