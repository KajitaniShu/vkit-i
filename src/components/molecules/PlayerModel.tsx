import { FC } from 'react'
import { forwardRef } from '@chakra-ui/react'
import PlayerModelProps from '@/types/interfaces/PlayerModel'
import { Shadow } from '@react-three/drei'


const PlayerModel: FC<PlayerModelProps> = forwardRef(({ gltf }, ref) => (
    
  <mesh scale={[0.3, 0.3, 0.3]} ref={ref} rotation={[0, Math.PI, 0]}>
    <primitive
      object={gltf.scene}
    />
    <Shadow position={[0, 0, 0]} scale={[1.6, 1.6, 1.6]}/>
  </mesh>
))

export default PlayerModel