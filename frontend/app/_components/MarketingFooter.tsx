import Link from 'next/link';
import { BrandLogo } from './BrandLogo';
import { Container } from './marketing';

export function MarketingFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <Container>
        <div className="grid gap-8 py-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <BrandLogo imageClassName="h-12 w-auto" textClassName="text-sm font-semibold text-gray-900" />
            <div className="mt-2 text-sm text-gray-600">
              A startup-style marketplace to match brands with creators using offline AI models.
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">Product</div>
            <div className="mt-3 space-y-2 text-sm">
              <Link className="block text-gray-700 hover:text-gray-900" href="/creators">
                Creators
              </Link>
              <Link className="block text-gray-700 hover:text-gray-900" href="/pricing">
                Pricing
              </Link>
              <Link className="block text-gray-700 hover:text-gray-900" href="/dashboard">
                Dashboard
              </Link>
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">Company</div>
            <div className="mt-3 space-y-2 text-sm">
              <Link className="block text-gray-700 hover:text-gray-900" href="/#how-it-works">
                How it works
              </Link>
              <Link className="block text-gray-700 hover:text-gray-900" href="/#security">
                Security
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-gray-200 py-6 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} Collabkar. All rights reserved.</div>
          <div className="flex gap-4">
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
