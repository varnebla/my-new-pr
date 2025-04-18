import type { MiddlewareHandler } from 'astro'
import { getSession } from 'auth-astro/server'

export const onRequest: MiddlewareHandler = async (context, next) => {
  const session = await getSession(context.request)

  const protectedRoutes = ['/dashboard'] // Rutas que requieren login

  if (protectedRoutes.some((path) => context.url.pathname.startsWith(path)) && !session) {
    return context.redirect('/') // O a /login
  }

  // Si todo está bien, continúa
  return next()
}