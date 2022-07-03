import { FC } from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import FormLink from '@/components/atoms/FormLink'
import AuthButtonProps from "@/types/interfaces/AuthButton"

const AuthButton: FC<AuthButtonProps> = ({ isLoggedIn, handleLogOut }) => (
  <>
    <ButtonGroup gap='2' zIndex={1}>
      {isLoggedIn ?
        <Button colorScheme='teal' onClick={handleLogOut}>
          LogOut
        </Button> : 
      <>
        <Button colorScheme='teal' variant='outline'>
          <FormLink url='/SignUp' text='SignUp'/>
        </Button>
        <Button colorScheme='teal' variant='outline'>
          <FormLink url='/LogIn' text='LogIn'/>
        </Button>
      </>
      }
    </ButtonGroup>
  </>
)

export default AuthButton