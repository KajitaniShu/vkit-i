import { Vector3 } from "three"

type PosterProps = {
  playerRef: React.Ref<any>
  modelPath: string
  position: Vector3
  modal_header: string
  modal_image: string
  modal_message: string
  modal_url: string
}

export default PosterProps