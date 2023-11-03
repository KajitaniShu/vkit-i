import React, { useMemo } from 'react'
import THREE from 'three'
import { Float } from '@react-three/drei'



export default function RandomBox() {

  let colors = ["#C3ACD0", "#FFCD4B", "#EF9595"];

  function randomInteger(min, max) : any {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function Box({ count }) {
    const Boxes = useMemo(() => {
      return Array.from({ length: count }, () => {
        const pos = new THREE.Vector3(randomInteger(-100, 100), randomInteger(-100, 100), randomInteger(-100, 100));
        return (
          <Float
            speed={1} // Animation speed, defaults to 1
            rotationIntensity={1} // XYZ rotation intensity, defaults to 1
            floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
            floatingRange={[1, 10]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
          >
            <mesh>
              <boxBufferGeometry args={[0.2, 0.2, 0.2]}/>
              <meshStandardMaterial color="#C3ACD0"/>
            </mesh>
          </Float>
        )
      })
    }, [])
  }


  return (
    <Box count={16} />
  )
}
