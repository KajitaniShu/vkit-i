import { NextPage } from 'next'
import path from '@/configs/model.json'
import Scene from '@/containers/Scene'
import DrawCanvas from '@/containers/DrawCanvas'
import Player from '@/containers/Player'
import Signboards from '@/containers/Signboard'
import Youtube from '@/containers/Youtube'

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

      <Youtube />
    </DrawCanvas>
  </>
)

export default IndexPage