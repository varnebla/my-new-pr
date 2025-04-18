import { GET } from '@pages/api/users/me';
import type { AstroGlobal } from 'astro';
import { setUser } from '@stores/user';

export const getUserData = async (Astro: AstroGlobal) => {
  const res = await GET(Astro);
  let user = null;
  if (res.ok) {
    const data = await res.json();
    user = data.user;
    setUser(user);
  }
  return user;
}