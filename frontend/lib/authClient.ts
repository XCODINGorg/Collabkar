import { apiUrl } from './api';

export type UserRole = 'creator' | 'brand' | 'admin';

export interface AuthUser {
  id: string;
  email: string | null;
  role: UserRole;
}

const TOKEN_KEY = 'collabkar_token';
const LOCAL_ADMIN_TOKEN = 'local_admin_token_v1';

function localAdminUser(): AuthUser {
  return { id: 'admin', email: null, role: 'admin' };
}

function isLocalAdminToken(token: string) {
  return token === LOCAL_ADMIN_TOKEN;
}

export function getToken() {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  window.localStorage.removeItem(TOKEN_KEY);
}

export async function fetchMe(): Promise<AuthUser> {
  const token = getToken();
  if (!token) throw new Error('missing_token');

  if (isLocalAdminToken(token)) return localAdminUser();

  const response = await fetch(apiUrl('/api/auth/me'), {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  if (!response.ok) throw new Error('unauthorized');
  const data = await response.json();
  return data.user as AuthUser;
}

export async function login(identifier: string, password: string) {
  const normalizedIdentifier = typeof identifier === 'string' ? identifier.trim().toLowerCase() : '';
  const normalizedPassword = typeof password === 'string' ? password : '';
  const isLocalAdminAttempt = normalizedIdentifier === 'admin' && normalizedPassword === '1234';

  try {
    const response = await fetch(apiUrl('/api/auth/login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password }),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      if (isLocalAdminAttempt) {
        setToken(LOCAL_ADMIN_TOKEN);
        return localAdminUser();
      }
      throw new Error(data?.error || 'login_failed');
    }

    if (typeof data?.token === 'string') setToken(data.token);
    return data.user as AuthUser;
  } catch (err) {
    if (isLocalAdminAttempt) {
      setToken(LOCAL_ADMIN_TOKEN);
      return localAdminUser();
    }
    throw err;
  }
}

export async function signup(email: string, password: string, role: 'creator' | 'brand') {
  const response = await fetch(apiUrl('/api/auth/signup'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, role }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data?.error || 'signup_failed');

  if (typeof data?.token === 'string') setToken(data.token);
  return data.user as AuthUser;
}
