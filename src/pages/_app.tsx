
import { FC } from 'react'
import { AppProps } from 'next/app'
import Layout from '@/components/molecules/Layout'
import { MantineProvider } from '@mantine/core';
import { Analytics } from '@vercel/analytics/react';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Layout>
        {/* @ts-ignore */}
        <Component {...pageProps} />
        <Analytics />
      </Layout>
    </MantineProvider>
  </>
)

export default App