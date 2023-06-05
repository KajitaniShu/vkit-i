import { CameraControls } from '@react-three/drei'
import { Mesh } from 'three'

type PosterProps = {
  modelPath: string
  cameraControlsRef: React.Ref<CameraControls>,
  locked: React.Ref<boolean>,
}

export default PosterProps