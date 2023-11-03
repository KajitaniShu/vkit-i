import React from 'react'
import { useGLTF, Shadow } from '@react-three/drei'

export default function StopCharacter({path, ...props}: any) {
  const model : any = useGLTF(path);

  return (
    <group {...props}>
        <mesh position={[0, 2.4, 0]}>
          <primitive object={model.nodes.head.clone()} />
        </mesh>
        <mesh>
          <primitive object={model.nodes.body.clone()} />
        </mesh>
      <Shadow opacity={2}  position={[0, 0, 0]}/>
    </group>
  )
}
