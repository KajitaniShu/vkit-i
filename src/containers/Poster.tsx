import { FC, useEffect } from 'react'
import { Html, useAnimations, useGLTF } from '@react-three/drei'
import { useDisclosure } from '@chakra-ui/react'
import PosterProps from '@/types/interfaces/Poster'
import PosterModel from '@/components/molecules/PosterModel'
import PosterModal from '@/components/organisms/PosterModal'
import ChakraWrapper from '@/components/atoms/ChakraWrapper'

const Poster: FC<PosterProps> = ({ modelPath, position, modal_header, modal_image, modal_message, modal_url }) => {
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
      <PosterModel 
        onClick={onOpen}
        gltf={gltf}
        position={position}
      />

      <Html sprite={true} zIndexRange={[40, 0]} position={[position.x, position.y+1.3, position.z]} transform occlude distanceFactor={4} center={true} style={{ width: countText(modal_header) + 2 + 'em' }} >
        <div style={{ backgroundColor: "white", textAlign: "center", padding: "0.1em", borderRadius: "5px", userSelect: "none" }}>
          <p style={{ color: "#343434" }}> {modal_header} </p>
        </div>
      </Html>

      <ChakraWrapper>
        <PosterModal
          isOpen={isOpen}
          onClose={onClose}
          modal_header={modal_header}
          modal_image={modal_image}
          modal_message={modal_message}
          modal_url={modal_url}
        />
      </ChakraWrapper>
    </>
  )
}

export default Poster