import { FC } from 'react'
import SceneModelProps from '@/types/interfaces/SceneModel'

const NoneShadowSceneModel: FC<SceneModelProps> = ({ gltf, position, scale }) => (
  <group>
    <mesh castShadow>
      <primitive 
        object={gltf.scene}
        position={position}
        scale={scale}
      />
    </mesh>
  </group>
)

export default NoneShadowSceneModel