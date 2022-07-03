import { ThreeEvent } from '@react-three/fiber'
import { GLTF } from 'three-stdlib'

type OnClickModelProps = {
  onClick: (e: ThreeEvent<MouseEvent>) => void
  gltf: GLTF
}

export default OnClickModelProps