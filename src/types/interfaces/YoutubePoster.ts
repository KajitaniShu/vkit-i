import { Vector3 } from "three"

type YoutubePosterProps = {
  playerRef: React.Ref<any>
  modelPath: string
  position: Vector3
  modal_header: string
  modal_message: string
  modal_url: string
  ids: string[]
}

export default YoutubePosterProps