import { FC } from 'react'
import NeighborModal from '@/types/interfaces/NeighborModal'

const PosterModel: FC<NeighborModal> = ({ ref, gltf, position }) => (
  <mesh>
    <primitive
      object={gltf.scene}
      position={position}
      scale={[0.3, 0.3, 0.3]}
    />
  </mesh>
)

export default PosterModel