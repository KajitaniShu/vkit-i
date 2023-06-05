import React from 'react'
import { CuboidCollider } from "@react-three/rapier";


export function Floor() {
  return (
    <CuboidCollider position={[0, -2.5, 0]} args={[100, 1, 100]} />
  )
}
