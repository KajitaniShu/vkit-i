import { FC } from 'react'
import YoutubePosterModelProps from '@/types/interfaces/YoutubePosterModel'
import { Circle, Html, Image } from '@react-three/drei'
import { MeshBasicMaterial, Vector3 } from 'three'

const YoutubePosterModel: FC<YoutubePosterModelProps> = ({ onClick, gltf, position }) => (
  <>
    <mesh onClick={onClick}>
      <primitive
        object={gltf.scene.clone()}
        position={position}
        scale={[0.3, 0.3, 0.3]}
      />
    </mesh>
    {/* @ts-ignore */}
    <Circle args={[1, 16]} rotation={[-Math.PI/2, 0, 0]}  position={[position.x, position.y-0.02, position.z]}>
      <meshStandardMaterial color="orange" />
    </Circle>
  </>
)

export default YoutubePosterModel