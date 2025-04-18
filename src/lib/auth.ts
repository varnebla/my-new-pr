// src/lib/auth.ts
import type { APIContext } from 'astro'
import { getSession } from 'auth-astro/server'

/**
 * Requiere una sesión activa. Si no existe, redirige a `/`.
 * @returns La sesión autenticada.
 */
export async function requireSession(Astro: APIContext) {
  const session = await getSession(Astro.request)

  if (!session) {
    // Puedes cambiar esta ruta si tienes una página de login
    return Astro.redirect('/')
  }

  return session
}