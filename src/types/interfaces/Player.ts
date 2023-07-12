import { CameraControls } from '@react-three/drei'
import { Mesh } from 'three'

type PosterProps = {
  model: any,
  animation_path: any,
  cameraControlsRef: React.Ref<CameraControls>,
  locked: React.Ref<boolean>,
}

export default PosterProps