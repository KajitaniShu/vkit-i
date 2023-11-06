import { FC, Suspense, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Grid, Sky, Stage, Preload, useProgress, ContactShadows, Environment, SoftShadows, TorusKnot } from '@react-three/drei'
import { Physics, } from "@react-three/rapier";


const DrawCanvas: FC = ({ children }) => {
  const { progress } = useProgress();
  return (
    
    <Canvas
        flat
        shadows="soft"
        style={{
          position: 'absolute',
          top: 0,
          width: '100vw',
          height: '100vh',
        }}
        camera={{ 
          position: [2, 10, 18],
          fov: 30,
        }}
      >
        <ambientLight intensity={0.8}/>
        <directionalLight
          position={[4,25,0]}
          intensity={0.05}
          castShadow
        />
          <Physics gravity={[0,0,0]} 
          interpolate={false} 
          colliders={false}>
            {children}
          </Physics>
        
        <Preload all />
        
        <color attach="background" args={['#ECEEF1']} />
        <Grid cellColor="#ddd" cellThickness={0.7} sectionThickness={0.7} sectionColor="#fff"  fadeStrength={1} position={[0, -0.04, 0]} args={[500, 500]} />
        <SoftShadows />
        <ContactShadows frames={2} opacity={0.9} scale={10} blur={0.1} far={4} width={5} height={5} color="#192655"/>
        <Environment preset="city" />
      </Canvas> 
  )
}

export default DrawCanvas