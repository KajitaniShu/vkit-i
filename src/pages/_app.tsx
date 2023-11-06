import { FC, useEffect } from 'react'
import { AppProps } from 'next/app'
import Layout from '@/components/molecules/Layout'
import { MantineProvider } from '@mantine/core';
import { Analytics } from '@vercel/analytics/react';
import Script from "next/script";
import * as gtag from "@/components/atoms/gtag";
import { useRouter } from "next/router";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  useEffect(() => {
    const handleRouterChange = (url: any) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouterChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouterChange);
    };
  }, [router.events]);
  
  return(
  <>
    <Script
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_MEASUREMENT_ID}`}
    />
    <Script
      id="gtag-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${gtag.GA_MEASUREMENT_ID}');
        `,
      }}
    />
    <MantineProvider 
      theme={{
        /** Put your mantine theme override here */
        colorScheme: "light",
      }}
      withGlobalStyles 
      withNormalizeCSS
    >
      <Layout>
        {/* @ts-ignore */}
        <Component {...pageProps} />
        <Analytics />
      </Layout>
    </MantineProvider>
  </>
)}

export default App