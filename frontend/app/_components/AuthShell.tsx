import type { ReactNode } from 'react';
import { BrandLogo } from './BrandLogo';

export function AuthShell({
  title,
  subtitle,
  asideTitle,
  asideText,
  children,
}: {
  title: string;
  subtitle: string;
  asideTitle: string;
  asideText: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#F8FAFC_0%,#FFFFFF_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)] lg:grid-cols-[0.95fr_1.05fr]">
        <aside className="relative hidden overflow-hidden border-r border-gray-200 bg-[radial-gradient(circle_at_15%_15%,#DBEAFE_0%,transparent_38%),radial-gradient(circle_at_80%_20%,#EDE9FE_0%,transparent_34%),linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)] p-10 lg:flex lg:flex-col lg:justify-between">
          <div>
            <BrandLogo imageClassName="h-12 w-auto" priority />
            <div className="mt-12 max-w-sm">
              <h2 className="text-3xl font-semibold tracking-tight text-gray-900">{asideTitle}</h2>
              <p className="mt-4 text-sm leading-7 text-gray-600">{asideText}</p>
            </div>
          </div>

          <div className="grid gap-3">
            {[
              'Clean creator and brand onboarding',
              'OAuth-ready entry flow in the Next app',
              'Responsive layout that works better on smaller screens',
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm text-gray-700 shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </aside>

        <main className="flex items-center justify-center p-5 sm:p-8 lg:p-10">
          <div className="w-full max-w-xl">
            <div className="mb-8 flex flex-col gap-4">
              <BrandLogo imageClassName="h-11 w-auto" priority />
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-gray-900">{title}</h1>
                <p className="mt-2 text-sm leading-6 text-gray-600">{subtitle}</p>
              </div>
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
