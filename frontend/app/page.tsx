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
      <path
        fill="currentColor"
        d="M12 2l1.7 6.1L20 10l-6.3 1.9L12 18l-1.7-6.1L4 10l6.3-1.9L12 2Z"
      />
      <path
        fill="currentColor"
        d="M19 14l.9 3.1L23 18l-3.1.9L19 22l-.9-3.1L15 18l3.1-.9L19 14Z"
        opacity=".6"
      />
    </svg>
  );
}

function IconBolt() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="text-blue-700">
      <path
        fill="currentColor"
        d="M13 2 3 14h7l-1 8 12-14h-7l-1-6Z"
      />
    </svg>
  );
}

function IconChat() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="text-blue-700">
      <path
        fill="currentColor"
        d="M4 4h16v11H7.4L4 18.4V4Zm2 2v8.6L6.6 13H18V6H6Z"
      />
    </svg>
  );
}

function TestimonialCard({
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
      <div className="text-sm text-gray-700">“{quote}”</div>
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
      <div className="mt-3 text-sm text-gray-600">{a}</div>
    </details>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <MarketingNav />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_10%,#DBEAFE_0%,transparent_40%),radial-gradient(circle_at_80%_20%,#EDE9FE_0%,transparent_42%),radial-gradient(circle_at_50%_90%,#DCFCE7_0%,transparent_45%)]" />
          <Container>
            <div className="py-16 sm:py-20">
              <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <Pill>Offline AI • No paid APIs • Fast matching</Pill>
                  <div className="mt-5">
                    <H1>Find creators, launch campaigns, and close deals in one place</H1>
                    <div className="mt-4">
                      <Lead>
                        A startup-style creator marketplace that helps brands discover talent and helps creators get paid—powered by local, fully offline models.
                      </Lead>
                    </div>
                  </div>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <PrimaryLinkButton href="/creators">Browse creators</PrimaryLinkButton>
                    <SecondaryLinkButton href="/pricing">View pricing</SecondaryLinkButton>
                  </div>
                  <div className="mt-6 text-xs text-gray-500">
                    Built for micro-influencer + UGC campaigns. Works without external AI services.
                  </div>
                </div>

                <div className="w-full max-w-xl">
                  <div className="rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur">
                    <div className="text-sm font-semibold">Search creators</div>
                    <div className="mt-1 text-sm text-gray-600">
                      Start with niche + budget and we’ll suggest the best matches.
                    </div>
                    <form action="/creators" method="GET" className="mt-5 grid gap-3 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label className="text-xs font-medium text-gray-700">Campaign description</label>
                        <div className="mt-1 flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2">
                          <IconSearch />
                          <input
                            name="q"
                            placeholder="e.g. skincare UGC, fitness reels, café launch…"
                            className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-700">Niche</label>
                        <input
                          name="niche"
                          placeholder="fitness, food, tech…"
                          className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-700">Budget (USD)</label>
                        <input
                          name="budget"
                          type="number"
                          min="0"
                          placeholder="500"
                          className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="sm:col-span-2 mt-1 flex items-center justify-between gap-3">
                        <div className="text-xs text-gray-500">
                          Tip: add location + deliverables for better matches.
                        </div>
                        <button className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black">
                          Search
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                <Stat value="10k+" label="Creator profiles (target scale)" />
                <Stat value="2-stage" label="Rules + ML ranking engine" />
                <Stat value="Offline" label="TF‑IDF + KMeans + RandomForest" />
              </div>

              <div className="mt-10 rounded-3xl border border-gray-200 bg-white/70 p-6 shadow-sm backdrop-blur">
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">Built like a startup</div>
                <div className="mt-3 grid gap-4 md:grid-cols-3">
                  {[
                    { k: 'Fast onboarding', v: 'Email verification + optional OAuth sign-in.' },
                    { k: 'Transparent pricing', v: 'Estimate creator rates from engagement + followers.' },
                    { k: 'Scales over time', v: 'Queue-based scraping + dataset builder + retraining.' },
                  ].map((item) => (
                    <div key={item.k} className="rounded-2xl border border-gray-200 bg-white p-5">
                      <div className="text-sm font-semibold text-gray-900">{item.k}</div>
                      <div className="mt-1 text-sm text-gray-600">{item.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-10 border-y border-gray-200 bg-white">
          <Container>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm font-semibold text-gray-900">Trusted by teams running micro-influencer + UGC campaigns</div>
              <div className="grid grid-cols-2 gap-3 text-xs text-gray-500 sm:flex sm:flex-wrap sm:gap-6">
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
              subtitle="Search creators, shortlist the best fits, and manage campaigns with transparent pricing."
            />
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <FeatureCard
                title="Discover"
                description="Browse creators by niche, location, engagement, and estimated price. Start small with micro-influencers."
                icon={<IconSearch />}
              />
              <FeatureCard
                title="Match"
                description="Hybrid matching: rules-first filtering + offline ML ranking using engagement, price-fit, and content similarity."
                icon={<IconSpark />}
              />
              <FeatureCard
                title="Protect"
                description="Email verification + rate limits + secure headers. Optional OAuth login for smoother onboarding."
                icon={<IconShield />}
              />
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-4">
              {[
                { n: '01', t: 'Post a brief', d: 'Describe niche, deliverables, and budget.' },
                { n: '02', t: 'Get matches', d: 'Rule-based filter + ML ranking returns best fits.' },
                { n: '03', t: 'Shortlist & invite', d: 'Compare prices and message creators.' },
                { n: '04', t: 'Track delivery', d: 'Review content, approve, and close the deal.' },
              ].map((s) => (
                <div key={s.n} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">{s.n}</div>
                  <div className="mt-3 text-lg font-semibold text-gray-900">{s.t}</div>
                  <div className="mt-2 text-sm text-gray-600">{s.d}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-16 bg-gray-50">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <SectionTitle
                  title="Built for brands and creators"
                  subtitle="Two-sided UX that feels like a modern SaaS—simple, fast, and transparent."
                />
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    { t: 'For brands', d: 'Find creators by niche, budget, location, and engagement.' },
                    { t: 'For creators', d: 'Get discovered, estimate fair pricing, and grow your pipeline.' },
                    { t: 'For agencies', d: 'Batch workflows and repeatable campaigns with shortlists.' },
                    { t: 'For admins', d: 'Safer onboarding + guardrails for abuse prevention.' },
                  ].map((x) => (
                    <div key={x.t} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                      <div className="text-sm font-semibold text-gray-900">{x.t}</div>
                      <div className="mt-1 text-sm text-gray-600">{x.d}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">
                <div className="text-sm font-semibold">Popular use-cases</div>
                <div className="mt-5 space-y-3 text-sm text-gray-700">
                  {[
                    'UGC for paid ads (hooks, testimonials, product demos)',
                    'Micro-influencer seeding for product launches',
                    'Local store promotions (cafés, gyms, salons)',
                    'App installs and performance campaigns',
                    'B2B creator marketing for niche audiences',
                  ].map((item) => (
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
                  <div className="mt-1 text-sm text-gray-600">
                    Shortlist creators, message them, and keep everything organized—like a real startup product.
                  </div>
                </div>
                <div className="mt-7 flex gap-3">
                  <PrimaryLinkButton href="/creators">Browse creators</PrimaryLinkButton>
                  <SecondaryLinkButton href="/pricing">Pricing</SecondaryLinkButton>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-16">
          <Container>
            <SectionTitle
              title="What users say"
              subtitle="Demo testimonials—replace with real quotes as you onboard creators and brands."
            />
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <TestimonialCard
                quote="We built a shortlist in minutes and the pricing estimates were close to our budget."
                name="Brand lead"
                meta="D2C skincare • first campaign"
              />
              <TestimonialCard
                quote="The matching suggestions helped us find creators we’d never discover manually."
                name="Agency manager"
                meta="UGC & influencer programs"
              />
              <TestimonialCard
                quote="Signing up was easy and the onboarding felt like a polished SaaS product."
                name="Creator"
                meta="Micro-influencer • lifestyle"
              />
            </div>
          </Container>
        </section>

        <section className="py-16 bg-gray-50">
          <Container>
            <SectionTitle
              title="FAQ"
              subtitle="Clear answers help conversion—these can evolve as your product matures."
            />
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              <FaqItem
                q="Do you use paid APIs or external AI services?"
                a="No. The architecture is designed for offline models and local processing. You can train models with your own datasets and serve predictions from FastAPI."
              />
              <FaqItem
                q="How does matching work?"
                a="Stage 1 filters by rules (niche, budget, engagement). Stage 2 ranks creators using offline ML signals like content similarity, engagement, and price-fit."
              />
              <FaqItem
                q="Can I start with demo data?"
                a="Yes. The UI is ready for real data later. You can start with placeholders and gradually connect the database, scraper, and model training pipeline."
              />
              <FaqItem
                q="What security features are included?"
                a="Email verification, OAuth login options, rate limits on auth endpoints, and secure API headers. OAuth uses a one-time code exchange to avoid token leakage in URLs."
              />
            </div>
          </Container>
        </section>

        <section className="py-16 bg-gray-50" id="security">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <SectionTitle
                  title="Security & trust built-in"
                  subtitle="Designed like a modern SaaS: verified accounts, safer OAuth flows, and API hardening."
                />
                <ul className="mt-6 space-y-3 text-sm text-gray-700">
                  <li>• Email verification before password login</li>
                  <li>• OAuth login (Google/Facebook/Apple) with one-time code exchange</li>
                  <li>• Security headers + strict API CSP + rate limiting</li>
                  <li>• Offline ML models (no external AI services)</li>
                </ul>
                <div className="mt-8 flex gap-3">
                  <PrimaryLinkButton href="/signup">Create an account</PrimaryLinkButton>
                  <SecondaryLinkButton href="/login">Log in</SecondaryLinkButton>
                </div>
              </div>
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="text-sm font-semibold">What you get</div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    { k: 'Creator analytics', v: 'Engagement, pricing, risk' },
                    { k: 'Niche detection', v: 'TF‑IDF + KMeans clustering' },
                    { k: 'Price prediction', v: 'RandomForest baseline model' },
                    { k: 'Fake detection', v: 'IsolationForest anomaly score' },
                  ].map((item) => (
                    <div key={item.k} className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                      <div className="text-sm font-semibold text-gray-900">{item.k}</div>
                      <div className="mt-1 text-xs text-gray-600">{item.v}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-xs text-gray-500">
                  Want the legacy animated homepage back? It’s available at <Link className="underline" href="/legacy-home">/legacy-home</Link>.
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-16">
          <Container>
            <div className="rounded-[2rem] border border-gray-200 bg-[radial-gradient(circle_at_10%_10%,#DBEAFE_0%,transparent_45%),radial-gradient(circle_at_85%_20%,#EDE9FE_0%,transparent_45%)] p-10 shadow-sm">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-xs font-medium text-gray-700">
                    <span className="text-blue-700">●</span> Ready to launch your first campaign?
                  </div>
                  <div className="mt-5 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                    Create an account and start matching in minutes
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    Start free. Add OAuth later. Connect real data when you’re ready.
                  </div>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <PrimaryLinkButton href="/signup">Get started</PrimaryLinkButton>
                    <SecondaryLinkButton href="/creators">Browse creators</SecondaryLinkButton>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { t: 'Offline AI', d: 'No external AI services.' },
                    { t: 'Secure auth', d: 'Verify email before login.' },
                    { t: 'Fast matching', d: 'Rules + ML ranking.' },
                    { t: 'Scalable', d: 'Queue + datasets + retraining.' },
                  ].map((x) => (
                    <div key={x.t} className="rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-sm backdrop-blur">
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/10">
                          <IconBolt />
                        </span>
                        {x.t}
                      </div>
                      <div className="mt-2 text-sm text-gray-600">{x.d}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
