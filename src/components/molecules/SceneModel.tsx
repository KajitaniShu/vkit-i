import { FC } from 'react'
import SceneModelProps from '@/types/interfaces/SceneModel'

const SceneModel: FC<SceneModelProps> = ({ gltf }) => (
  <group>
    <mesh>
      <primitive 
        object={gltf.scene}
        position={[0,0,0]}
        scale={[0.1,0.1,0.1]}
      />
    </mesh>
  </group>
)

export default SceneModel