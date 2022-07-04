import { FC } from 'react'
import { Progress } from '@chakra-ui/react'
import ChakraWrapper from '@/components/atoms/ChakraWrapper'
import LoaderProps from '@/types/interfaces/Loader'

const Loader: FC<LoaderProps> = ({ progress }) => (
  <ChakraWrapper>
    <Progress value={progress} />
  </ChakraWrapper>
)

export default Loader