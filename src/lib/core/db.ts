import { createClient } from '@libsql/client'

// Conexión a Turso
export const db = createClient({
  url: import.meta.env.TURSO_DB_URL,
  authToken: import.meta.env.TURSO_AUTH_TOKEN,
})
