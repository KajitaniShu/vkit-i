// @ts-nocheck 

import { useRef, FC, useEffect } from 'react'
import { ThreeEvent, useFrame, useThree, Canvas} from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei'
import { Vector3, Plane, Mesh, Clock, AnimationMixer } from 'three';
import { useDrag } from "@use-gesture/react";
import PlayerModel from '@/components/molecules/PlayerModel';
import PlayerProps from '@/types/interfaces/Player'
import { Physics, RigidBody, CapsuleCollider, RapierRigidBody } from "@react-three/rapier";
import TargetMark from '@/components/molecules/TargetMark'
import { Block } from '@react-three/fiber/dist/declarations/src/core/utils';
import { loadMixamoAnimation } from '@/containers/loadMixamoAnimation'



const Player: FC<PlayerProps> = ({ model, animation_path, cameraControlsRef, locked }) => {
  // キャラクターアニメーション
  let timer = 0.0;
  const clock = new Clock();
  let mixer: any;
  let frame = 0;
  let tmpDelta = 0.0;
  let skipFrame = 1;
  const animations: any = {};

  // キャラクター移動
  const rb = useRef<RapierRigidBody>(null);
  const player = useRef<Mesh>();
  const box = useRef({position: new Vector3(0.0, 0.0, 0.0)});
  const plane = new Plane(new Vector3(0, 1, 0), 0);  
  let _pos = new Vector3();
  let speed: number = 0.0;
  let theta: number = 0.0;

  // 2本指で操作した場合の処理
  const twoFing = useRef(false);
  

  // 2本指で操作した場合の処理
  window.addEventListener('touchstart', function(e) {
    if (e.targetTouches.length > 1) twoFing.current = true;
  }, false);
  
  window.addEventListener('touchend', function(e) {
    twoFing.current = false;
  }, false);
  
  const bind = useDrag<ThreeEvent<MouseEvent>>(
    ({event}) => {
      
      // 二本指になったら目的地をリセットし，立ち止まる
      if(twoFing.current){  
        box.current.position.x = player.current.position.x;
        box.current.position.z = player.current.position.z;
      }

      if(!twoFing.current) event.ray.intersectPlane(plane, _pos);

      if(box.current!= null && !twoFing.current) {
        box.current.position.x = _pos.x;
        box.current.position.y = -0.1;
        box.current.position.z = _pos.z;
      }
    }
  );


  // CameraControlsの設定 
  if(cameraControlsRef?.current != null) {  
    cameraControlsRef.current.mouseButtons.left = 0;  
    cameraControlsRef.current.touches.one = 0;
  }
  cameraControlsRef.current?.setPosition(1, 6, 6);



  // キャラクター移動
  const move = (speed: number, theta: number) => {
    if(twoFing.current) return; 
    if(locked.current) return;
    if(player.current.position.x + speed * Math.cos(theta) < 25.0 && player.current.position.x + speed * Math.cos(theta) > -18.0){
      rb.current?.setTranslation(new Vector3(rb.current?.translation().x + speed * Math.cos(theta), rb.current?.translation().y, rb.current?.translation().z) , true);
      const previous = new Vector3();

      // カメラ移動
      cameraControlsRef.current?.getPosition(previous);
      cameraControlsRef.current?.setPosition(previous.x + speed * Math.cos(theta), previous.y, previous.z, true);
    }

    if(player.current.position.z + speed * Math.sin(theta) < 15.0 && player.current.position.z + speed * Math.sin(theta) > -26.0){
      rb.current?.setTranslation(new Vector3(rb.current?.translation().x, rb.current?.translation().y, rb.current?.translation().z +  speed * Math.sin(theta)) , true);
      const previous = new Vector3();
      
      cameraControlsRef.current?.getPosition(previous);
      cameraControlsRef.current?.setPosition(previous.x, previous.y, previous.z + speed * Math.sin(theta), true);
    }
    player.current.rotation.y = -theta-Math.PI/2;
  }

  const calcDirection = (): [number, number]  => {
    const _box = new Vector3(box.current.position.x, box.current.position.y, box.current.position.z);
    const _player = rb.current?.translation();
    speed =  Math.sqrt(Math.pow(_box.z - _player.z, 2) + Math.pow(_box.x - _player.x, 2));
    theta = Math.atan2(_box.z - _player.z, _box.x - _player.x);
    return [theta, speed*2];
  }


  // キャラクターアニメーション
  const loadAnimation = async () => {
    mixer = new AnimationMixer(model.scene);
    mixer.timeScale = 0.8;
    await animation_path.map((value: any, key: any) => {
      loadMixamoAnimation( value.path, model).then( ( clip ) => {
        animations[value.name] = {
          clip: mixer.clipAction(clip)
        };
      } );
    });
  }
  
  function animate(delta: number) {
    // skipFrame回に一回だけアニメーションを更新
    frame++;
    tmpDelta += delta;
    if(frame < skipFrame) return;

    // スピードが0より大きい -> 走る， スピードが0 -> アイドル状態
    if(!animations["run"] || !animations["idle"]) return;
    if(!locked.current && speed > 0.25 && !animations["run"].clip.isRunning())   {animations["idle"].clip.fadeOut(0.2);   animations["run"].clip.reset().play();}
    if(speed <= 0.25 && !animations["idle"].clip.isRunning()) {animations["run"].clip.fadeOut(0.4); animations["idle"].clip.reset().play()}
    if(locked.current && !animations["idle"].clip.isRunning()) {animations["run"].clip.fadeOut(0.4); animations["idle"].clip.reset().play()}

    // アニメーションを更新
    if ( mixer ) mixer.update(tmpDelta * 1.5);
    if ( model ) model.update(tmpDelta * 1.5);
    
    // デルタタイムとframeを初期化
    tmpDelta = 0.0;
    frame = 0;
  }


  useEffect(() => {
    loadAnimation();
  }, []);
  
  
  useFrame((_, delta) => {
    // カメラの向きが変わってしまうことを防ぐ
    if(cameraControlsRef.current.mouseButtons.left !== 0) cameraControlsRef.current.mouseButtons.left = 0;
    if(cameraControlsRef.current.touches.one !== 0) cameraControlsRef.current.touches.one = 0;
    
    if(!twoFing.current && Math.abs(box.current.position.x - rb.current?.translation().x) + Math.abs(box.current.position.z - rb.current?.translation().z) > 0.2){
      let theta : number, speed: number;
      [theta, speed] = calcDirection();
      if(speed > 3.0) speed = 3.0;
      if(theta != undefined) move(delta*speed, theta);
    }
    if(!locked.current) cameraControlsRef.current?.setTarget(rb.current?.translation().x, rb.current?.translation().y+1, rb.current?.translation().z, true);
    animate(delta);
  });


  return (
    <>
    <RigidBody ref={rb} lockRotations={true} enabledTranslations={[true, false, true]}>
      <PlayerModel 
        model={model}
        ref={player}
      />
      <CapsuleCollider position={[0, 0.28, 0]} args={[0.14, 0.2]} />
    </RigidBody>

    <mesh castShadow rotation={[-Math.PI/2, 0, 0]} position-y={-1} {...bind() as any}>
      <planeBufferGeometry attach="geometry" args={[1000, 1000]}/>
      <meshStandardMaterial attach="material" transparent opacity={0} />
    </mesh>
    </>
  )
}

export default Player