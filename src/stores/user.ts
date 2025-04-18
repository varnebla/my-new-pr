import { atom } from 'nanostores'

export interface User {
  id: string
  email: string
  name: string
  image: string
}

export const userStore = atom<User | null>(null)
export const getUser = () => {
  return userStore.get()
}
export const setUser = (user: User | null) => {
  userStore.set(user)
}

export const clearUser = () => {
  userStore.set(null)
}