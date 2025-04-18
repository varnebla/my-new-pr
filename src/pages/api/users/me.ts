import type { APIRoute } from 'astro'
import { db } from '@lib/core/db'
import { getSession } from 'auth-astro/server'

export const GET: APIRoute = async ({ request }) => {
  try {
    const session = await getSession(request)

    if (!session) {
      return new Response('Unauthorized', { status: 401 })
    }

    const email = session.user?.email

    if (!email) {
      return new Response('Bad Request: No email found.', { status: 400 })
    }

    // Buscar si el usuario existe
    const existing = await db.execute({
      sql: `SELECT id, name, email, image FROM users WHERE email = ? LIMIT 1`,
      args: [email],
    })
    if (existing.rows.length === 0) {
      return new Response(JSON.stringify({ success: false, message: 'User not found.' }), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const user = existing.rows[0]
    return new Response(JSON.stringify({ success: true, user }), {
      headers: { 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Error in /api/users/me:', error)

    return new Response(
      JSON.stringify({ success: false, message: 'Internal Server Error' }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
} 