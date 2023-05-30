import { FC } from 'react'
import SceneModelProps from '@/types/interfaces/SceneModel'
import { RigidBody } from "@react-three/rapier";

const SceneModel: FC<SceneModelProps> = ({ gltf, position, scale }) => (
  <group>
    <mesh castShadow>
      <primitive 
        object={gltf.scene.clone()}
        position={position}
        scale={scale}
      />
    </mesh>
  </group>
)

export default SceneModel