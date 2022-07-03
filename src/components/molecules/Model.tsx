import { FC } from 'react'
import ModelProps from '@/types/interfaces/Model'
import { forwardRef } from '@chakra-ui/react'

const Model: FC<ModelProps> = forwardRef(({ gltf }, player) => (
  <mesh scale={[0.2, 0.2, 0.2]} ref={player} rotation={[0, Math.PI/2, 0]}>
    <primitive
      object={gltf.scene}
    />
  </mesh>
))

export default Model