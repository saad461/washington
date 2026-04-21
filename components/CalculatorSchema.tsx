import React from "react";

export interface CalculatorSchemaProps {
 income?: number;
 childCount?: number;
 county?: string;
 resultAmount?: number;
 year?: number;
 url?: string;
}

export default function CalculatorSchema({
 income = 5000,
 childCount = 2,
 county = "King County",
 resultAmount = 1000,
 year = 2026,
 url = "https://wcssc.site/worksheet",
}: CalculatorSchemaProps) {
 const schema = {
 "@context": "https://schema.org",
 "@type": "SoftwareApplication",
 "name": `Washington Child Support Calculator ${year}`,
 "applicationCategory": "BusinessApplication",
 "operatingSystem": "Web",
 "description": `Free, court-compliant Washington State Child Support Calculator for ${year}. Instantly estimate your monthly obligations based on the official guidelines.`,
 "url": url,
 "offers": {
 "@type": "Offer",
 "price": "0.00",
 "priceCurrency": "USD",
 },
 "featureList": [
 "Child Support Calculation",
 `${year} Washington Schedule`,
 "County Filing Guidance",
 "PDF Export",
 ],
 "exampleOfWork": {
 "@type": "CreativeWork",
 "text": `Child support calculation for ${county} with an income of $${income} and ${childCount} children resulted in an estimated ${resultAmount}.`,
 },
 // Non-standard schema properies, but requested in prompt: Include calculated result in "output" and structured input
 // To make it valid, we put it inside an Action or simply add properties if we are adapting to Google's extended schema forms
 "potentialAction": {
 "@type": "CalculateAction",
 "object": {
 "@type": "PropertyValue",
 "name": "Input Variables",
 "value": `Income: $${income}, Children: ${childCount}, County: ${county}`
 },
 "result": {
 "@type": "PropertyValue",
 "name": "Calculated Result",
 "value": `$${resultAmount}`
 }
 }
 };

 return (
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
 />
 );
}
