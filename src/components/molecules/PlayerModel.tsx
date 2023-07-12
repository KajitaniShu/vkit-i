import { FC } from 'react'
import { forwardRef } from '@chakra-ui/react'
import PlayerModelProps from '@/types/interfaces/PlayerModel'
import { Shadow } from '@react-three/drei'


const PlayerModel: FC<PlayerModelProps> = forwardRef(({ model }, ref) => (
    
  <mesh scale={[1.16, 1.16, 1.16]} ref={ref} rotation={[0, 0, 0]}>
    <primitive
      object={model.scene}
    />
    <Shadow position={[0, 0, 0]} scale={[0.3, 0.3, 0.3]}/>
  </mesh>
))

export default PlayerModel