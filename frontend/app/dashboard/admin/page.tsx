'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DashboardShell from '../_components/DashboardShell';
import { clearToken, fetchMe, type AuthUser } from '../../../lib/authClient';

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const me = await fetchMe();
        if (me.role !== 'admin') return router.replace('/dashboard');
        setUser(me);
      } catch {
        clearToken();
        router.replace('/login');
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [router]);

  if (loading) return <div className="min-h-screen bg-gray-50 p-6 text-gray-700">Loading...</div>;
  if (!user) return null;

  return (
    <DashboardShell title="Admin Dashboard" user={user}>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-[0_18px_45px_rgba(30,45,122,0.08)] backdrop-blur">
              <div className="text-xs uppercase tracking-wider text-gray-500">Total users</div>
              <div className="mt-2 text-3xl font-semibold">—</div>
              <div className="mt-2 text-sm text-gray-600">Stored in backend JSON</div>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-[0_18px_45px_rgba(30,45,122,0.08)] backdrop-blur">
              <div className="text-xs uppercase tracking-wider text-gray-500">Creator view</div>
              <div className="mt-2 text-3xl font-semibold">Enabled</div>
              <div className="mt-2 text-sm text-gray-600">Admin can open it</div>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-[0_18px_45px_rgba(30,45,122,0.08)] backdrop-blur">
              <div className="text-xs uppercase tracking-wider text-gray-500">Brand view</div>
              <div className="mt-2 text-3xl font-semibold">Enabled</div>
              <div className="mt-2 text-sm text-gray-600">Admin can open it</div>
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white/70 p-6 shadow-[0_18px_45px_rgba(30,45,122,0.08)] backdrop-blur">
            <div className="text-lg font-semibold">Switch dashboards</div>
            <div className="mt-2 text-sm text-gray-600">
              Open the Creator + Brand dashboards to verify UI and flows.
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Link
                href="/dashboard/creator"
                className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="text-sm text-gray-500">View as</div>
                <div className="mt-1 text-xl font-semibold">Creator</div>
                <div className="mt-2 text-sm text-gray-600">Deals, earnings, tasks</div>
              </Link>
              <Link
                href="/dashboard/brand"
                className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="text-sm text-gray-500">View as</div>
                <div className="mt-1 text-xl font-semibold">Brand</div>
                <div className="mt-2 text-sm text-gray-600">Campaigns, shortlist, spend</div>
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-black/10 bg-white/70 p-6 shadow-[0_18px_45px_rgba(30,45,122,0.08)] backdrop-blur">
            <div className="text-lg font-semibold">Admin checklist</div>
            <div className="mt-4 space-y-3">
              {[
                'Sign up as Creator and reach dashboard',
                'Sign up as Brand and reach dashboard',
                'Log in with an admin account',
                'Confirm admin can open both views',
              ].map((t) => (
                <div key={t} className="flex items-start gap-3 rounded-xl border border-black/10 bg-white p-4">
                  <div className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#3F5AE0]" />
                  <div className="text-sm text-gray-700">{t}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#3F5AE0]/20 bg-[#3F5AE0]/10 p-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#2E43B7]">Note</div>
            <div className="mt-2 text-sm text-gray-700">
              This is a demo dashboard UI. Next step is wiring real deals/campaign data from a database.
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
