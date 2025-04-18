// src/pages/api/users/register.ts
import type { APIRoute } from 'astro'
import { db } from '@lib/core/db'
import { getSession } from 'auth-astro/server'

export const POST: APIRoute = async ({ request }) => {
  try {
    const session = await getSession(request)

    if (!session) {
      return new Response('Unauthorized', { status: 401 })
    }

    const email = session.user?.email
    const name = session.user?.name || null
    const image = session.user?.image || null

    if (!email) {
      return new Response('Bad Request: No email found.', { status: 400 })
    }

    // Buscar si el usuario ya existe
    const existing = await db.execute({
      sql: `SELECT id, name, email, image FROM users WHERE email = ? LIMIT 1`,
      args: [email],
    })
    if (existing.rows.length > 0) {
      const user = existing.rows[0]
      return new Response(JSON.stringify({ success: true, message: 'User already exists.', user }), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Crear nuevo usuario
    const id = crypto.randomUUID()

    await db.execute({
      sql: `INSERT INTO users (id, email, name, image) VALUES (?, ?, ?, ?)`,
      args: [id, email, name, image],
    })

    return new Response(JSON.stringify({ success: true, user: { id, email, name, image } }), {
      headers: { 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Error in /api/users/register:', error)

    return new Response(
      JSON.stringify({ success: false, message: 'Internal Server Error' }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
}
