import { FC, useEffect } from 'react'
import { Html, useAnimations, useGLTF } from '@react-three/drei'
import { useDisclosure } from '@chakra-ui/react'
import YoutubePosterProps from '@/types/interfaces/YoutubePoster'
import YoutubePosterModel from '@/components/molecules/YoutubePosterModel'
import YoutubePosterModal from '@/components/organisms/YoutubePosterModal'
import ChakraWrapper from '@/components/atoms/ChakraWrapper'

const YoutubePoster: FC<YoutubePosterProps> = ({ modelPath, position, modal_header, modal_message, modal_url, ids }) => {
  const gltf = useGLTF(modelPath)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { scene, animations } = useGLTF(modelPath);
  const { actions } = useAnimations(animations, scene);
  useEffect(() => {
    //console.log(actions);
    actions.Idle?.play();
  }, [actions, scene]);

function countText(text: String){
    var length = 0.0;
    for(var i=0; i < text.length; i++) {
        text[i].match(/[ -~]/) ? length += 0.5 : length += 1.0;
    }
    return length;
}

  return (
    <>
      <YoutubePosterModel 
        onClick={onOpen}
        gltf={gltf}
        position={position}
      />

      <Html sprite={true} zIndexRange={[40, 0]} position={[position.x, position.y+1.5, position.z]} transform occlude distanceFactor={4} center={true} style={{ width: countText(modal_header) + 2 + 'em' }} >
        <div style={{ backgroundColor: "green", textAlign: "center", padding: "0.1em", borderRadius: "5px", userSelect: "none" }}>
          <h3 style={{ color: "white"}}> {modal_header} </h3>
        </div>
      </Html>

      <ChakraWrapper>
        <YoutubePosterModal
          isOpen={isOpen}
          onClose={onClose}
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