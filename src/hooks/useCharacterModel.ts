import { useState, useEffect } from 'react';
import { loadMixamoAnimation } from '@/containers/loadMixamoAnimation'
import { AnimationMixer, LoadingManager } from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { VRMLoaderPlugin, VRMUtils, VRM } from '@pixiv/three-vrm'


const useCharacterModel = () => {
  const [characterModels, setCharacterModels] = useState<any[]>();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const loadingManager = new LoadingManager();
  const characters: any[] = [];
  const animations: any[] = [];
  let   progress = 0.0;

  loadingManager.onProgress = function(url, loaded, total) { progress = loaded / total }
  loadingManager.onStart    = function() { setLoading(true); }
  loadingManager.onLoad     = function() { setLoaded(false); setLoading(false); }

  const loader = new GLTFLoader(loadingManager);
  const animLoader = new FBXLoader(loadingManager); // FBXを読み込むLoader

  loader.crossOrigin = 'anonymous'
  loader.register( ( parser ) => {
		return new VRMLoaderPlugin( parser, { autoUpdateHumanBones: true } );
	} );

  

  const load = async (path: any) => {

    if (!loaded) {
      // VRM・アニメーションモデル読み込み
      await path.map((value: any, key: any) => {
        // VRMモデル読み込み
        loader.loadAsync(value.model_path).then((gltf) => {
          VRMUtils.removeUnnecessaryVertices( gltf.scene );
          VRMUtils.removeUnnecessaryJoints( gltf.scene );
          const vrm = gltf.userData.vrm;
          const mixer = new AnimationMixer(vrm.scene);
          characters.push({
            "position": value.position,
            "rotation": value.rotation,
            "messages": value.messages,
            "models": vrm, 
            "animation_path": value.animation_path,
          });
        });
      });

      setCharacterModels(characters);
    }
  };

  // データをオブジェクト型で返す
  return { error, setError, loading, characters, characterModels, progress,load };
};
export default useCharacterModel;