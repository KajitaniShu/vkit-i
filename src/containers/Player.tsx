import { useRef, FC } from 'react'
import { ThreeEvent, useFrame, useThree, Canvas} from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei'
import { Vector3, Plane} from 'three';
import { useDrag } from "@use-gesture/react";
import PlayerModel from '@/components/molecules/PlayerModel';
import PlayerProps from '@/types/interfaces/Player'
import { OrbitControls as OrbitControlsImpl } from "three-stdlib"; 
import Poster from '@/containers/Poster'
import YoutubePoster from '@/containers/YoutubePoster'
import path from '@/configs/model.json'

const Player: FC<PlayerProps> = ({ modelPath }) => {
  const twoFing = useRef(false);


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
  
  
  const player = useRef({position: new Vector3(0.0, 0.0, 0.0), rotation: new Vector3(0.0, 0.0, 0.0)});
  player.current.position.set(0, 0, 14);
  player.current.rotation.set(0, Math.PI, 0);
  const box = useRef({position: new Vector3(0.0, 0.0, 0.0)});
  box.current.position.set(player.current.position.x, player.current.position.y, player.current.position.z);
  const { camera, gl } = useThree();
  const orbitControls = useRef<OrbitControlsImpl>(null!);

  camera.position.set(2, 10, 20); 
  // @ts-ignore
  camera.aspect = document.body.clientWidth / document.body.clientHeight;
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
    if(twoFing.current) return;
    if(player.current.position.x + speed * Math.cos(theta) < 25.0 && player.current.position.x + speed * Math.cos(theta) > -18.0){
      player.current.position.x += speed * Math.cos(theta);
      orbitControls.current.object.position.x += speed * Math.cos(theta);
    }

    if(player.current.position.z + speed * Math.sin(theta) < 15.0 && player.current.position.z + speed * Math.sin(theta) > -26.0){
      player.current.position.z += speed * Math.sin(theta);
      orbitControls.current.object.position.z += speed * Math.sin(theta);
    }
    player.current.rotation.y = -theta+Math.PI/2;
  }

  const calcDirection = (): [number, number]  => {
    const _box = new Vector3(box.current.position.x, box.current.position.y, box.current.position.z);
    const _player = new Vector3(player.current.position.x, player.current.position.y, player.current.position.z);
    var speed: number = 0.0;
    var theta: number = 0.0;
    speed =  Math.sqrt(Math.pow(_box.z - _player.z, 2) + Math.pow(_box.x - _player.x, 2));
    theta = Math.atan2(_box.z - _player.z, _box.x - _player.x);
    return [theta, speed*2];
  }

  
  useFrame((_, delta) => {
    if(!twoFing.current && Math.abs(box.current.position.x - player.current.position.x) + Math.abs(box.current.position.z - player.current.position.z) > 0.2){
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
    orbitControls.current.target = new Vector3(player.current.position.x, player.current.position.y+1, player.current.position.z);
    //orbitControls.current.setAzimuthalAngle( player.current.rotation.y+Math.PI );
    orbitControls.current.setPolarAngle(1);
  });


  
  return (
    <>
    <OrbitControls
      ref={orbitControls}
      enableRotate={false}
      enablePan={false}
      dampingFactor={0.008}
      minDistance={4}
      maxDistance={18}
      rotateSpeed={0.4}
    />
      <PlayerModel 
        gltf={gltf}
        ref={player}
      />

      <mesh castShadow rotation={[-Math.PI/2, 0, 0]} {...bind() as any}>
            <planeBufferGeometry attach="geometry" args={[1000, 1000]}/>
            <meshStandardMaterial attach="material" transparent opacity={0.8} />
      </mesh>

      {path.posters.map((value, key) => {
        return (
          <Poster
            playerRef={player}
            modelPath={value.model_path}
            position={new Vector3(value.position[0], value.position[1], value.position[2])}
            modal_header={value.modal_header}
            modal_image={value.modal_image}
            modal_message={value.modal_message}
            modal_url={value.modal_url}
          />
        );
      })}

      {path.youtube_posters.map((value, key) => {
        return (
          <YoutubePoster
            playerRef={player}
            modelPath={value.model_path}
            position={new Vector3(value.position[0], value.position[1], value.position[2])}
            modal_header={value.modal_header}
            modal_message={value.modal_message}
            modal_url={value.modal_url}
            ids={value.ids}
          />
        );
      })}
    </>
  )
}

export default Player