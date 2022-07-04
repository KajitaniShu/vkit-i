type MetaProps = {
  detail: PageDetail
  path: ImagePath
}

type PageDetail = {
  title: string
  description: string
  url: string
}

type ImagePath = {
  icon: string
  favicon: string
  thumbnail: string
}

export default MetaProps