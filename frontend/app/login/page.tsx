'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { login } from '../../lib/authClient';
import { AuthShell } from '../_components/AuthShell';
import { SocialAuthButtons } from '../_components/SocialAuthButtons';
import { Card, Divider, ErrorBanner, Label, PrimaryButton, TextInput } from '../_components/ui';

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(identifier, password);
      router.replace('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : "can't login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Log in"
      subtitle="Use your email and password, or continue with a provider."
      asideTitle="Welcome back to a cleaner workflow."
      asideText="Sign in to manage creator discovery, pricing signals, and campaign progress from one place."
    >
      <Card>
        <div className="mb-6">
          <SocialAuthButtons redirect="/dashboard" />
        </div>

        <div className="mb-6">
          <Divider />
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label>Email</Label>
            <TextInput
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <Label>Password</Label>
            <TextInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <ErrorBanner message={error} />}
          {error && error.toLowerCase().includes('not verified') && (
            <div className="text-sm text-gray-700">
              <Link className="text-blue-700 underline" href={`/verify-email?email=${encodeURIComponent(identifier)}`}>
                Verify your email
              </Link>
            </div>
          )}

          <PrimaryButton type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Log in'}
          </PrimaryButton>
        </form>

        <div className="mt-4 text-sm text-gray-700">
          No account? <Link className="text-blue-700 underline" href="/signup">Sign up</Link>
        </div>
      </Card>
    </AuthShell>
  );
}
