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
    <div className="bg-white min-h-screen font-sans">
      <CalculatorSchema url="https://wcssc.site/editorial-methodology" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-3xl mx-auto">
          <header className="mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 tracking-tight font-heading leading-[1.1]">
              How We Calculate: Our Editorial Methodology
            </h1>
            <p className="text-xl leading-relaxed text-gray-600">
              At WCSSC, accuracy in child support estimation is our primary mission. Our calculator is engineered to mirror the official Washington State Child Support Schedule (WSCSS) as mandated by the state legislature.
            </p>
          </header>
          
          <div className="prose prose-gray prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-900">
            <h2 className="text-2xl md:text-3xl mb-6">Legal Framework & Data Sources</h2>
            <p>
              All calculations performed by WCSSC are based on Chapter 26.19 of the Revised Code of Washington (RCW). We specifically integrate the following standards into our algorithmic logic:
            </p>
            <ul className="space-y-4">
              <li><strong className="text-indigo-600">RCW 26.19.020:</strong> Implementation of the Monthly Basic Support Obligation Economic Table.</li>
              <li><strong className="text-indigo-600">RCW 26.19.071:</strong> Standards for determination of gross and net income, including mandatory deductions.</li>
              <li><strong className="text-indigo-600">RCW 26.19.065:</strong> Application of the 2026 Updated Self-Support Reserve, ensuring the payor’s net income does not fall below 180% of the federal poverty level.</li>
              <li><strong className="text-indigo-600">RCW 26.19.035:</strong> Standards for applying the schedule across all Washington counties.</li>
            </ul>

            <h2 className="text-2xl md:text-3xl mt-16 mb-6">2026 Update Compliance</h2>
            <p>Our system has been updated to reflect the significant January 1, 2026 legislative changes, including:</p>
            <ol className="space-y-4">
              <li><strong>Expanded Economic Table:</strong> We support combined monthly net incomes up to $50,000, extending beyond the previous $12,000 limit.</li>
              <li><strong>PFML Integration:</strong> Our logic accounts for Paid Family and Medical Leave (PFML) premiums as mandatory deductions.</li>
              <li><strong>Dynamic Poverty Level Adjustments:</strong> We utilize the most recent Federal Poverty Guidelines to calculate low-income limitations accurately.</li>
            </ol>

            <h2 className="text-2xl md:text-3xl mt-16 mb-6">Verification Process</h2>
            <p>
              Every calculation is cross-referenced against the Washington State Department of Social and Health Services Quick Child Support Estimator and the official Manual Worksheets to ensure functional parity.
            </p>

            <h2 className="text-2xl md:text-3xl mt-16 mb-6">Who We Are</h2>
            <p>
              WCSSC is an independent educational platform designed to help parents understand Washington State child support calculations.
              We are not affiliated with any government agency or court system.
              Our goal is to simplify complex legal calculations into easy-to-understand tools.
            </p>

            <h2 className="text-2xl md:text-3xl mt-16 mb-6">Our Experience</h2>
            <p>
              Our methodology is based on official legal frameworks and practical usage of Washington child support worksheets.
              The calculator is designed to reflect real-world scenarios parents face when estimating obligations.
            </p>
            <p className="mt-8 flex flex-wrap gap-4">
              <Link href="/glossary" className="text-indigo-600 font-bold hover:text-indigo-700 underline decoration-indigo-200 underline-offset-4">Glossary</Link> 
              <Link href="/#county-guides" className="text-indigo-600 font-bold hover:text-indigo-700 underline decoration-indigo-200 underline-offset-4">County Filing Guides</Link>
            </p>
            
            <div className="mt-16 p-8 bg-gray-50 border border-gray-100 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500" />
              <p className="text-gray-900 font-bold italic leading-relaxed">
                WCSSC functions as a digital calculation tool built using structured legal data and algorithmic processing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
