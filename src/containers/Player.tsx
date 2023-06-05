import { useRef, FC } from 'react'
import { ThreeEvent, useFrame, useThree, Canvas} from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations, CameraControls } from '@react-three/drei'
import { Vector3, Plane, Mesh } from 'three';
import { useDrag } from "@use-gesture/react";
import PlayerModel from '@/components/molecules/PlayerModel';
import PlayerProps from '@/types/interfaces/Player'
import Poster from '@/containers/Poster'
import path from '@/configs/model.json'
import { Physics, RigidBody, CapsuleCollider, RapierRigidBody } from "@react-three/rapier";
import { IconCloudPause } from '@tabler/icons-react';


const Player: FC<PlayerProps> = ({ modelPath, cameraControlsRef, locked }) => {
  const twoFing = useRef(false);
  const rb = useRef<RapierRigidBody>(null);

  window.addEventListener('touchstart', function(e) {
    if (e.targetTouches.length > 1) twoFing.current = true;
  }, false);

  window.addEventListener('touchend', function(e) {
    twoFing.current = false;
  }, false);

  const gltf = useGLTF(modelPath);
  const scene = gltf.scene;
  const animations = gltf.animations;
  const { actions } = useAnimations(animations, scene);
  
  const player = useRef<Mesh>();
  const collider = useRef({position: new Vector3(0.0, 0.0, 0.0), rotation: new Vector3(0.0, 0.0, 0.0)});
  const box = useRef({position: new Vector3(0.0, 0.0, 0.0)});
  const { camera, gl } = useThree();

  // CameraControlsの設定 
  // @ts-ignore
  if(cameraControlsRef?.current != null) {  // @ts-ignore
    cameraControlsRef.current.mouseButtons.left = 0;  // @ts-ignore
    cameraControlsRef.current.touches.one = 0;
  }
  
  cameraControlsRef.current?.setPosition(1, 3, 4);
  const plane = new Plane(new Vector3(0, 1, 0), 0);  
  var _pos = new Vector3();
  const bind = useDrag<ThreeEvent<MouseEvent>>(
    ({event}) => {

      // 二本指になったら目的地をリセットし，立ち止まる
      if(twoFing.current){  
        box.current.position.x = player.current.position.x;
        box.current.position.z = player.current.position.z;
      }

      // @ts-ignore
      if(!twoFing.current) event.ray.intersectPlane(plane, _pos);
      if(box.current!= null && !twoFing.current) {
        box.current.position.x = _pos.x;
        box.current.position.y = 0.1;
        box.current.position.z = _pos.z;
      }
    }
  );

  const move = (speed: number, theta: number) => {
    if(twoFing.current) return; // @ts-ignore
    if(locked.current) return;
    
    if(player.current.position.x + speed * Math.cos(theta) < 25.0 && player.current.position.x + speed * Math.cos(theta) > -18.0){
      // キャラクター移動
      rb.current?.setTranslation(new Vector3(rb.current?.translation().x + speed * Math.cos(theta), rb.current?.translation().y, rb.current?.translation().z) , true);
      const previous = new Vector3();

      // カメラ移動
      // @ts-ignore
      cameraControlsRef.current?.getPosition(previous);
      // @ts-ignore
      cameraControlsRef.current?.setPosition(previous.x + speed * Math.cos(theta), previous.y, previous.z, true);
    }

    if(player.current.position.z + speed * Math.sin(theta) < 15.0 && player.current.position.z + speed * Math.sin(theta) > -26.0){
      rb.current?.setTranslation(new Vector3(rb.current?.translation().x, rb.current?.translation().y, rb.current?.translation().z +  speed * Math.sin(theta)) , true);
      const previous = new Vector3();
      // @ts-ignore
      cameraControlsRef.current?.getPosition(previous);
      // @ts-ignore
      cameraControlsRef.current?.setPosition(previous.x, previous.y, previous.z + speed * Math.sin(theta), true);
    }
    player.current.rotation.y = -theta+Math.PI/2;
  }

  const calcDirection = (): [number, number]  => {
    const _box = new Vector3(box.current.position.x, box.current.position.y, box.current.position.z);
    const _player = rb.current?.translation();
    var speed: number = 0.0;
    var theta: number = 0.0;
    // @ts-ignore
    speed =  Math.sqrt(Math.pow(_box.z - _player.z, 2) + Math.pow(_box.x - _player.x, 2));
    // @ts-ignore
    theta = Math.atan2(_box.z - _player.z, _box.x - _player.x);
    return [theta, speed*2];
  }
  

  
  useFrame((_, delta) => {
    // @ts-ignore
    if(!twoFing.current && Math.abs(box.current.position.x - rb.current?.translation().x) + Math.abs(box.current.position.z - rb.current?.translation().z) > 0.2){
      var theta : number, speed: number;
      [theta, speed] = calcDirection();
      if(speed > 3.0) speed = 3.0;
      if(theta != undefined) move(delta*speed, theta);
      if(actions.Idle?.isRunning) {actions.Idle?.fadeOut; actions.Idle?.reset();}
      actions.Run?.play();
    }else{
      if(actions.Run?.isRunning)  {actions.Run?.fadeOut; actions.Run?.reset();}
      actions.Idle?.play();
    }
    // @ts-ignore
    if(rb.current.isSleeping() && actions.Run?.isRunning) {actions.Run?.fadeOut; actions.Run?.reset();}
    // @ts-ignore
    cameraControlsRef.current?.setTarget(rb.current?.translation().x, rb.current?.translation().y+1, rb.current?.translation().z, true);
  });


  
  return (
    <>
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
    <RigidBody ref={rb} lockRotations={true} enabledTranslations={[true, false, true]}>
      <PlayerModel // @ts-ignore
        gltf={gltf}
        ref={player}
      />
      <CapsuleCollider position={[0, 0.28, 0]} args={[0.14, 0.2]} />
    </RigidBody>

    <mesh castShadow rotation={[-Math.PI/2, 0, 0]} {...bind() as any}>
      <planeBufferGeometry attach="geometry" args={[1000, 1000]}/>
      <meshStandardMaterial attach="material" transparent opacity={0} />
    </mesh>
    </>
  )
}

export default Player