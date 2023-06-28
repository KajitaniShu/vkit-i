import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { mixamoVRMRigMap } from '@/types/data/mixamoVRMRigMap';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { Html, useGLTF, useAnimations } from '@react-three/drei'

export function loadMixamoAnimation( url: any, vrm: any /*, loadingManager: any */ ) {
  const loader = new FBXLoader(/*loadingManager*/); // FBXを読み込むLoader
  return loader.loadAsync(url).then((gltf) => {
    const clip = THREE.AnimationClip.findByName( gltf.animations, 'mixamo.com' ); // AnimationClipを抽出する
    const tracks: any[] = [];

		const restRotationInverse = new THREE.Quaternion();
		const parentRestWorldRotation = new THREE.Quaternion();
		const _quatA = new THREE.Quaternion();
		const _vec3 = new THREE.Vector3();

		// @ts-ignore
		const motionHipsHeight = gltf.getObjectByName( 'mixamorigHips' ).position.y;
		const vrmHipsY = vrm.humanoid?.getNormalizedBoneNode( 'hips' ).getWorldPosition( _vec3 ).y;
		const vrmRootY = vrm.scene.getWorldPosition( _vec3 ).y;
		const vrmHipsHeight = Math.abs( vrmHipsY - vrmRootY );
		const hipsPositionScale = vrmHipsHeight / motionHipsHeight;

		clip.tracks.forEach( ( track ) => {
			const trackSplitted = track.name.split( '.' );
			const mixamoRigName = trackSplitted[ 0 ];
			// @ts-ignore
			const vrmBoneName: any = mixamoVRMRigMap[ mixamoRigName ];
			const vrmNodeName: any = vrm.humanoid?.getNormalizedBoneNode( vrmBoneName )?.name;
			const mixamoRigNode = gltf.getObjectByName( mixamoRigName );

			if ( vrmNodeName != null ) {

				const propertyName = trackSplitted[ 1 ];

				mixamoRigNode?.getWorldQuaternion( restRotationInverse ).invert();
				mixamoRigNode?.parent?.getWorldQuaternion( parentRestWorldRotation );

				if ( track instanceof THREE.QuaternionKeyframeTrack ) {
					for ( let i = 0; i < track.values.length; i += 4 ) {
						const flatQuaternion = track.values.slice( i, i + 4 );
						_quatA.fromArray( flatQuaternion );
						_quatA
							.premultiply( parentRestWorldRotation )
							.multiply( restRotationInverse );
						_quatA.toArray( flatQuaternion );
						flatQuaternion.forEach( ( v, index ) => {
							track.values[ index + i ] = v;
						} );
					}

					tracks.push(
						new THREE.QuaternionKeyframeTrack(
							`${vrmNodeName}.${propertyName}`,
							track.times,
							track.values.map( ( v, i ) => ( vrm.meta?.metaVersion === '0' && i % 2 === 0 ? - v : v ) ),
						),
					);

				} else if ( track instanceof THREE.VectorKeyframeTrack ) {
					const value = track.values.map( ( v, i ) => ( vrm.meta?.metaVersion === '0' && i % 3 !== 1 ? - v : v ) * hipsPositionScale );
					tracks.push( new THREE.VectorKeyframeTrack( `${vrmNodeName}.${propertyName}`, track.times, value ) );
				}
			}
		} );
			return new THREE.AnimationClip( 'greet', clip.duration, tracks );
    });
    
}