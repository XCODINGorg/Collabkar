'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DashboardShell from '../_components/DashboardShell';
import { clearToken, fetchMe, type AuthUser } from '../../../lib/authClient';

export default function CreatorDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const me = await fetchMe();
        if (me.role !== 'creator' && me.role !== 'admin') {
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
    <DashboardShell title="Creator Dashboard" user={user}>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-[0_18px_45px_rgba(30,45,122,0.08)] backdrop-blur">
              <div className="text-xs uppercase tracking-wider text-gray-500">Active deals</div>
              <div className="mt-2 text-3xl font-semibold">3</div>
              <div className="mt-2 text-sm text-gray-600">2 awaiting approval • 1 in progress</div>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-[0_18px_45px_rgba(30,45,122,0.08)] backdrop-blur">
              <div className="text-xs uppercase tracking-wider text-gray-500">This month</div>
              <div className="mt-2 text-3xl font-semibold">₹18,500</div>
              <div className="mt-2 text-sm text-gray-600">Estimated earnings (beta)</div>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-[0_18px_45px_rgba(30,45,122,0.08)] backdrop-blur">
              <div className="text-xs uppercase tracking-wider text-gray-500">Response rate</div>
              <div className="mt-2 text-3xl font-semibold">92%</div>
              <div className="mt-2 text-sm text-gray-600">Keep replying within 24h</div>
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white/70 p-6 shadow-[0_18px_45px_rgba(30,45,122,0.08)] backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-lg font-semibold">Deal pipeline</div>
                <div className="text-sm text-gray-600">Track every collab from pitch → payout</div>
              </div>
              <button className="rounded-xl bg-[#3F5AE0] px-4 py-2 text-sm text-white shadow-[0_14px_30px_rgba(63,90,224,0.28)] hover:shadow-[0_18px_38px_rgba(63,90,224,0.34)]">
                New pitch
              </button>
            </div>

            <div className="mt-5 overflow-hidden rounded-2xl border border-black/10 bg-white">
              <div className="grid grid-cols-12 gap-2 border-b border-black/10 bg-gray-50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                <div className="col-span-5">Brand</div>
                <div className="col-span-3">Deliverable</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2 text-right">Payout</div>
              </div>
              {[
                { brand: 'D2C Skincare Co.', deliverable: '1 Reel + 2 Stories', status: 'In progress', payout: '₹7,500' },
                { brand: 'Healthy Snacks', deliverable: '3 Stories', status: 'Awaiting', payout: '₹3,000' },
                { brand: 'Tech Accessories', deliverable: '1 Post', status: 'Awaiting', payout: '₹8,000' },
              ].map((row) => (
                <div key={row.brand} className="grid grid-cols-12 gap-2 px-4 py-3 text-sm text-gray-700">
                  <div className="col-span-5 font-medium text-[#0B0B0F]">{row.brand}</div>
                  <div className="col-span-3">{row.deliverable}</div>
                  <div className="col-span-2">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                      row.status === 'In progress' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {row.status}
                    </span>
                  </div>
                  <div className="col-span-2 text-right font-semibold text-[#0B0B0F]">{row.payout}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-black/10 bg-white/70 p-6 shadow-[0_18px_45px_rgba(30,45,122,0.08)] backdrop-blur">
            <div className="text-lg font-semibold">Today</div>
            <div className="mt-2 text-sm text-gray-600">Your next actions to keep momentum.</div>
            <div className="mt-4 space-y-3">
              {[
                { title: 'Upload draft reel', meta: 'D2C Skincare Co. • due tomorrow' },
                { title: 'Reply to brand chat', meta: 'Healthy Snacks • 2 messages' },
                { title: 'Confirm posting date', meta: 'Tech Accessories • awaiting your reply' },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-black/10 bg-white p-4">
                  <div className="font-medium">{item.title}</div>
                  <div className="mt-1 text-xs text-gray-500">{item.meta}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#3F5AE0]/20 bg-[#3F5AE0]/10 p-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#2E43B7]">AI suggestion</div>
            <div className="mt-2 text-sm text-gray-700">
              Boost your acceptance rate by sending a short pitch with 1–2 past campaign screenshots.
            </div>
            <button className="mt-4 w-full rounded-xl bg-[#0B0B0F] px-4 py-2.5 text-sm text-white">
              Generate a pitch template
            </button>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
