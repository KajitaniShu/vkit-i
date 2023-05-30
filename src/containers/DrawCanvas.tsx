import { FC, Suspense, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Grid, Sky, Stage, Preload, useProgress, ContactShadows, Environment, SoftShadows, TorusKnot } from '@react-three/drei'
import Loader from '@/components/atoms/Loader'
import { Spinner, ChakraProvider } from '@chakra-ui/react'
import { Physics, } from "@react-three/rapier";


const DrawCanvas: FC = ({ children }) => {
  const { progress } = useProgress();
  return (
      <Canvas
        style={{
          position: 'absolute',
          top: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor:'white'
        }}
        camera={{ 
          position: [0, 20,0],
          fov: 45,
        }}
      >
        <ambientLight intensity={0.8}/>
        <directionalLight
          position={[10,20,0]}
          intensity={0.6}
          castShadow
        />
        <Suspense fallback={<Loader progress={progress}/>}>
          <Physics debug>
            {children}
          </Physics>
        </Suspense>
        <SoftShadows />
        <Preload all />
        {/* @ts-ignore */}
        <Grid cellColor="#ddd" cellThickness={0.7} sectionThickness={0.7} sectionColor="#fff" followCamera={true} fadeDistance={25} fadeStrength={1} position={[0, -0.02, 0]} args={[500, 500]} />
        {/* @ts-ignore */}
        <ContactShadows  opacity={0.6} scale={10} blur={0.2} far={10}  width={6} height={6} color="#000000" />
        <Environment preset="city" />
      </Canvas> 
  )
}

export default DrawCanvas