import { FC } from 'react'
import PosterModelProps from '@/types/interfaces/PosterModel'

const PosterModel: FC<PosterModelProps> = ({ onClick, gltf }) => (
  <mesh onClick={onClick}>
    <primitive
      object={gltf.scene}
      position={[1, 0, 1]}
      scale={[1, 1, 1]}
    />
  </mesh>
)

export default PosterModel