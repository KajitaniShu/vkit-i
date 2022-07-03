import type { User } from 'firebase/auth'

export type UserType = User | null

export type AuthContextProps = {
  user: UserType
  isAdmin: boolean
}