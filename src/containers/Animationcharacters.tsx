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

export function Animationcharacters({modelPath, position, rotation, messages, cameraControlsRef, locked}: any) {
  const [vrm, setVrm] = useState<GLTF>()
  const [isOpen, setIsOpen] = useState(false);
  const [messageIdx, setMessageIdx] = useState<number>(0);  // メッセージの切り替え用
  const mesh = useRef<Mesh>();

  let timer: number = 0.0;
  const loader = new GLTFLoader();
  loader.crossOrigin = 'anonymous'
  loader.register( ( parser ) => {
		return new VRMLoaderPlugin( parser, { autoUpdateHumanBones: true } );
	} );
  let currentMixer: any = undefined;
  let currentVRM: any = undefined;
  const clock = new Clock();

  function animate() {
    requestAnimationFrame( animate );
    const deltaTime = clock.getDelta();
    // if animation is loaded
    if ( currentMixer ) {
      // update the animation
      currentMixer.update( deltaTime );
    }
    if ( currentVRM ) {
      currentVRM.update( deltaTime );
    }
  }

  function initTalk(){
    // @ts-ignore
    if(!isOpen && locked.current != null && cameraControlsRef.current != null) {
      // @ts-ignore
      locked.current = true;
      // @ts-ignore
      cameraControlsRef.current?.saveState();

      // @ts-ignore
      if(cameraControlsRef != null) cameraControlsRef.current.fitToBox(mesh.current, true);
      setIsOpen(true);
    }
  }

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

  useEffect(() => {
    if(!vrm){
      loader.load(
        modelPath,
        // called when the resource is loaded
        ( gltf ) => {
          // calling these functions greatly improves the performance
          VRMUtils.removeUnnecessaryVertices( gltf.scene );
          VRMUtils.removeUnnecessaryJoints( gltf.scene );
  
          currentVRM = gltf.userData.vrm as VRM;
          setVrm(gltf.userData.vrm);
          
          currentMixer = new AnimationMixer(gltf.userData.vrm.scene);
          
          // Load animation
          loadMixamoAnimation( "/avatars/greet.fbx", currentVRM ).then( ( clip ) => {
            currentMixer.clipAction(clip).play();
            currentMixer.timeScale = 1.0;
          } );
          animate()
          
        },
  
        // called while loading is progressing
        ( progress ) => {},
  
        // called when loading has errors
        ( error ) => console.error( error )
      );
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
    {vrm ?
      <RigidBody
        type="fixed"
        colliders={false}
      >
        <BallCollider 
          position={[position[0], position[1]+0.5, position[2]]} args={[0.5]} 
          sensor
          onIntersectionEnter={() => initTalk()} /> {/* @ts-ignore */}
        <mesh scale={[1.2, 1.2, 1.2]} rotation={rotation} position={position} ref={mesh} castShadow>
          <primitive
            object={vrm.scene}
          />
        </mesh>
      </RigidBody>
      :
      <></>
    }
    </>
  )
}
