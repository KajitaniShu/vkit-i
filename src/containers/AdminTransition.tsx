import { useEffect, FC } from 'react'
import Forbidden from '@/components/molecules/Forbidden'
import StyledSpinner from '@/components/atoms/StyledSpinner'
import useAuth from '@/hooks/useAuth'

const AdminTransition: FC = () => {
  const { onClose, isAdmin } = useAuth()

  useEffect(() => {
    isAdmin !== undefined && !isAdmin && onClose()
  }, [isAdmin])

  return (
    <>
      {
        isAdmin === undefined ? <StyledSpinner /> :
        isAdmin === false ? <Forbidden /> :
          <p>admin</p>
      }
    </>
  )
}

export default AdminTransition