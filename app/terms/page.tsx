import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
 title: 'Terms of Service | WCSSC — Washington Child Support Schedule Center',
 description: 'Terms of Service for using the WCSSC child support calculator and educational resources. Read before using our 2026 Washington State calculation tools.',
 alternates: { canonical: 'https://wcssc.site/terms' },
};

export default function TermsPage() {
 return (
 <div className="min-h-screen bg-gray-50 font-sans">
 <div className="max-w-3xl mx-auto px-4 sm:px-6 section-default">

 {/* Back Link */}
 <Link href="/" className="inline-flex items-center gap-2 label-metadata hover: transition-colors mb-12 md:mb-16">
 <ArrowLeft size={14} />
 Back to Calculator
 </Link>

 {/* Header */}
 <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-12 md:mb-16">
 <div className="p-4 bg-indigo-600 rounded-2xl shadow-sm shadow-indigo-600/20">
 <FileText className="w-8 h-8 text-white" />
 </div>
 <div>
 <p className="label-metadata mb-1">Legal Agreement</p>
 <h1 >Terms of Service</h1>
 </div>
 </div>

 <p className=" mb-10 md:mb-14 text-lg">
 By accessing or using the Washington Child Support Schedule Center (WCSSC) website, you agree to be bound by the following Terms of Service. If you do not agree, please do not use our services.
 </p>

 {/* Terms Sections */}
 <div className="stack-space ">
 {[
 {
 title: "1. Acceptance of Terms",
 body: "By accessing this website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy. These terms apply to all visitors, users, and others who access or use the service."
 },
 {
 title: "2. Description of Service",
 body: "WCSSC provides an online educational calculator to estimate Washington State child support obligations based on the 2026 official schedule. Our service is provided 'as-is' for informational purposes only. We do not provide legal, financial, or professional advice."
 },
 {
 title: "3. Permitted Use",
 body: "You may use WCSSC's tools for personal, non-commercial, educational purposes only. You agree not to: (a) use the service for any unlawful purpose; (b) reproduce or redistribute our content without permission; (c) attempt to reverse-engineer or interfere with the website's technical systems."
 },
 {
 title: "4. Accuracy Disclaimer",
 body: "Our calculations are based on the 2026 Washington State Child Support Schedule and are updated to the best of our ability. However, we make no warranty as to the accuracy or completeness of any calculation. Always verify critical decisions with a licensed Washington State family law attorney."
 },
 {
 title: "5. Intellectual Property",
 body: "All content, design, code, and data on this website are the intellectual property of WCSSC unless otherwise noted. The underlying Washington State child support tables are public domain government data. The WCSSC branding, design system, and proprietary calculation logic are protected."
 },
 {
 title: "6. Third-Party Advertising",
 body: "WCSSC displays advertisements provided by Google AdSense. These ads are governed by Google's own terms of service and privacy policies. WCSSC does not control the content of these advertisements and is not responsible for any third-party products or services advertised."
 },
 {
 title: "7. Limitation of Liability",
 body: "To the fullest extent permitted by law, WCSSC and its operators are not liable for any direct, indirect, incidental, or consequential damages arising from your use of, or inability to use, this service."
 },
 {
 title: "8. Changes to Terms",
 body: "We reserve the right to update these Terms of Service at any time. Changes will be effective immediately upon posting. Continued use of the service following a change constitutes your acceptance of the new terms."
 },
 {
 title: "9. Governing Law",
 body: "These Terms are governed by the laws of the State of Washington, United States, without regard to its conflict of law provisions."
 },
 {
 title: "10. Contact",
 body: "If you have questions about these Terms, please contact us at: support@wcssc.site."
 }
 ].map((section, i) => (
 <div key={i} className="p-6 md:p-6 bg-white rounded-2xl border border-gray-100 shadow-sm group hover:border-indigo-100 hover:bg-gray-50 transition-all">
 <div className="flex items-center gap-4 mb-4">
 <CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0" />
 <h2 className="text-xl md: ">{section.title}</h2>
 </div>
 <p className=" md:leading-loose md:pl-9">{section.body}</p>
 </div>
 ))}
 </div>

 <div className="mt-16 p-6 bg-gray-900 rounded-2xl text-center ">
 <p className="label-metadata mb-6">Effective Date: January 1, 2026</p>
 <div className="grid grid-cols-2 md:flex md:justify-center gap-4 md:gap-6 label-metadata ">
 <Link href="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link>
 <Link href="/disclaimer" className="hover:text-indigo-400 transition-colors">Legal Disclaimer</Link>
 <Link href="/" className="hover:text-indigo-400 transition-colors">Calculator</Link>
 </div>
 </div>
 </div>
 </div>
 );
}
