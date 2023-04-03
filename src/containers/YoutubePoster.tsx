import { FC, useEffect, useState, useRef } from 'react'
import { useFrame} from '@react-three/fiber';
import { Html, useAnimations, useGLTF, CameraControls, Circle } from '@react-three/drei'
import { useDisclosure } from '@chakra-ui/react'
import YoutubePosterProps from '@/types/interfaces/YoutubePoster'
import YoutubePosterModal from '@/components/organisms/YoutubePosterModal'
import ChakraWrapper from '@/components/atoms/ChakraWrapper'
import { Mesh } from "three"

const YoutubePoster: FC<YoutubePosterProps> = ({ playerRef, cameraControlsRef, locked, modelPath, position, modal_header, modal_message, modal_url, ids }) => {
  const gltf = useGLTF(modelPath)
  const meshRef = useRef<Mesh>(null!);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [opend, setOpend] = useState(false);

  const { scene, animations } = useGLTF(modelPath);
  const { actions } = useAnimations(animations, scene);
  useEffect(() => {
    actions.Idle?.play();
  }, [actions, scene]);

  useFrame(() => {
    // @ts-ignore
    if(Math.abs(playerRef.current.position.x - position.x) + Math.abs(playerRef.current.position.z - position.z) < 0.7) {
      if(!isOpen && !opend) {
        // @ts-ignore
        onOpen(true);
        // @ts-ignore
        if(locked.current != null && cameraControlsRef.current != null) {
          // @ts-ignore
          locked.current = true;
          // @ts-ignore
          cameraControlsRef.current?.setTarget(meshRef.current?.position.x, meshRef.current?.position.y, meshRef.current?.position.z, true);
          // @ts-ignore
          cameraControlsRef.current?.saveState();
        }

        // @ts-ignore
        if(cameraControlsRef != null) cameraControlsRef.current.fitToBox(meshRef.current, true);
      }
      if(!opend) setOpend(true);
    }else{
      if(opend) {
        setOpend(false);
      }
    }
  });

  function countText(text: String){
      var length = 0.0;
      for(var i=0; i < text.length; i++) {
          text[i].match(/[ -~]/) ? length += 0.5 : length += 1.0;
      }
      return length;
  }

  function close(){
    onClose();
    // @ts-ignore
    if(locked.current != null && cameraControlsRef.current != null) {
      // @ts-ignore
      locked.current = false;
      // @ts-ignore
      cameraControlsRef.current?.reset(true);
    }
  }

  return (
    <>
      {/*
      <Html zIndexRange={[40, 0]} position={position} transform occlude distanceFactor={4} center={true} style={{ width: countText(modal_header + "の情報を知りたい？") + 2 + 'em' }} >
        <div style={{ backgroundColor: "#343434", textAlign: "center", padding: "0.1em", borderRadius: "5px", userSelect: "none" }}>
          <p style={{ color: "white" }}> {modal_header}の情報を知りたい？ </p>
        </div>
      </Html>
      */}
      
      <mesh>
        <primitive
          ref={meshRef}
          object={gltf.scene.clone()}
          position={position}
          scale={[0.3, 0.3, 0.3]}
        />
      </mesh>


      <ChakraWrapper>
        <YoutubePosterModal
          isOpen={false}
          onClose={close}
          modal_header={modal_header}
          modal_message={modal_message}
          modal_url={modal_url}
          ids={ids}
        />
      </ChakraWrapper>
    </>
  )
}

export default YoutubePoster