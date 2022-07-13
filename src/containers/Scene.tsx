import { FC } from 'react'
import { useGLTF } from '@react-three/drei'
import SceneProps from '@/types/interfaces/Scene'
import SceneModel from '@/components/molecules/SceneModel'

const Scene: FC<SceneProps> = ({ modelPath }) => {
  const gltf = useGLTF(modelPath)

  return (
    <>
      <SceneModel 
        gltf={gltf}
      />
    </>
  )
}

export default Scene