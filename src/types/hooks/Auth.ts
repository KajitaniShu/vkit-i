import { FormInput } from '@/types/interfaces/Form'

type Auth = {
  handleSignUp: (input: FormInput) => Promise<void>
  handleLogIn: (input: FormInput) => Promise<void>
  handleLogOut: () => Promise<void>
  onClose: () => Promise<void>
  isLoggedIn: boolean
  isAdmin: boolean | undefined 
}

export default Auth