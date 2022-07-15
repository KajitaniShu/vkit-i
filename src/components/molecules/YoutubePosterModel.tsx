import { FC } from 'react'
import YoutubePosterModelProps from '@/types/interfaces/YoutubePosterModel'

const YoutubePosterModel: FC<YoutubePosterModelProps> = ({ onClick, gltf, position }) => (
  <mesh onClick={onClick}>
    <primitive
      object={gltf.scene}
      position={position}
      scale={[0.5, 0.5, 0.5]}
    />
  </mesh>
)

export default YoutubePosterModel