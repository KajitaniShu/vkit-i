import { FC } from 'react'
import { forwardRef } from '@chakra-ui/react'
import ModelProps from '@/types/interfaces/Model'

const Model: FC<ModelProps> = forwardRef(({ gltf }, ref) => (
  <mesh scale={[0.3, 0.3, 0.3]} ref={ref} rotation={[0, Math.PI, 0]}>
    <primitive
      object={gltf.scene}
    />
  </mesh>
))

export default Model