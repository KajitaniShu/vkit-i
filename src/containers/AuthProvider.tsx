import { useState, useEffect, FC } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/router'
import { AuthContext } from '@/hooks/useAuth'
import { app } from '@/utils/firebase'
import { UserType } from '@/types/interfaces/AuthProvider'

const AuthProvider: FC = ({ children }) => {
  const router = useRouter()
  const auth = getAuth(app)
  const [user, setUser] = useState<UserType>(null)
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(undefined)
  const value = { user, isAdmin }
  const isAvailableForViewing =
    router.pathname === '/LogIn' ||
    router.pathname === '/SignUp' ||
    router.pathname === '/'

  useEffect(() => {
    const authStateChanged = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      if (user) {
        await user.getIdTokenResult(true).then((result) => {
          if (!!result.claims.admin) {
            setIsAdmin(true)
          } else {
            setIsAdmin(false)
          }
        })
      } else {
        !isAvailableForViewing && (await router.push('/'))
      }
    })
    return () => {
      authStateChanged()
    }
  }, [])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider