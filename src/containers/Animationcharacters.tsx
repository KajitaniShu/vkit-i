import React, {useState, useEffect, useRef } from 'react'
import { useFrame } from 'react-three-fiber'
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { VRMLoaderPlugin, VRMUtils, VRM } from '@pixiv/three-vrm'
import THREE, { Scene, Group, AnimationMixer, Clock, Mesh } from 'three'
import { Html, useGLTF, useAnimations } from '@react-three/drei'
import { loadMixamoAnimation } from '@/containers/loadMixamoAnimation'
import { Physics, RigidBody, BallCollider } from "@react-three/rapier";
import { 
  MantineProvider,
  Text,
  Paper
} from '@mantine/core';


const Animationcharacters = React.memo(function Animationcharacters({model, animationPath, position, rotation, messages, cameraControlsRef, locked}: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [messageIdx, setMessageIdx] = useState<number>(0);  // メッセージの切り替え用
  const mesh = useRef<Mesh>();

  let timer: number = 0.0;
  const clock = new Clock();
  let mixer: any;

  function animate() {
    requestAnimationFrame( animate );
    const deltaTime = clock.getDelta();
    if ( mixer ) {
      mixer.update( deltaTime );
    }
    if ( model ) {
      model.update( deltaTime );
    }
  }

  function initTalk(e: any){
    // @ts-ignore
    if(!isOpen && locked.current != null && cameraControlsRef.current != null) {
      // @ts-ignore
      locked.current = true;
      // @ts-ignore
      cameraControlsRef.current?.saveState();
      
      // @ts-ignore
      if(cameraControlsRef != null) cameraControlsRef.current.setLookAt(e.rigidBodyObject.position.x, e.rigidBodyObject.position.y+3, e.rigidBodyObject.position.z+4, e.rigidBodyObject.position.x, e.rigidBodyObject.position.y, e.rigidBodyObject.position.z, true);
      setIsOpen(true);
    }
  }

  useEffect(() => {
    mixer = new AnimationMixer(model.scene);
    loadMixamoAnimation( animationPath, model).then( ( clip ) => {
      mixer.clipAction(clip).play();
      mixer.timeScale = 0.6;
    } );

    animate();
  }, []);

  
  useFrame((_, delta) => {
    mixer?.update(delta);
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

  return(
    
    <> 
    {/* @ts-ignore */}
    <Html zIndexRange={[4, 2]} position={[position[0], 1.3, position[2]]} occlude distanceFactor={4} center={true} style={{width: "16em"}}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          {isOpen && 
          <Paper shadow="xs" radius="md" p="md" style={{textAlign: "center"}}>
            <Text>{messages[messageIdx]}</Text>
          </Paper>
          }
        </MantineProvider>
    </Html>
    
      <RigidBody
        type="fixed"
        colliders={false}
      >
        <BallCollider 
          position={[position[0], position[1]+0.5, position[2]]} args={[0.5]} 
          sensor
          onIntersectionEnter={(e) => initTalk(e)} /> {/* @ts-ignore */}
          <mesh scale={[1.2, 1.2, 1.2]} rotation={rotation} position={position} ref={mesh} castShadow>
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