'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { clearToken, type AuthUser, type UserRole } from '../../../lib/authClient';

type NavItem = {
  label: string;
  href: string;
  roles?: UserRole[];
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', href: '/dashboard' },
  { label: 'Creator', href: '/dashboard/creator', roles: ['creator', 'admin'] },
  { label: 'Brand', href: '/dashboard/brand', roles: ['brand', 'admin'] },
  { label: 'Admin', href: '/dashboard/admin', roles: ['admin'] },
];

function initials(email: string | null) {
  if (!email) return 'AD';
  const parts = email.split('@')[0]?.split(/[._-]+/g).filter(Boolean) ?? [];
  const a = parts[0]?.[0]?.toUpperCase() ?? email[0]?.toUpperCase() ?? 'U';
  const b = parts[1]?.[0]?.toUpperCase() ?? parts[0]?.[1]?.toUpperCase() ?? 'S';
  return `${a}${b}`;
}

function accountLabel(user: AuthUser) {
  return user.profile?.displayName || user.profile?.companyName || user.email || 'Account';
}

export default function DashboardShell({
  title,
  user,
  children,
}: {
  title: string;
  user: AuthUser;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navItems = useMemo(() => {
    return NAV_ITEMS.filter((item) => {
      if (!item.roles) return true;
      return item.roles.includes(user.role);
    });
  }, [user.role]);

  const logout = () => {
    clearToken();
    router.replace('/login');
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_10%_10%,#eef1ff_0%,#f7f7f7_40%,#f6f7fb_100%)] text-[#0B0B0F]">
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <aside className="hidden w-72 shrink-0 md:block">
          <div className="sticky top-6 rounded-2xl border border-black/10 bg-white/70 p-4 shadow-[0_18px_45px_rgba(30,45,122,0.08)] backdrop-blur">
            <Link href="/" className="mb-4 flex items-center justify-center rounded-2xl border border-black/5 bg-white/70 px-4 py-3">
              <Image
                src="/bg-removed.png"
                alt="Collabkar logo"
                width={220}
                height={64}
                className="h-10 w-auto"
                priority
              />
            </Link>
            <div className="flex items-center justify-between gap-3 px-2 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3F5AE0] text-sm font-semibold text-white shadow-[0_12px_25px_rgba(63,90,224,0.32)]">
                  {initials(user.email)}
                </div>
                <div>
                  <div className="text-sm font-semibold leading-tight">{accountLabel(user)}</div>
                  <div className="text-xs text-gray-500">{user.email ?? 'admin'}</div>
                  <div className="text-xs text-gray-500">
                    {user.role === 'creator' ? 'Creator account' : user.role === 'brand' ? 'Brand account' : 'Admin'}
                  </div>
                </div>
              </div>
              <button
                onClick={logout}
                className="rounded-lg border border-black/10 bg-white px-3 py-2 text-xs text-gray-700 hover:border-black/20"
              >
                Log out
              </button>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition ${
                      active
                        ? 'bg-[#3F5AE0]/10 text-[#2E43B7]'
                        : 'text-gray-700 hover:bg-black/5'
                    }`}
                  >
                    <span className="font-medium">{item.label}</span>
                    {active && <span className="h-2 w-2 rounded-full bg-[#3F5AE0]" />}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-4 rounded-2xl border border-[#3F5AE0]/20 bg-[#3F5AE0]/10 p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#2E43B7]">Quick Tip</div>
              <div className="mt-2 text-sm text-gray-700">
                Use the sidebar to switch dashboards. Admin can access both Creator + Brand views.
              </div>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="rounded-2xl border border-black/10 bg-white/70 p-4 shadow-[0_18px_45px_rgba(30,45,122,0.08)] backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-gray-500">Dashboard</div>
                <h1 className="mt-1 text-2xl font-semibold">{title}</h1>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/"
                  className="hidden rounded-xl border border-black/10 bg-white px-4 py-2 text-sm text-gray-700 hover:border-black/20 sm:inline-flex"
                >
                  Home
                </Link>

                <button
                  onClick={() => setMobileNavOpen((s) => !s)}
                  className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-4 py-2 text-sm text-gray-700 hover:border-black/20 md:hidden"
                >
                  Menu
                </button>
              </div>
            </div>

            {mobileNavOpen && (
              <div className="mt-4 rounded-xl border border-black/10 bg-white p-2 md:hidden">
                <div className="flex items-center justify-between gap-3 px-2 py-2">
                  <div className="text-sm text-gray-700">Signed in as</div>
                  <div className="text-sm font-medium">{accountLabel(user)}</div>
                </div>
                <div className="grid grid-cols-2 gap-2 p-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileNavOpen(false)}
                      className="rounded-lg border border-black/10 bg-white px-3 py-2 text-center text-sm text-gray-700 hover:border-black/20"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <button
                    onClick={logout}
                    className="col-span-2 rounded-lg bg-[#0B0B0F] px-3 py-2 text-sm text-white"
                  >
                    Log out
                  </button>
                </div>
              </div>
            )}
          </header>

          <main className="mt-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
