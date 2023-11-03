import React, { useEffect, useRef } from 'react'
import { useGLTF, Shadow } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'
import { Globals } from "@react-spring/shared";

Globals.assign({
  frameLoop: "always",
});

export default function MoveCharacter({path, ...props}: any) {
  const model : any = useGLTF(path);
  const [spring, api] = useSpring(() => ({ 'position-x': 0, config: { friction: 600, mass: 1, tension: 5000 } }), [])
  
  useEffect(() => {
    let timer: any;
    let isMove: boolean = false;
    const move = () => {
      api.start({ 'position-x': isMove ? 5 : 0 });
      isMove = !isMove;
      timer = setTimeout(move, (1 + Math.random() * 6) * 1000);
    }
    move();
    return () => clearTimeout(timer)
  }, [])


  return (
    <group {...props}>
      <animated.group {...spring} >
        <mesh position={[0, 2.4, 0]} receiveShadow={false} castShadow={false}>
          <primitive object={model.nodes.head.clone()} />
        </mesh>
        <mesh receiveShadow={false} castShadow={false}>
        <primitive object={model.nodes.body.clone()} />
        </mesh>
        <Shadow opacity={1.5} scale={[1.7, 1.7, 1.7]} position={[0, -1.5, 0]}/>
      </animated.group>
    </group>
  )
}
