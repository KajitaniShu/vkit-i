import React, {useRef, useMemo, useEffect} from 'react'
import { CatmullRomCurve3, Vector3 } from 'three'
import * as Drei from "@react-three/drei";
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const Car = () => {
    const posIdx = useRef(0);
    const group  = useRef();
    const { scene } = Drei.useGLTF('./models/bus.glb');

    const spline = useMemo(() => {
        const Points = [
            new Vector3(-80,  0, 130),
            new Vector3(  0,  0, 130),
            new Vector3(  40, 0, 130),
            new Vector3(  80, 0, 130),
            new Vector3( 120, 0, 130),
            new Vector3( 145, 0, 120),
            new Vector3( 150, 0, 100),
            new Vector3( 150, 0,  50),
            new Vector3( 150, 0,   0),
            new Vector3( 150, 0,  -50),
            new Vector3( 150, 0, -110),
            new Vector3( 150, 0, -160),
            new Vector3( 150, 0, -200),
            new Vector3( 145, 0, -215),
            new Vector3( 110, 0, -220),
            new Vector3(  80, 0, -215),
            new Vector3(  22, 0, -170),
            new Vector3( -30, 0, -120),
            new Vector3( -50, 0, -100),
            new Vector3( -90, 0,  -30),
            new Vector3( -115,0,  40),
            new Vector3(-115, 0,  90),
            new Vector3( -95, 0,  125),
        ]
        
    
        const curve = new CatmullRomCurve3(Points);
        curve.curveType = "centripetal";
        curve.closed = true;
        
        return curve;
      }, []);

    const tubeGeom = new THREE.TubeBufferGeometry(spline, 250, 0.02, 10, true);
    const SPEED = 7000;

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
            {/*
            <mesh geometry={tubeGeom}>
                    <meshBasicMaterial color={"#121212"} />
                </mesh>
            */}
            <group ref={group}>
                <mesh >
                    <primitive object={scene}  roughness={10}/>
                </mesh>
            </group>
        </>
    )
}