'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DashboardShell from '../_components/DashboardShell';
import { clearToken, fetchMe, type AuthUser } from '../../../lib/authClient';

export default function BrandDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const me = await fetchMe();
        if (me.role !== 'brand' && me.role !== 'admin') {
          return router.replace('/dashboard');
        }
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

  if (loading) {
    return <div className="min-h-screen bg-gray-50 p-6 text-gray-700">Loading…</div>;
  }

  if (!user) return null;

  return (
    <DashboardShell title="Brand Dashboard" user={user}>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-[0_18px_45px_rgba(30,45,122,0.08)] backdrop-blur">
              <div className="text-xs uppercase tracking-wider text-gray-500">Active campaigns</div>
              <div className="mt-2 text-3xl font-semibold">2</div>
              <div className="mt-2 text-sm text-gray-600">1 recruiting • 1 live</div>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-[0_18px_45px_rgba(30,45,122,0.08)] backdrop-blur">
              <div className="text-xs uppercase tracking-wider text-gray-500">Spend (month)</div>
              <div className="mt-2 text-3xl font-semibold">₹42,000</div>
              <div className="mt-2 text-sm text-gray-600">Budget remaining: ₹18,000</div>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-[0_18px_45px_rgba(30,45,122,0.08)] backdrop-blur">
              <div className="text-xs uppercase tracking-wider text-gray-500">Applications</div>
              <div className="mt-2 text-3xl font-semibold">47</div>
              <div className="mt-2 text-sm text-gray-600">12 shortlisted</div>
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white/70 p-6 shadow-[0_18px_45px_rgba(30,45,122,0.08)] backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-lg font-semibold">Campaign performance</div>
                <div className="text-sm text-gray-600">High-level KPIs (demo data)</div>
              </div>
              <button className="rounded-xl bg-[#3F5AE0] px-4 py-2 text-sm text-white shadow-[0_14px_30px_rgba(63,90,224,0.28)] hover:shadow-[0_18px_38px_rgba(63,90,224,0.34)]">
                Create campaign
              </button>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                { name: 'Skincare Launch', status: 'Live', creators: 6, estReach: '120k–180k' },
                { name: 'Snack Trial', status: 'Recruiting', creators: 4, estReach: '65k–95k' },
              ].map((c) => (
                <div key={c.name} className="rounded-2xl border border-black/10 bg-white p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-semibold">{c.name}</div>
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                      c.status === 'Live' ? 'bg-green-100 text-green-700' : 'bg-indigo-100 text-indigo-700'
                    }`}>
                      {c.status}
                    </span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-gray-700">
                    <div>
                      <div className="text-xs text-gray-500">Creators</div>
                      <div className="font-medium">{c.creators}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Est. reach</div>
                      <div className="font-medium">{c.estReach}</div>
                    </div>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
                    <div className="h-full w-[62%] rounded-full bg-[#3F5AE0]" />
                  </div>
                  <div className="mt-2 text-xs text-gray-500">Completion</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-black/10 bg-white/70 p-6 shadow-[0_18px_45px_rgba(30,45,122,0.08)] backdrop-blur">
            <div className="text-lg font-semibold">Shortlist</div>
            <div className="mt-2 text-sm text-gray-600">Top creator matches for your brief.</div>
            <div className="mt-4 space-y-3">
              {[
                { name: 'Riya • Lifestyle', followers: '28k', rate: '₹6k–₹8k' },
                { name: 'Aman • Fitness', followers: '41k', rate: '₹9k–₹11k' },
                { name: 'Nisha • Food', followers: '19k', rate: '₹4k–₹6k' },
              ].map((c) => (
                <div key={c.name} className="rounded-xl border border-black/10 bg-white p-4">
                  <div className="font-medium">{c.name}</div>
                  <div className="mt-1 text-xs text-gray-500">{c.followers} followers • est. rate {c.rate}</div>
                  <div className="mt-3 flex gap-2">
                    <button className="flex-1 rounded-lg border border-black/10 bg-white px-3 py-2 text-xs text-gray-700 hover:border-black/20">
                      Message
                    </button>
                    <button className="flex-1 rounded-lg bg-[#0B0B0F] px-3 py-2 text-xs text-white">
                      Invite
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#3F5AE0]/20 bg-[#3F5AE0]/10 p-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#2E43B7]">AI brief helper</div>
            <div className="mt-2 text-sm text-gray-700">
              Write clearer requirements to reduce revisions and speed up approvals.
            </div>
            <button className="mt-4 w-full rounded-xl bg-[#0B0B0F] px-4 py-2.5 text-sm text-white">
              Generate campaign brief
            </button>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
