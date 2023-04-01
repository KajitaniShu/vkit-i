import { GLTF } from 'three-stdlib'
import { Vector3 } from 'three';

type SceneModelProps = {
  gltf: GLTF,
  position: Vector3,
  scale: Vector3,
}

export default SceneModelProps