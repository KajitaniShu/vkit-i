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

const PosterModal: FC<PosterModalProps> = ({ isOpen, onClose }) => (
  <>
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>GYMLABO</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box boxSize='sm'>
            <Image src='/gymlab.jpg' />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            閉じる
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
)

export default PosterModal