import { FC } from 'react'
import {
  Image,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import PosterModalProps from '@/types/interfaces/PosterModal'

const PosterModal: FC<PosterModalProps> = ({ isOpen, onClose , modal_header, modal_image, modal_message, modal_url}) => (
  <>
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent style={{zIndex:1000}}>
        <ModalHeader>{modal_header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box boxSize='sm'>
            <Image src={modal_image} />
            <p>{modal_message}</p>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button as={"a"} href={modal_url} target={'_blank'} colorScheme='blue' mr={3} onClick={onClose}>
            webサイトを開く
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
)

export default PosterModal