import { ThreeEvent } from '@react-three/fiber'
import { Vector3 } from 'three'
import { GLTF } from 'three-stdlib'

type YoutubePosterModelProps = {
  onClick: (e: ThreeEvent<MouseEvent>) => void
  gltf: GLTF
  position: Vector3
}

export default YoutubePosterModelProps