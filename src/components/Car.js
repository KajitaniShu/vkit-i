import React, {useRef, useMemo, useEffect} from 'react'
import { CatmullRomCurve3, Vector3 } from 'three'
import * as Drei from "@react-three/drei";
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const Car = () => {
    const posIdx    = useRef(0);                            // 運行ルート1周におけるバスの位置
    const bus       = useRef();                             // バスの位置と角度参照用
    const { scene } = Drei.useGLTF('./models/bus.glb');     // 九工大バスモデル
    const clock     = new THREE.Clock();                    // デルタタイム取得用

    // 運行ルートを作成
    const routes = useMemo(() => {
        const Points = [
            new Vector3(-125, 0,  120),
            new Vector3( 142, 0,  120),
            new Vector3( 142, 0, -210),
            new Vector3(  60, 0, -210),
            new Vector3( -90, 0,  -60),
            new Vector3(-125, 0,   30)
        ]
        
        const curve = new CatmullRomCurve3(Points);
        curve.curveType = "catmullrom";
        curve.closed = true;
        curve.tension = 0.1;
        
        return curve;
    }, []);

    const tubeGeom = new THREE.TubeBufferGeometry(routes, 250, 0.02, 10, true); // 運行ルート表示用
    const SPEED = 7000;                                                         // バスのスピード

    useFrame(() => {
        const deltaTime = clock.getDelta();
        posIdx.current+=deltaTime*50;                                          // 次の
        if (posIdx.current > SPEED) posIdx.current = 0;
        const pos = routes.getPoint(posIdx.current / SPEED);
        const posnext = routes.getPoint((posIdx.current + 1) / SPEED);
        
        bus.current.position.x = pos.x;
        bus.current.position.y = pos.y;
        bus.current.position.z = pos.z;

        bus.current.lookAt(posnext);
    })
    return (
        <>
            {/*
            <mesh geometry={tubeGeom}>
                <meshBasicMaterial color={"#121212"} />
            </mesh>
            */}
            <group ref={bus}>
                <mesh >
                    <primitive object={scene}  roughness={10}/>
                </mesh>
            </group>
        </>
    )
}