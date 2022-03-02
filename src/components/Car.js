import React, {useRef, useMemo, useEffect} from 'react'
import { BufferGeometry, CatmullRomCurve3, LineBasicMaterial, LineLoop, Vector3 } from 'three'
import { FontLoader, TextGeometry } from 'three-stdlib'
import * as Drei from "@react-three/drei";
import { useFrame, useLoader } from '@react-three/fiber'

import { Flow } from 'three/examples/jsm/modifiers/CurveModifier.js'
import * as THREE from 'three'

export const Car = () => {
    const posIdx = useRef(0);
    const group  = useRef();

    const geometry = new THREE.BoxBufferGeometry(4, 4, 10);
    const material = new THREE.MeshStandardMaterial({color: "#674598"})
    const cube = new THREE.Mesh(geometry, material);

    function randomFloatInRange(min, max) {
        return Math.random() * (max - min + 1) + min;
      }

    const spline = useMemo(() => {
        const randomPoints = [
            new Vector3(-80, 2, 130),
            new Vector3(  0, 2, 130),
            new Vector3(  40, 2, 130),
            new Vector3(  80, 2, 130),
            new Vector3( 120, 2, 130),
            new Vector3( 145, 2, 120),
            new Vector3( 150, 2, 100),
            new Vector3( 150, 2,  50),
            new Vector3( 150, 2,   0),
            new Vector3( 150, 2,  -50),
            new Vector3( 150, 2, -110),
            new Vector3( 150, 2, -160),
            new Vector3( 150, 2, -200),
            new Vector3( 145, 2, -215),
            new Vector3( 110, 2, -220),
            new Vector3(  80, 2, -215),
            new Vector3(  22, 2, -170),
            new Vector3( -30, 2, -120),
            new Vector3( -50, 2, -100),
            new Vector3( -90, 2,  -30),
            new Vector3( -115, 2,  40),
            new Vector3(-115, 2,  90),
            new Vector3( -95, 2,  125),
        ]
        
    
        const curve = new CatmullRomCurve3(randomPoints);
        curve.curveType = "centripetal";
        curve.closed = true;
        
        return curve;
      }, []);

    const tubeGeom = new THREE.TubeBufferGeometry(spline, 250, 0.02, 10, true);
    const SPEED = 4000;

    useFrame(() => {
        posIdx.current++;
        if (posIdx.current > SPEED) posIdx.current = 0;
        const pos = spline.getPoint(posIdx.current / SPEED);
        const posnext = spline.getPoint((posIdx.current + 1) / SPEED);
        
        group.current.position.x = pos.x;
        group.current.position.y = pos.y;
        group.current.position.z = pos.z;

        group.current.lookAt(posnext);
    })
    return (
        <>
        <group ref={group}>
        <primitive object={cube} />
        
        </group>
        </>
    )
}