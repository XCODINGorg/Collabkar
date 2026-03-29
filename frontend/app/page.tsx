import Link from 'next/link';

import { MarketingFooter } from './_components/MarketingFooter';
import { MarketingNav } from './_components/MarketingNav';
import {
  Container,
  FeatureCard,
  H1,
  Lead,
  Pill,
  PrimaryLinkButton,
  SectionTitle,
  SecondaryLinkButton,
  Stat,
} from './_components/marketing';

function IconSearch() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="text-blue-700">
      <path
        fill="currentColor"
        d="M10 2a8 8 0 1 0 4.9 14.3l4.4 4.4 1.4-1.4-4.4-4.4A8 8 0 0 0 10 2Zm0 2a6 6 0 1 1 0 12A6 6 0 0 1 10 4Z"
      />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="text-blue-700">
      <path
        fill="currentColor"
        d="M12 2 4 5v6c0 5.6 3.8 10.9 8 11 4.2-.1 8-5.4 8-11V5l-8-3Zm0 2.2L18 6.5V11c0 4.5-2.9 8.6-6 8.9-3.1-.3-6-4.4-6-8.9V6.5l6-2.3Z"
      />
    </svg>
  );
}

function IconSpark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="text-blue-700">
      <path fill="currentColor" d="M12 2l1.7 6.1L20 10l-6.3 1.9L12 18l-1.7-6.1L4 10l6.3-1.9L12 2Z" />
      <path fill="currentColor" d="M19 14l.9 3.1L23 18l-3.1.9L19 22l-.9-3.1L15 18l3.1-.9L19 14Z" opacity=".6" />
    </svg>
  );
}

function IconBolt() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="text-blue-700">
      <path fill="currentColor" d="M13 2 3 14h7l-1 8 12-14h-7l-1-6Z" />
    </svg>
  );
}

function IconChat() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="text-blue-700">
      <path fill="currentColor" d="M4 4h16v11H7.4L4 18.4V4Zm2 2v8.6L6.6 13H18V6H6Z" />
    </svg>
  );
}

function QuoteCard({
  quote,
  name,
  meta,
}: {
  quote: string;
  name: string;
  meta: string;
}) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">
      <p className="text-sm leading-6 text-gray-700">"{quote}"</p>
      <div className="mt-5">
        <div className="text-sm font-semibold text-gray-900">{name}</div>
        <div className="mt-1 text-xs text-gray-500">{meta}</div>
      </div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <summary className="cursor-pointer list-none text-sm font-semibold text-gray-900">
        <div className="flex items-center justify-between gap-3">
          <span>{q}</span>
          <span className="text-gray-400 transition group-open:rotate-180">⌄</span>
        </div>
      </summary>
      <div className="mt-3 text-sm leading-6 text-gray-600">{a}</div>
    </details>
  );
}

const quickStats = [
  { value: '10k+', label: 'Creator profiles ready to scale' },
  { value: '2-stage', label: 'Rules and ML ranking flow' },
  { value: 'Offline', label: 'Local AI pipeline without paid APIs' },
];

const workflow = [
  { step: '01', title: 'Set the brief', description: 'Capture niche, budget, deliverables, and campaign goals.' },
  { step: '02', title: 'Review matches', description: 'Get creator suggestions filtered by fit, signals, and pricing.' },
  { step: '03', title: 'Shortlist faster', description: 'Compare candidates in a cleaner dashboard without scattered tabs.' },
  { step: '04', title: 'Run the campaign', description: 'Track progress and keep the workflow organized from one place.' },
];

