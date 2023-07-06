import { FC, Suspense, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Grid, Sky, Stage, Preload, useProgress, ContactShadows, Environment, SoftShadows, TorusKnot } from '@react-three/drei'
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
          position: [1, 3, 4],
          fov: 45,
        }}
      >
        <ambientLight intensity={1.3}/>
        <directionalLight
          position={[10,20,0]}
          intensity={0.6}
          castShadow
        />
          <Physics gravity={[0,0,0]} 
          interpolate={false} 
          colliders={false}>
            {children}
          </Physics>
        
        <SoftShadows />
        <Preload all />
        {/* @ts-ignore */}
        <Grid cellColor="#ddd" cellThickness={0.7} sectionThickness={0.7} sectionColor="#fff" followCamera={true} fadeDistance={25} fadeStrength={1} position={[0, -0.02, 0]} args={[500, 500]} />
        {/* @ts-ignore */}
        <ContactShadows frames={1} opacity={0.6} scale={10} blur={0.2} far={10} width={5} height={5} color="#000000"/>
        <Environment preset="city" />
      </Canvas> 
  )
}

export default DrawCanvas