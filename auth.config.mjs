import { defineConfig } from 'auth-astro';
import Google from '@auth/core/providers/google';


export default defineConfig({
  providers: [
    Google({
      clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: import.meta.env.AUTH_SECRET,
  callbacks: {
    async register(){
      
    },
    async redirect({ url, baseUrl }) {
      // Siempre redirige a /dashboard después de login
      return `${baseUrl}/auth/callback`
    },
  },
});