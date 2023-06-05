import { FC } from 'react'
import { AppProps } from 'next/app'
import AuthProvider from '@/containers/AuthProvider'
import Layout from '@/components/molecules/Layout'
import { ChakraProvider } from '@chakra-ui/react'

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <ChakraProvider>
        <Layout>
          {/* @ts-ignore */}
          <Component {...pageProps} />
        </Layout>
    </ChakraProvider> 
  </>
)

export default App