import { useState, useEffect } from 'react';
import { loadMixamoAnimation } from '@/containers/loadMixamoAnimation'
import { AnimationMixer, LoadingManager } from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { VRMLoaderPlugin, VRMUtils, VRM } from '@pixiv/three-vrm'
import { nprogress } from '@mantine/nprogress';

const useCharacterModel = () => {
  const [characterModels, setCharacterModels] = useState<any[]>();
  const [playerModel, setPlayerModel] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const loadingManager = new LoadingManager();
  const characters: any[] = [];

  loadingManager.onProgress = function(url, loaded, total) { nprogress.set(loaded/total * 100)  }
  loadingManager.onStart    = function() { setLoading(true); nprogress.reset() }
  loadingManager.onLoad     = function() { setLoaded(true); setLoading(false); nprogress.complete() }

  const loader = new GLTFLoader(loadingManager);

  loader.crossOrigin = 'anonymous'
  loader.register( ( parser ) => {
		return new VRMLoaderPlugin( parser, { autoUpdateHumanBones: true } );
	} );

  
  const load = async (player_model_path: any, character_model_path: any) => {

    if (!loaded) {
      // プレイヤーモデルの読み込み
      loader.loadAsync(player_model_path.model_path).then((gltf) => {
        VRMUtils.removeUnnecessaryVertices( gltf.scene );
        VRMUtils.removeUnnecessaryJoints( gltf.scene );
        const vrm = gltf.userData.vrm;
        setPlayerModel(vrm);
      });

      // VRM・アニメーションモデル読み込み
      await character_model_path.map((value: any, key: any) => {
        loader.loadAsync(value.model_path).then((gltf) => {
          VRMUtils.removeUnnecessaryVertices( gltf.scene );
          VRMUtils.removeUnnecessaryJoints( gltf.scene );
          const vrm = gltf.userData.vrm;
          characters.push({
            "position": value.position,
            "rotation": value.rotation,
            "messages": value.messages,
            "url": value.url,
            "models": vrm, 
            "animation_path": value.animation_path,
          });
        });
      });
      setCharacterModels(characters);
    }
  };

  // データをオブジェクト型で返す
  return { loading, playerModel, characterModels, load };
};
export default useCharacterModel;