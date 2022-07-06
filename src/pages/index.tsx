import { NextPage } from 'next'
import path from '@/configs/model.json'
import Poster from '@/containers/Poster'
import Header from '@/containers/Header'
import DrawCanvas from '@/containers/DrawCanvas'
import Player from '@/containers/Player'
import Signboards from '@/containers/Signboard'
import Youtube from '@/containers/Youtube'

const IndexPage: NextPage = () => (
  <>
    <DrawCanvas>
      <Poster
        modelPath={path.posters[0].model_path}
      />
      <Player
        modelPath={path.player.model_path}
      />
      <Signboards/>

      <Youtube
        modelPath={path.board.model_path}
      />
    </DrawCanvas>
  </>
)

export default IndexPage