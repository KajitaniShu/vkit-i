import { CameraControls } from "@react-three/drei"
import { Vector3 } from "three"

type YoutubePosterProps = {
  playerRef: React.Ref<any>
  cameraControlsRef: React.Ref<any>
  locked: React.Ref<boolean>
  modelPath: string
  messages: any
  position: Vector3
  modal_header: string
  modal_message: string
  modal_url: string
  btnInfo: any
  ids: string[]
}

export default YoutubePosterProps