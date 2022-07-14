import { FC } from 'react'
import PosterModelProps from '@/types/interfaces/PosterModel'

const PosterModel: FC<PosterModelProps> = ({ onClick, gltf, position }) => (
  <mesh onClick={onClick}>
    <primitive
      object={gltf.scene}
      position={position}
      scale={[0.5, 0.5, 0.5]}
    />
  </mesh>
)

export default PosterModel