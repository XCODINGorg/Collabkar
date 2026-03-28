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
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/75 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <BrandLogo imageClassName="h-10 w-auto" priority />

          <nav className="hidden items-center gap-6 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <SecondaryLinkButton href="/login">Log in</SecondaryLinkButton>
            <PrimaryLinkButton href="/signup">Sign up</PrimaryLinkButton>
          </div>
        </div>
      </Container>
    </header>
  );
}
