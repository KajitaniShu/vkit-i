import { FC } from 'react'
import { forwardRef } from '@chakra-ui/react'
import { Torus } from '@react-three/drei'

export default function TargetMark({...props}) {
  return (
    <>
      <Torus args={[0.05, 0.02, 2, 20]}>
        <meshStandardMaterial color="#FFA41B" {...props}/>
      </Torus>
    </>
  )
}
