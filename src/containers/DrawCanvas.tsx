import { FC, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sky, Stage, Preload, useProgress, ContactShadows } from '@react-three/drei'
import Loader from '@/components/atoms/Loader'

const DrawCanvas: FC = ({ children }) => {
  const { progress } = useProgress()

  return (
    <>
      <Canvas
        style={{
          position: 'absolute',
          top: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor:'#B2C8DF'
        }}
        camera={{ 
          position: [0, 20,0],
          fov: 45,
        }}
      >
        <ambientLight intensity={0.5}/>
        <directionalLight
          position={[10,20,0]}
          intensity={1.2}
          castShadow
        />
        <Suspense fallback={<Loader progress={progress}/>}>
          {children}
        </Suspense>
        <Preload all />
        {/* @ts-ignore */}
        <ContactShadows frames={1} opacity={3} scale={10} blur={0.2} far={10}  width={5} height={5} color="#000000" />
      </Canvas> 
    </>
  )
}

export default DrawCanvas