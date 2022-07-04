import { FC } from 'react'
import {
  Flex,
  Box,
  Button,
  ButtonGroup,
  Spacer,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import AuthButton from '@/components/molecules/AuthButton'
import useAuth from '@/hooks/useAuth'

const Header: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { handleLogOut, isLoggedIn } = useAuth()

  return (
    <>
      <Flex minWidth='max-content' alignItems='center' gap='2'>
        <Box>
          <Button
            onClick={onOpen}
            colorScheme='blackAlpha'
            size='lg'
            zIndex={1}
          >
            <HamburgerIcon />
          </Button>
        </Box>
        <Spacer />
        <AuthButton
          isLoggedIn={isLoggedIn}
          handleLogOut={handleLogOut}
        />
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>GYMLABO</DrawerHeader>
        <DrawerBody>
        </DrawerBody>
        <DrawerFooter>\
        </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Header