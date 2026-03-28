import Link from 'next/link';

import { MarketingFooter } from '../_components/MarketingFooter';
import { MarketingNav } from '../_components/MarketingNav';
import { Container, Pill, SectionTitle } from '../_components/marketing';

type SearchParams = Record<string, string | string[] | undefined>;

function getParam(searchParams: SearchParams, key: string) {
  const value = searchParams[key];
  if (!value) return '';
  return Array.isArray(value) ? value[0] || '' : value;
}

function CreatorCard({
  name,
  niche,
  followers,
  engagement,
  price,
}: {
  name: string;
  niche: string;
  followers: string;
  engagement: string;
  price: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-lg font-semibold text-gray-900">{name}</div>
          <div className="mt-1 text-sm text-gray-600">{niche}</div>
        </div>
        <Pill>{price}</Pill>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
        <div className="rounded-xl bg-gray-50 p-3">
          <div className="text-xs text-gray-500">Followers</div>
          <div className="mt-1 font-semibold text-gray-900">{followers}</div>
        </div>
        <div className="rounded-xl bg-gray-50 p-3">
          <div className="text-xs text-gray-500">Engagement</div>
          <div className="mt-1 font-semibold text-gray-900">{engagement}</div>
        </div>
        <div className="rounded-xl bg-gray-50 p-3">
          <div className="text-xs text-gray-500">Location</div>
          <div className="mt-1 font-semibold text-gray-900">Remote</div>
        </div>
      </div>
      <div className="mt-5 flex gap-2">
        <button className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50">
          View profile
        </button>
        <button className="flex-1 rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black">
          Invite
        </button>
      </div>
    </div>
  );
}

export default function CreatorsPage({ searchParams }: { searchParams: SearchParams }) {
  const q = getParam(searchParams, 'q');
  const niche = getParam(searchParams, 'niche');
  const budget = getParam(searchParams, 'budget');

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <MarketingNav />

      <main className="py-12">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
            <aside className="w-full lg:w-80">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="text-sm font-semibold">Filters</div>
                <div className="mt-4 space-y-4 text-sm">
                  <div>
                    <div className="text-xs font-medium text-gray-700">Keyword</div>
                    <input
                      name="q"
                      defaultValue={q}
                      placeholder="skincare, fitness…"
                      className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-700">Niche</div>
                    <input
                      name="niche"
                      defaultValue={niche}
                      placeholder="food, tech…"
                      className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-700">Budget (USD)</div>
                    <input
                      name="budget"
                      type="number"
                      min="0"
                      defaultValue={budget}
                      placeholder="500"
                      className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href="/creators"
                      className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2 text-center text-sm font-medium hover:bg-gray-50"
                    >
                      Reset
                    </Link>
                    <Link
                      href={`/creators?q=${encodeURIComponent(q)}&niche=${encodeURIComponent(niche)}&budget=${encodeURIComponent(budget)}`}
                      className="flex-1 rounded-xl bg-gray-900 px-4 py-2 text-center text-sm font-medium text-white hover:bg-black"
                    >
                      Apply
                    </Link>
                  </div>
                </div>
              </div>
            </aside>

            <section className="min-w-0 flex-1">
              <SectionTitle
                title="Creators"
                subtitle="Demo marketplace UI. Later this page can be backed by your matching engine + database."
              />
              <div className="mt-4 flex flex-wrap gap-2">
                {q && <Pill>q: {q}</Pill>}
                {niche && <Pill>niche: {niche}</Pill>}
                {budget && <Pill>budget: {budget}</Pill>}
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <CreatorCard name="Asha • UGC" niche="Skincare & Beauty" followers="22k" engagement="3.4%" price="$250–$400" />
                <CreatorCard name="Ravi • Reels" niche="Fitness" followers="48k" engagement="2.7%" price="$400–$700" />
                <CreatorCard name="Mina • UGC" niche="Food" followers="18k" engagement="4.1%" price="$180–$320" />
                <CreatorCard name="Dev • Creator" niche="Tech" followers="65k" engagement="1.9%" price="$500–$900" />
              </div>
            </section>
          </div>
        </Container>
      </main>

      <MarketingFooter />
    </div>
  );
}

