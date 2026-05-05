import { Metadata } from 'next';
import Link from 'next/link';
import { washingtonCounties } from '@/data/washingtonCounties';
import { ArrowLeft } from 'lucide-react';
import CountyList from '@/components/courts/CountyList';
import FAQAccordion from '@/components/FAQAccordion';

export const metadata: Metadata = {
  title: {
    absolute: "Washington State Court Directory — All 39 Counties | Child Support Filing 2026 | WSCSS"
  },
 
  description: "Find courthouse addresses, phone numbers, and filing information for all 39 Washington State counties. Updated 2026 court directory for child support filings.",
  alternates: { canonical: 'https://wscss.site/washington-courts' },

  description: "Find courthouse addresses, phone numbers, and filing links for all 39 Washington State counties. Updated for 2026 child support filings under RCW 26.19.",
  alternates: { canonical: 'https://wscss.site/washington-courts' },
 
};

export default function CourtsIndex() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Washington State Superior Courts",
    "itemListElement": washingtonCounties.map((county, index) => {
      const parts = county.courtAddress.split(', ');
      const zipPart = parts[parts.length - 1];
      const city = parts[parts.length - 2];
      const street = parts.slice(0, parts.length - 2).join(', ');
      const zipMatch = zipPart.match(/(\d{5}(-\d{4})?)/);
      const zip = zipMatch ? zipMatch[1] : "";

      return {
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "GovernmentOffice",
          "name": county.court,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": street,
            "addressLocality": city,
            "addressRegion": "WA",
            "postalCode": zip,
            "addressCountry": "US"
          },
          "telephone": county.clerkPhone,
          "url": county.website
        }
      };
    })
  };

  return (
    <div className="flex-1 bg-white">
      {/* ── MINI HERO ────────────────────────────────────────────────────── */}
      <section className="bg-white pt-8 pb-16 lg:pt-12 lg:pb-24 relative overflow-hidden border-b border-[var(--color-bg-border)]">
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-bl from-blue-50 to-transparent pointer-events-none hidden lg:block"
        />

        <div className="container-wide relative z-10 text-left">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap justify-start">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-900 font-medium" aria-current="page">
                Washington Courts
              </li>
            </ol>
          </nav>

          <div className="flex flex-col gap-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2" aria-hidden="true">
              All 39 Washington Counties
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Washington State Court Directory
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              Find courthouse addresses, phone numbers, and filing links for every Washington State county — updated for 2026 child support filings. Need help with legal terminology? Visit our <Link href="/glossary" className="text-blue-600 hover:underline">Washington Child Support Glossary</Link>.
            </p>

            <div className="mt-8 prose prose-gray prose-lg max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Filing Child Support in Washington State</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Washington State has 39 counties, each with its own Superior Court that handles child support orders, modifications, and enforcement. All 39 counties follow the same Washington State Child Support Schedule (RCW 26.19) and use the official 2026 economic table for calculating support obligations.
              </p>
              <p className="text-gray-600 font-semibold mb-2">To file a child support order in Washington:</p>
              <ol className="list-decimal pl-5 text-gray-600 space-y-1 mb-4">
                <li>Complete the official WSCSS worksheet</li>
                <li>File with your county Superior Court clerk</li>
                <li>Serve the other parent with required notice</li>
                <li>Attend your scheduled hearing</li>
              </ol>
              <p className="text-gray-600 leading-relaxed">
                Filing fees vary by county. Contact your local courthouse directly for current fee schedules and filing requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── COURTS GRID ─────────────────────────────────────────────────── */}
      <section className="section-default bg-[var(--color-bg-subtle)] relative z-10 py-10 border-b border-gray-100">
        <div className="container-wide">
          <CountyList counties={washingtonCounties} />
        </div>
      </section>

      {/* ── SEO CONTENT SECTION ────────────────────────────────────────── */}
      <section className="section-default bg-white py-16 lg:py-24 border-b border-gray-100">
        <div className="container-wide">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Washington Child Support Court Filing Guide by County
            </h2>

            <div className="space-y-12">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  Which Court Handles Child Support in Washington?
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Child support cases in Washington State are handled by the Superior Court in the county where the child lives. If parents live in different counties, the case is typically filed in the county where the child primarily resides.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  What Do I Need to File Child Support in Washington?
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  To file for child support in any Washington county you will need:
                </p>
                <ul className="list-disc pl-5 text-gray-600 text-lg space-y-2">
                  <li>Completed WSCSS Worksheet (8-part AOC form)</li>
                  <li>Proof of income for both parents</li>
                  <li>Parenting plan or residential schedule</li>
                  <li>Filing fee (varies by county)</li>
                  <li>Case number if modifying an existing order</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  How Long Does Child Support Take in Washington?
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Timeline varies by county and case complexity. Administrative orders through DSHS typically take 3-6 months. Court orders through Superior Court typically take 30-90 days depending on whether both parties agree on the amount.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  Can I Modify Child Support in Washington?
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Yes. Either parent can request a modification if there has been a substantial change in circumstances — typically defined as a 15% or more change in either parent&apos;s income, or a significant change in the child&apos;s needs or residential schedule. The same WSCSS worksheet is used for modifications as for initial orders.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  Washington Child Support Enforcement
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  If a parent fails to pay court-ordered child support in Washington, the Division of Child Support (DCS) through DSHS can enforce payment through wage garnishment, license suspension, tax refund interception, and contempt of court proceedings. Contact your county court or DSHS for enforcement assistance.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  Free Child Support Resources in Washington
                </h3>
                <ul className="list-disc pl-5 text-gray-600 text-lg space-y-2">
                  <li>WSCSS Calculator: <Link href="/" className="text-blue-600 hover:underline">wscss.site</Link> (free estimate)</li>
                  <li>Official AOC Forms: <a href="https://www.courts.wa.gov/forms/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">courts.wa.gov</a></li>
                  <li>DSHS Child Support: <a href="https://www.dshs.wa.gov/dcs" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">dshs.wa.gov/dcs</a></li>
                  <li>Child Support Hotline: <a href="tel:1-800-442-5437" className="text-blue-600 hover:underline">1-800-442-5437</a></li>
                  <li>Washington Law Help: <a href="https://www.washingtonlawhelp.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">washingtonlawhelp.org</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ────────────────────────────────────────────────── */}
      <section className="section-default bg-gray-50 py-16 lg:py-24 border-b border-gray-100">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
              Frequently Asked Questions About Washington State Child Support Courts
            </h2>
            <FAQAccordion
              faqs={[
                {
                  question: "Do all Washington counties use the same child support formula?",
                  answer: "Yes. All 39 Washington counties use the same Washington State Child Support Schedule (RCW 26.19) and the 2026 economic table. The formula does not vary by county. Only filing fees and procedures differ."
                },
                {
                  question: "What is the difference between a DSHS order and a court order?",
                  answer: "DSHS administrative orders are handled by the Division of Child Support without going to court — faster but less flexible. Court orders through Superior Court allow more customization and are required for complex situations involving deviations or parenting plan disputes."
                },
                {
                  question: "Can I file for child support without a lawyer in Washington?",
                  answer: "Yes. Washington allows self-represented filing (pro se) for child support. The WSCSS worksheet and AOC forms are available free at courts.wa.gov. Many counties also have a family law facilitator who can help with paperwork at no charge."
                },
                {
                  question: "What if the other parent lives in a different state?",
                  answer: "Washington follows the Uniform Interstate Family Support Act (UIFSA). File in the county where your child lives. The court will work with the other state to establish and enforce the order."
                },
                {
                  question: "How do I find my county court's filing fee?",
                  answer: "Filing fees vary by county and case type. Contact your county Superior Court clerk directly using the phone numbers and websites listed above."
                },
                {
                  question: "What happens if I miss a child support hearing in Washington?",
                  answer: "Missing a scheduled hearing can result in a default order being entered against you. Contact the court clerk immediately if you cannot attend. Most courts allow one continuance with advance notice."
                }
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── MISSING COURTHOUSE ─────────────────────────────────────────── */}
      <section className="section-default bg-white py-10 border-b border-gray-100 last:border-0">
        <div className="container-reading">
          <div className="mt-12 text-center p-8 bg-gray-50 rounded-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">
              Data Error?
            </p>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Missing or Incorrect Court Info?
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Help us keep our directory accurate. Send us the correct courthouse details and we&apos;ll update within 48 hours.
            </p>
            <a
              href="mailto:support@wscss.site?subject=Court Directory Correction"
              className="btn btn-primary"
            >
              Submit a Correction →
            </a>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </div>
  );
}
