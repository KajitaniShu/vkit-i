import { FC } from 'react'
import { Spinner, Center } from '@chakra-ui/react'

const StyledSpinner: FC = () => (
  <>
    <Center h='100vh'>
      <Spinner size='xl'/>
    </Center>
  </>
)

export default StyledSpinner