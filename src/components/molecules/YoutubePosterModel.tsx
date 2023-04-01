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
        scale={[0.5, 0.5, 0.5]}
      />
    </mesh>
    {/* @ts-ignore */}
    <Circle args={[1, 16]} rotation={[-Math.PI/2, 0, 0]}  position={[position.x, position.y-0.02, position.z]}>
      <meshStandardMaterial color="orange" />
    </Circle>
    {/* @ts-ignore */}
    <Image url="./sample.png" position={[position.x-0.6, position.y+0.8, position.z]} scale={[1, 0.5, 1]}/>
  </>
)

export default YoutubePosterModel