import { FC } from 'react'
import {
  Center,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

const Forbidden: FC = () => (
  <>
    <Center h='100vh'>
      <Alert status='error' w='md'>
        <AlertIcon />
        <AlertTitle>警告</AlertTitle>
        <AlertDescription>アクセスが拒否されました</AlertDescription>
      </Alert>
    </Center>
  </>
)

export default Forbidden