const useCases = [
  'UGC for paid ads and product demos',
  'Micro-influencer seeding for launches',
  'Local promotions for cafes, gyms, and salons',
  'Performance campaigns and app growth',
  'B2B creator campaigns for niche audiences',
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <MarketingNav />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_10%,#DBEAFE_0%,transparent_38%),radial-gradient(circle_at_82%_18%,#EDE9FE_0%,transparent_36%),linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)]" />
          <Container>
            <div className="py-14 sm:py-18 lg:py-24">
              <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                <div className="max-w-3xl">
                  <Pill>Offline AI • Minimal workflow • Built for modern creator teams</Pill>
                  <div className="mt-5 max-w-2xl">
                    <H1>Discover creators and manage campaigns without the clutter.</H1>
                    <div className="mt-5">
                      <Lead>
                        Collabkar helps brands find talent, estimate pricing, and move faster, while creators get a cleaner product experience and more consistent visibility.
                      </Lead>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <PrimaryLinkButton href="/creators">Browse creators</PrimaryLinkButton>
                    <SecondaryLinkButton href="/pricing">View pricing</SecondaryLinkButton>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3 text-xs text-gray-500">
                    <span className="rounded-full border border-gray-200 bg-white px-3 py-1">Built for micro-influencer campaigns</span>
                    <span className="rounded-full border border-gray-200 bg-white px-3 py-1">No external AI dependency</span>
                    <span className="rounded-full border border-gray-200 bg-white px-3 py-1">Clean responsive UI</span>
                  </div>
                </div>

                <div className="w-full max-w-xl">
                  <div className="rounded-[2rem] border border-gray-200 bg-white/95 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm font-semibold text-gray-900">Quick creator search</div>
                        <div className="mt-1 text-sm text-gray-600">
                          Start with a niche, budget, and campaign idea to get more focused matches.
                        </div>
                      </div>
                      <div className="rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-500">
                        MVP
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                        <div className="text-xs uppercase tracking-wide text-gray-500">Pricing</div>
                        <div className="mt-2 text-lg font-semibold text-gray-900">AI-assisted</div>
                      </div>
                      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                        <div className="text-xs uppercase tracking-wide text-gray-500">Matches</div>
                        <div className="mt-2 text-lg font-semibold text-gray-900">Rules + ML</div>
                      </div>
                      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                        <div className="text-xs uppercase tracking-wide text-gray-500">Mode</div>
                        <div className="mt-2 text-lg font-semibold text-gray-900">Offline</div>
                      </div>
                    </div>

                    <form action="/creators" method="GET" className="mt-5 grid gap-3 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label className="text-xs font-medium text-gray-700">Campaign description</label>
                        <div className="mt-1 flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3">
                          <IconSearch />
                          <input
                            name="q"
                            placeholder="e.g. skincare UGC, fitness reels, cafe launch"
                            className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-medium text-gray-700">Niche</label>
                        <input
                          name="niche"
                          placeholder="fitness, food, tech"
                          className="mt-1 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-medium text-gray-700">Budget (USD)</label>
                        <input
                          name="budget"
                          type="number"
                          min="0"
                          placeholder="500"
                          className="mt-1 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
                        />
                      </div>

                      <div className="mt-1 flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                        <div className="text-xs text-gray-500">Tip: add location and deliverables for better matches.</div>
                        <button className="w-full rounded-2xl bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-black sm:w-auto">
                          Search
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {quickStats.map((stat) => (
                  <Stat key={stat.label} value={stat.value} label={stat.label} />
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="border-y border-gray-200 bg-white py-8">
          <Container>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl text-sm font-semibold text-gray-900">
                Trusted by teams building repeatable micro-influencer and UGC workflows.
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs text-gray-500 sm:flex sm:flex-wrap sm:gap-3">
                <span className="rounded-full border border-gray-200 px-3 py-1">D2C brands</span>
                <span className="rounded-full border border-gray-200 px-3 py-1">Agencies</span>
                <span className="rounded-full border border-gray-200 px-3 py-1">Local SMBs</span>
                <span className="rounded-full border border-gray-200 px-3 py-1">Founders</span>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-16" id="how-it-works">
          <Container>
            <SectionTitle
              title="How it works"
              subtitle="A tighter workflow for discovering creators, comparing fit, and moving campaigns forward."
            />

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <FeatureCard
                title="Discover"
                description="Filter by niche, budget, location, and engagement without digging through spreadsheets."
                icon={<IconSearch />}
              />
              <FeatureCard
                title="Match"
                description="Blend rule-based filtering with local ML signals to surface more relevant creators."
                icon={<IconSpark />}
              />
              <FeatureCard
                title="Protect"
                description="Keep onboarding safer with verification, auth controls, and a more structured pipeline."
                icon={<IconShield />}
              />
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-4">
              {workflow.map((item) => (
                <div key={item.step} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">{item.step}</div>
                  <div className="mt-3 text-lg font-semibold text-gray-900">{item.title}</div>
                  <div className="mt-2 text-sm leading-6 text-gray-600">{item.description}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-gray-50 py-16">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <SectionTitle
                  title="Built for brands and creators"
                  subtitle="Two-sided product thinking with a lighter, more focused experience."
                />
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    { title: 'For brands', description: 'Search quickly, shortlist with confidence, and move campaigns forward.' },
                    { title: 'For creators', description: 'Get discovered faster with cleaner profiles and better pricing context.' },
                    { title: 'For agencies', description: 'Run repeatable sourcing workflows without scattered tools.' },
                    { title: 'For admins', description: 'Keep visibility into onboarding, safety, and platform health.' },
                  ].map((item) => (
                    <div key={item.title} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                      <div className="text-sm font-semibold text-gray-900">{item.title}</div>
                      <div className="mt-1 text-sm leading-6 text-gray-600">{item.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">
                <div className="text-sm font-semibold">Popular use cases</div>
                <div className="mt-5 space-y-3 text-sm text-gray-700">
                  {useCases.map((item) => (
                    <div key={item} className="flex gap-2">
                      <span className="mt-0.5 text-blue-700">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/10">
                      <IconChat />
                    </span>
                    Built-in workflow
                  </div>
                  <div className="mt-1 text-sm leading-6 text-gray-600">
                    Shortlist creators, compare them faster, and keep everything organized in one cleaner system.
                  </div>
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <PrimaryLinkButton href="/creators">Browse creators</PrimaryLinkButton>
                  <SecondaryLinkButton href="/pricing">Pricing</SecondaryLinkButton>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-16">
          <Container>
            <SectionTitle title="What users say" subtitle="Early product feedback for the MVP direction." />
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <QuoteCard
                quote="We built a shortlist in minutes and the pricing estimates stayed close to our budget."
                name="Brand lead"
                meta="D2C skincare • first campaign"
              />
              <QuoteCard
                quote="The matching suggestions helped us find creators we would not discover manually."
                name="Agency manager"
                meta="UGC and influencer programs"
              />
              <QuoteCard
                quote="Signing up was easy and the onboarding felt like a polished SaaS product."
                name="Creator"
                meta="Micro-influencer • lifestyle"
              />
            </div>
          </Container>
        </section>

        <section className="bg-gray-50 py-16">
          <Container>
            <SectionTitle
              title="FAQ"
              subtitle="A few practical questions users will ask before trusting the platform."
            />
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              <FaqItem
                q="Do you use paid APIs or external AI services?"
                a="No. The core setup is designed around local models and local processing, so you can iterate without paid AI APIs."
              />
              <FaqItem
                q="How does matching work?"
                a="The system can first filter by rules such as niche, budget, and engagement, then rank creators with local ML signals like fit and pricing."
              />
              <FaqItem
                q="Can I start with demo data?"
                a="Yes. You can start with realistic demo data, then connect real databases, training inputs, and automation later."
              />
              <FaqItem
                q="What security features are included?"
                a="Email verification, OAuth options, rate limiting on auth endpoints, and safer API defaults are already part of the foundation."
              />
            </div>
          </Container>
        </section>

        <section className="py-16" id="security">
          <Container>
            <div className="rounded-[2rem] border border-gray-200 bg-[radial-gradient(circle_at_10%_10%,#DBEAFE_0%,transparent_45%),radial-gradient(circle_at_85%_20%,#EDE9FE_0%,transparent_45%)] p-6 shadow-sm sm:p-10">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-xs font-medium text-gray-700">
                    <span className="text-blue-700">●</span> Ready to launch your first campaign?
                  </div>
                  <div className="mt-5 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                    Create an account and start matching in minutes.
                  </div>
                  <div className="mt-3 text-sm leading-6 text-gray-600">
                    Start free, add integrations later, and keep the product lightweight while you grow.
                  </div>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <PrimaryLinkButton href="/signup">Get started</PrimaryLinkButton>
                    <SecondaryLinkButton href="/creators">Browse creators</SecondaryLinkButton>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { title: 'Offline AI', description: 'No external AI services required.' },
                    { title: 'Secure auth', description: 'Verified accounts and safer login flow.' },
                    { title: 'Fast matching', description: 'Rules plus ML ranking for speed.' },
                    { title: 'Scalable base', description: 'Ready for datasets and retraining later.' },
                  ].map((item) => (
                    <div key={item.title} className="rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-sm backdrop-blur">
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/10">
                          <IconBolt />
                        </span>
                        {item.title}
                      </div>
                      <div className="mt-2 text-sm leading-6 text-gray-600">{item.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 text-xs text-gray-500">
                Want the older animated homepage back? It is still available at{' '}
                <Link className="underline" href="/legacy-home">
                  /legacy-home
                </Link>
                .
              </div>
            </div>
          </Container>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
