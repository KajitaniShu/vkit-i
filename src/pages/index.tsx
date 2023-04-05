import { NextPage } from 'next'
import { useState, useRef } from 'react'
import path from '@/configs/model.json'
import Scene from '@/containers/Scene'
import DrawCanvas from '@/containers/DrawCanvas'
import Player from '@/containers/Player'
import Signboards from '@/containers/Signboard'
import DigitalBillboard from '@/containers/DigitalBillboard'
import Head from '@/containers/Head'
import FooterButton from '@/containers/FooterButton'
import { Vector3 } from 'three'
import { CameraControls } from '@react-three/drei'
import { Mesh } from 'three'

const IndexPage: NextPage = () => {
  const btnInfo = useRef<any>({open: false, info: "none"}); 
  return (
    <>
      <Head />
      <DrawCanvas>
        <Scene
          modelPath={path.scene[0].model_path}
        />
        <Player
          btnInfo={btnInfo}
          modelPath={path.player.model_path}
        />
        <Signboards/>
      </DrawCanvas>
      <FooterButton btnInfo={btnInfo} />
    </>
  )
}

export default IndexPage