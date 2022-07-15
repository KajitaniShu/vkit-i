import { FC } from 'react'
import {
  Image,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text
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
            <Image src={modal_image} />
            <Text>{modal_message}</Text>
        </ModalBody>
        <ModalFooter>
          <Button as={"a"} href={modal_url} target={'_blank'} colorScheme='blue' mr={3} onClick={onClose}>
            <Text>webサイトを開く</Text>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
)

export default PosterModal