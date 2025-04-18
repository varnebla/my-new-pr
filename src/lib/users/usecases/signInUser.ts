import { signIn } from 'auth-astro/client'

export async function signinUser() {
  try {
    await signIn('google')

  } catch (error) {
    
  }
}