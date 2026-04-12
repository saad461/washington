import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import CalculatorSchema from "@/components/CalculatorSchema";

export const metadata: Metadata = {
  title: "Editorial Methodology — WCSSC",
  description: "Learn about the independent editorial methodology behind the Washington Child Support Calculator.",
  alternates: { canonical: 'https://wcssc.site/editorial-methodology' },
};

export default function EditorialMethodology() {
  return (
    <div className="max-w-4xl w-full mx-auto px-4 py-16 sm:px-6 lg:px-8 bg-white text-slate-800">
      <CalculatorSchema url="https://wcssc.site/editorial-methodology" />
      <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight">
        How We Calculate: Our Editorial Methodology
      </h1>
      <p className="text-lg leading-relaxed mb-8">
        At WCSSC, accuracy in child support estimation is our primary mission. Our calculator is engineered to mirror the official Washington State Child Support Schedule (WSCSS) as mandated by the state legislature.
      </p>
      
      <div className="prose prose-slate prose-lg max-w-none">
        <h2>Legal Framework &amp; Data Sources</h2>
        <p>
          All calculations performed by WCSSC are based on Chapter 26.19 of the Revised Code of Washington (RCW). We specifically integrate the following standards into our algorithmic logic:
        </p>
        <ul>
          <li><strong>RCW 26.19.020:</strong> Implementation of the Monthly Basic Support Obligation Economic Table.</li>
          <li><strong>RCW 26.19.071:</strong> Standards for determination of gross and net income, including mandatory deductions.</li>
          <li><strong>RCW 26.19.065:</strong> Application of the 2026 Updated Self-Support Reserve, ensuring the payor’s net income does not fall below 180% of the federal poverty level.</li>
          <li><strong>RCW 26.19.035:</strong> Standards for applying the schedule across all Washington counties.</li>
        </ul>

        <h2>2026 Update Compliance</h2>
        <p>Our system has been updated to reflect the significant January 1, 2026 legislative changes, including:</p>
        <ol>
          <li><strong>Expanded Economic Table:</strong> We support combined monthly net incomes up to $50,000, extending beyond the previous $12,000 limit.</li>
          <li><strong>PFML Integration:</strong> Our logic accounts for Paid Family and Medical Leave (PFML) premiums as mandatory deductions.</li>
          <li><strong>Dynamic Poverty Level Adjustments:</strong> We utilize the most recent Federal Poverty Guidelines to calculate low-income limitations accurately.</li>
        </ol>

        <h2>Verification Process</h2>
        <p>
          Every calculation is cross-referenced against the Washington State Department of Social and Health Services Quick Child Support Estimator and the official Manual Worksheets to ensure functional parity.
        </p>

        <h2>Who We Are</h2>
        <p>
          WCSSC is an independent educational platform designed to help parents understand Washington State child support calculations.
          We are not affiliated with any government agency or court system.
          Our goal is to simplify complex legal calculations into easy-to-understand tools.
        </p>

        <h2>Our Experience</h2>
        <p>
          Our methodology is based on official legal frameworks and practical usage of Washington child support worksheets.
          The calculator is designed to reflect real-world scenarios parents face when estimating obligations.
        </p>
        <p>
          Learn more in our <Link href="/glossary" className="text-indigo-600 font-semibold hover:underline">Glossary</Link> and <Link href="/#county-guides" className="text-indigo-600 font-semibold hover:underline">County Filing Guides</Link>.
        </p>
        <p className="font-bold border-l-4 border-indigo-500 pl-4 py-1 italic bg-indigo-50/50">
          WCSSC functions as a digital calculation tool built using structured legal data and algorithmic processing.
        </p>
      </div>
    </div>
  );
}
