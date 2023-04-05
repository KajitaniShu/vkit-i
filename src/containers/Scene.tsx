import { FC } from 'react'
import { useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import SceneProps from '@/types/interfaces/Scene'
import SceneModel from '@/components/molecules/SceneModel'
import NoneShadowSceneModel from '@/components/molecules/NoneShadowSceneModel'
import { Vector3 } from 'three';


const Scene: FC<SceneProps> = ({ modelPath }) => {
  const gltf = useGLTF(modelPath)
  const green_gltf = useGLTF("./kyutech_map_green.glb")
  const { camera, gl } = useThree();
  
  // @ts-ignore
  camera.aspect = document.body.clientWidth / document.body.clientHeight;

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