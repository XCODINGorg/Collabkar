import { MarketingFooter } from '../_components/MarketingFooter';
import { MarketingNav } from '../_components/MarketingNav';
import { Container, Pill, PrimaryLinkButton, SectionTitle, SecondaryLinkButton } from '../_components/marketing';

function Plan({
  name,
  price,
  note,
  features,
  popular,
}: {
  name: string;
  price: string;
  note: string;
  features: string[];
  popular?: boolean;
}) {
  return (
    <div className={`rounded-3xl border ${popular ? 'border-blue-200 bg-blue-50/40' : 'border-gray-200 bg-white'} p-7 shadow-sm`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-lg font-semibold text-gray-900">{name}</div>
          <div className="mt-1 text-sm text-gray-600">{note}</div>
        </div>
        {popular && <Pill>Most popular</Pill>}
      </div>
      <div className="mt-6 text-4xl font-semibold tracking-tight text-gray-900">{price}</div>
      <div className="mt-5 space-y-2 text-sm text-gray-700">
        {features.map((f) => (
          <div key={f} className="flex gap-2">
            <span className="mt-0.5 text-blue-700">✓</span>
            <span>{f}</span>
          </div>
        ))}
      </div>
      <div className="mt-7">
        <PrimaryLinkButton href="/signup">Get started</PrimaryLinkButton>
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <MarketingNav />

      <main className="py-16">
        <Container>
          <SectionTitle
            title="Simple pricing"
            subtitle="Start free and scale when you’re ready. (Demo pricing UI — wire billing later.)"
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <Plan
              name="Starter"
              price="$0"
              note="For trying it out"
              features={['Browse creators (demo)', 'Basic matching (heuristics)', 'Email verification']}
            />
            <Plan
              name="Growth"
              price="$49/mo"
              note="For small teams"
              popular
              features={['Advanced matching endpoints', 'Saved shortlists', 'Campaign workflow (demo)', 'OAuth login']}
            />
            <Plan
              name="Scale"
              price="Custom"
              note="For high volume"
              features={['Queue-based scraping', 'Postgres datasets', 'Model retraining pipeline', 'Admin controls']}
            />
          </div>

          <div className="mt-12 rounded-3xl border border-gray-200 bg-gray-50 p-8">
            <div className="text-lg font-semibold">Need help choosing?</div>
            <div className="mt-2 text-sm text-gray-600">
              Start with Starter. Upgrade when you’re ready to run real campaigns and connect the data pipeline.
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <PrimaryLinkButton href="/signup">Create account</PrimaryLinkButton>
              <SecondaryLinkButton href="/creators">Browse creators</SecondaryLinkButton>
            </div>
          </div>
        </Container>
      </main>

      <MarketingFooter />
    </div>
  );
}

