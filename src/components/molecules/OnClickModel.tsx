import { FC } from 'react'
import OnClickModelProps from '@/types/interfaces/OnClickModel'

const OnClickModel: FC<OnClickModelProps> = ({ onClick, gltf }) => (
  <mesh /*onClick={onClick}*/>
    <primitive
      object={gltf.scene}
      position={[0, 0, 0]}
      scale={[0.1, 0.1, 0.1]}
    />
  </mesh>
)

export default OnClickModel