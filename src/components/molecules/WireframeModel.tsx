import { FC } from 'react'
import SceneModelProps from '@/types/interfaces/SceneModel'
import {Wireframe} from "@react-three/drei";

const WireFrameModel: FC<SceneModelProps> = ({ gltf }) => (
  <group>
    <Wireframe 
      geometry={gltf.scene}
    />
  </group>
)

export default WireFrameModel