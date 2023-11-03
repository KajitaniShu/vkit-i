import React, { useEffect, useRef } from 'react'
import { useGLTF, Shadow } from '@react-three/drei'
import { useSpring, animated, config } from '@react-spring/three'
import { Globals } from "@react-spring/shared";

export default function JumpCharacter({path, ...props}: any) {
  const model : any = useGLTF(path);
  const [spring, api] = useSpring(() => ({ 'position-y': 0, config: { friction: 50, mass: 10, tension: 4000 } }), [])

  Globals.assign({
    frameLoop: "demand",
  });

  useEffect(() => {
    let timer: any;
    let isJump: boolean = false;
    const nod = () => {
      api.start({ 'position-y': isJump ? 3 : 0 });
      if(isJump) setTimeout(nod, 10);
      else      timer = setTimeout(nod, (1 + Math.random() * 5) * 1000);
      isJump = !isJump;
    }
    nod();
    return () => clearTimeout(timer)
  }, [])


  return (
    <group {...props}>
      <animated.group {...spring} >
        <mesh position={[0, 2.4, 0]}>
          <primitive object={model.nodes.head.clone()} />
        </mesh>
        <mesh>
          <primitive object={model.nodes.body.clone()} />
        </mesh>
      </animated.group>
      <Shadow opacity={2}  position={[0, 0, 0]}/>
      
    </group>
  )
}
