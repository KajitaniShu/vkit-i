import { FC } from 'react'
import { forwardRef } from '@chakra-ui/react'
import PlayerModelProps from '@/types/interfaces/PlayerModel'


const PlayerModel: FC<PlayerModelProps> = forwardRef(({ gltf }, ref) => (
    
  <mesh scale={[0.3, 0.3, 0.3]} castShadow ref={ref} rotation={[0, Math.PI, 0]}>
    <primitive
      object={gltf.scene}
    />
  </mesh>
))

export default PlayerModel