import { FC } from 'react'
import PosterModelProps from '@/types/interfaces/PosterModel'

const PosterModel: FC<PosterModelProps> = ({ onClick, gltf, position }) => (
  <mesh onClick={onClick}>
    <primitive
      object={gltf.scene}
      position={position}
      scale={[1, 1, 1]}
    />
  </mesh>
)

export default PosterModel