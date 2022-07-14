import { FC, useEffect } from 'react'
import { useAnimations, useGLTF } from '@react-three/drei'
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

  return (
    <>
      <PosterModel 
        onClick={onOpen}
        gltf={gltf}
        position={position}

      />
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