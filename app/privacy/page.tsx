import React from 'react';
import AdSensePrivacy from '@/components/AdSensePrivacy';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Washington Child Support Schedule Center',
  description: 'Privacy Policy and AdSense disclosure for WCSSC. We prioritize the security of your legal calculation data.',
  alternates: { canonical: 'https://wcssc.site/privacy' },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <AdSensePrivacy />
    </main>
  );
}
