import { Metadata } from "next";
import ComparisonTool from "@/components/ComparisonTool";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Washington Child Support Scenario Comparison 2026 | WSCSS",
  description: "Compare different child support scenarios side-by-side. See how income changes, joint custody, and deviations affect your 2026 Washington child support estimate.",
  alternates: { canonical: "https://wscss.site/compare" },
};

export default function ComparePage() {
  return (
    <div className="flex-1 w-full bg-white">
      <section className="bg-white pt-8 pb-12 lg:pt-12 lg:pb-16 relative overflow-hidden border-b border-[var(--color-bg-border)] no-print">
        <div className="container-wide relative z-10 text-left">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors mb-6">
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <div className="flex flex-col gap-4">
            <p className="eyebrow">
              2026 Washington Guidelines
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Scenario <span className="text-blue-600">Comparison Tool</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              Uncertain how different factors will affect your child support? Use our side-by-side comparison tool to run multiple "what if" scenarios simultaneously.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-[var(--color-bg-subtle)] min-h-screen">
        <div className="container-wide">
          <ComparisonTool />
        </div>
      </section>
    </div>
  );
}
