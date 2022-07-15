import { FC } from 'react'
import YoutubeModelProps from '@/types/interfaces/YoutubeModel'

const YoutubeModel: FC<YoutubeModelProps> = ({ onClick, gltf, position }) => (
  <mesh onClick={onClick}>
    <primitive
      object={gltf.scene}
      position={position}
      scale={[0.3, 0.3, 0.3]}
    />
  </mesh>
)

export default YoutubeModel