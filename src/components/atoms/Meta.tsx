import { FC } from 'react'
import Head from 'next/head'
import MetaProps  from '@/types/interfaces/Meta'

const Meta: FC<MetaProps> = ({ detail, path }) => (
  <>
    <Head>
      <title>{detail.title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
      <meta name='description' content={detail.description} />

      <meta property='og:title' content={detail.title} />
      <meta property='og:description' content={detail.description} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={detail.url} />
      <meta property='og:image' content={path.thumbnail} />
      <meta property='og:site_name' content={detail.title} />
      <meta property='og:locale' content='ja_JP' />

      {/* <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={detail.title} /> */}
      <link rel='canonical' href={detail.url} />
      <link rel='shortcut icon' href={path.favicon} />
      <link rel='apple-touch-icon' type='image/png' href={path.icon} sizes='180x180' />

      <link rel="preconnect" href="https://fonts.gstatic.com" />
    </Head>
  </> 
)

export default Meta