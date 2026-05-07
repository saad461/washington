import { Metadata } from 'next';
import ExtraExpensesClient from './ExtraExpensesClient';

export const metadata: Metadata = {
  title: { absolute: "Extraordinary Expense Splitter — Washington Child Support | WSCSS" },
  description: "Calculate proportional splits for extraordinary expenses like daycare and health insurance according to Washington State guidelines.",
  alternates: { canonical: 'https://wscss.site/extra-expenses' },
  openGraph: {
    title: { absolute: "Extraordinary Expense Splitter — Washington Child Support | WSCSS" },
    description: "Calculate proportional splits for extraordinary expenses like daycare and health insurance.",
    url: "https://wscss.site/extra-expenses",
    siteName: "WSCSS",
    images: [{ url: '/wscss-og.webp', width: 1200, height: 630, alt: 'Extra Expenses Splitter' }],
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Extraordinary Expense Splitter — Washington Child Support | WSCSS",
    description: "Calculate proportional splits for extraordinary expenses like daycare and health insurance.",
    images: ['/wscss-og.webp'],
  },
};

export default function ExtraExpensesPage() {
  return <ExtraExpensesClient />;
}
