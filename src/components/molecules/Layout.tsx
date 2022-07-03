import { FC } from 'react'
import Meta from '@/components/atoms/Meta'
import meta from '@/configs/meta.json'

const Layout: FC = ({ children }) => (
  <> 
    <Meta 
      detail={meta.detail}
      path={meta.path}
    />
    {children}
  </>
)

export default Layout