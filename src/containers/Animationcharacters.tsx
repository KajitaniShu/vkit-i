import React, {useState, useEffect} from 'react'
import { useLoader, useThree } from 'react-three-fiber'
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { VRMLoaderPlugin, VRMUtils, VRM } from '@pixiv/three-vrm'
import THREE, { Scene, Group, AnimationMixer, Clock } from 'three'
import { Html, useGLTF, useAnimations } from '@react-three/drei'
import { loadMixamoAnimation } from '@/containers/loadMixamoAnimation'


export function Animationcharacters({url}: any) {
  const [vrm, setVrm] = useState<GLTF>()
  const loader = new GLTFLoader();
  loader.crossOrigin = 'anonymous'
  loader.register( ( parser ) => {
		return new VRMLoaderPlugin( parser, { autoUpdateHumanBones: true } );
	} );
  let currentMixer: any = undefined;
  let currentVRM: any = undefined;
  const clock = new Clock();

  function animate() {
    requestAnimationFrame( animate );
    const deltaTime = clock.getDelta();
    // if animation is loaded
    if ( currentMixer ) {
      // update the animation
      currentMixer.update( deltaTime );
    }
    if ( currentVRM ) {
      currentVRM.update( deltaTime );
    }
  }

  useEffect(() => {
    if(!vrm){
      loader.load(
        url,
        // called when the resource is loaded
        ( gltf ) => {
          // calling these functions greatly improves the performance
          VRMUtils.removeUnnecessaryVertices( gltf.scene );
          VRMUtils.removeUnnecessaryJoints( gltf.scene );
  
          currentVRM = gltf.userData.vrm as VRM;
          setVrm(gltf.userData.vrm);
          
          currentMixer = new AnimationMixer(gltf.userData.vrm.scene);
          
          // Load animation
          loadMixamoAnimation( "/avatars/greet.fbx", currentVRM ).then( ( clip ) => {
            currentMixer.clipAction(clip).play();
            currentMixer.timeScale = 1.0;
          } );
          animate()
          
        },
  
        // called while loading is progressing
        ( progress ) => {},
  
        // called when loading has errors
        ( error ) => console.error( error )
      );
    }
  });

  return(
    
    <> 
    {vrm ?
        <mesh scale={[1.2, 1.2, 1.2]} rotation={[0, 0, 0]} position={[4, 0, 9]} castShadow>
          <primitive
            object={vrm.scene}
          />
        </mesh>
      :
      <></>
    }
    </>
  )
}
