import { FC } from 'react'
import { useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import SceneProps from '@/types/interfaces/Scene'
import SceneModel from '@/components/molecules/SceneModel'
import NoneShadowSceneModel from '@/components/molecules/NoneShadowSceneModel'
import { Vector3 } from 'three';

const Scene: FC<SceneProps> = ({ modelPath }) => {
  const scene_gltf = useGLTF(modelPath)

  return (
    <>
      <SceneModel // @ts-ignore
        gltf={scene_gltf} position={new Vector3(0.0, 0.0, 0.0)} scale={new Vector3(0.1, 0.1, 0.1)}
      />
    </>
  )
}

export default Scene