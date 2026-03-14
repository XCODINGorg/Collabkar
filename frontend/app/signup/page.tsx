'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signup } from '../../lib/authClient';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'creator' | 'brand'>('creator');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signup(email, password, role);
      router.replace('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Sign up</h1>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-md p-2"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-md p-2"
              placeholder="At least 6 characters"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Account type</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as 'creator' | 'brand')}
              className="w-full border rounded-md p-2"
            >
              <option value="creator">Creator</option>
              <option value="brand">Brand</option>
            </select>
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? 'Creating…' : 'Create account'}
          </button>
        </form>

        <div className="mt-4 text-sm text-gray-700">
          Already have an account? <Link className="text-blue-700 underline" href="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
}

