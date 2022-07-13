import { NextPage } from 'next'
import path from '@/configs/model.json'
import Poster from '@/containers/Poster'
import Scene from '@/containers/Scene'
import DrawCanvas from '@/containers/DrawCanvas'
import Player from '@/containers/Player'
import Signboards from '@/containers/Signboard'
import Youtube from '@/containers/Youtube'
import { Vector3 } from 'three'

const IndexPage: NextPage = () => (
  <>
    <DrawCanvas>
      <Poster
        modelPath={path.posters[0].model_path}
        position={new Vector3(path.posters[0].position[0], path.posters[0].position[1], path.posters[0].position[2])}
        modal_header={path.posters[0].modal_header}
        modal_image={path.posters[0].modal_image}
        modal_message={path.posters[0].modal_message}
        modal_url={path.posters[0].modal_url}
      />
      <Poster
        modelPath={path.posters[1].model_path}
        position={new Vector3(path.posters[1].position[0], path.posters[1].position[1], path.posters[1].position[2])}
        modal_header={path.posters[0].modal_header}
        modal_image={path.posters[0].modal_image}
        modal_message={path.posters[0].modal_message}
        modal_url={path.posters[0].modal_url}
      />
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