import { FC } from 'react'
import { useGLTF } from '@react-three/drei'
import { useDisclosure } from '@chakra-ui/react'
import PosterProps from '@/types/interfaces/Poster'
import OnClickModel from '@/components/molecules/OnClickModel'
import PosterModal from '@/components/organisms/PosterModal'
import ChakraWrapper from '@/components/atoms/ChakraWrapper'

const Poster: FC<PosterProps> = ({ modelPath }) => {
  const gltf = useGLTF(modelPath)
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <OnClickModel 
        onClick={onOpen}
        gltf={gltf}
      />
      <ChakraWrapper>
        <PosterModal
          isOpen={isOpen}
          onClose={onClose}
        />
      </ChakraWrapper>
    </>
  )
}

export default Poster