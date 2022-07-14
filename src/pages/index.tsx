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
      {path.posters.map((value, key) => {
        return (
          <Poster
            modelPath={value.model_path}
            position={new Vector3(value.position[0], value.position[1], value.position[2])}
            modal_header={value.modal_header}
            modal_image={value.modal_image}
            modal_message={value.modal_message}
            modal_url={value.modal_url}
          />
        );
      })}

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