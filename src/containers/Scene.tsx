import { FC } from 'react'
import { useGLTF } from '@react-three/drei'
import SceneProps from '@/types/interfaces/Scene'
import SceneModel from '@/components/molecules/SceneModel'
import NoneShadowSceneModel from '@/components/molecules/NoneShadowSceneModel'
import { Vector3 } from 'three';


const Scene: FC<SceneProps> = ({ modelPath }) => {
  const gltf = useGLTF(modelPath)
  const green_gltf = useGLTF("./kyutech_map_green.glb")

  return (
    <>
      <SceneModel 
        gltf={gltf} position={new Vector3(0.0, 0.0, 0.0)} scale={new Vector3(0.1, 0.1, 0.1)}
      />
      <NoneShadowSceneModel position={new Vector3(0.0, 0.0, 0.0)} scale={new Vector3(0.1, 0.1, 0.1)}
        gltf={green_gltf}
        />
    </>
  )
}

export default Scene