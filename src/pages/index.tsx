import { NextPage } from 'next'
import path from '@/configs/model.json'
import Scene from '@/containers/Scene'
import DrawCanvas from '@/containers/DrawCanvas'
import Player from '@/containers/Player'
import Signboards from '@/containers/Signboard'
import DigitalBillboard from '@/containers/DigitalBillboard'

const IndexPage: NextPage = () => (
  <>
    <DrawCanvas>
      <Scene
        modelPath={path.scene[0].model_path}
      />
      <Player
        modelPath={path.player.model_path}
      />
      <Signboards/>
    </DrawCanvas>
  </>
)

export default IndexPage