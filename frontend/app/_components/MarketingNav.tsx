import Link from 'next/link';
import { BrandLogo } from './BrandLogo';
import { Container, PrimaryLinkButton, SecondaryLinkButton } from './marketing';

const NAV = [
  { label: 'Creators', href: '/creators' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'How it works', href: '#how-it-works' },
];

export function MarketingNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur">
      <Container>
        <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-between gap-4">
            <BrandLogo imageClassName="h-9 w-auto sm:h-10" priority />
            <div className="flex items-center gap-2 md:hidden">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm transition hover:bg-gray-50"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-black"
              >
                Sign up
              </Link>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-3 text-sm md:gap-6">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-1.5 font-medium text-gray-700 transition hover:bg-gray-100 hover:text-gray-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <SecondaryLinkButton href="/login">Log in</SecondaryLinkButton>
            <PrimaryLinkButton href="/signup">Sign up</PrimaryLinkButton>
          </div>
        </div>
      </Container>
    </header>
  );
}
