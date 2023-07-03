import { FC } from 'react'
import { AppProps } from 'next/app'
import AuthProvider from '@/containers/AuthProvider'
import Layout from '@/components/molecules/Layout'
import { MantineProvider } from '@mantine/core';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Layout>
        {/* @ts-ignore */}
        <Component {...pageProps} />
      </Layout>
    </MantineProvider>
  </>
)

export default App