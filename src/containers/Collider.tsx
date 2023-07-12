import React from 'react'
import { CuboidCollider } from "@react-three/rapier";
import path from '@/configs/model.json'


export function Collider() {
  return (
    <>
    {path.colliders.map((value, key) => {
      return (
        <CuboidCollider position={[value.position.x, value.position.y, value.position.z]} rotation={[value.rotate.x, value.rotate.y, value.rotate.z]} args={[value.scale.x/2, value.scale.y/2, value.scale.z/2]} />
      );
    })}
    </>
  )
}