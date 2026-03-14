export function getApiBase() {
  return process.env.NEXT_PUBLIC_BACKEND_URL || '';
}

export function apiUrl(path: string) {
  const base = getApiBase();
  if (!base) return path;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

