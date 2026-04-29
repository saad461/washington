"use client";

import dynamic from 'next/dynamic';

// These components use browser APIs (useEffect, useState, useContext).
// They must be dynamically imported with ssr:false inside a Client Component boundary.
export const PrintButtonClient = dynamic(
 () => import('@/components/PrintButton'),
 { ssr: false, loading: () => <div className="w-full h-12" /> }
);

export const AdContainerClient = dynamic(
 () => import('@/components/AdContainer'),
 { ssr: false, loading: () => <div className="w-full h-16" /> }
);

export const AuthoritySidebarClient = dynamic(
 () => import('@/components/AuthoritySidebar'),
 { ssr: false, loading: () => <div className="w-full h-48 animate-pulse bg-[var(--color-bg-muted)] rounded-xl" /> }
);

export const AuthorBoxClient = dynamic(
 () => import('@/components/AuthorBox'),
 { ssr: false, loading: () => <div className="w-full h-32 animate-pulse bg-[var(--color-bg-muted)] rounded-xl" /> }
);

export const HomeCalculatorClient = dynamic(
 () => import('@/components/HomeCalculator'),
 { ssr: false, loading: () => <div className="w-full max-w-lg h-96 animate-pulse bg-[var(--color-bg-muted)] rounded-xl" /> }
);

export const BlogGridClientClient = dynamic(
 () => import('@/components/BlogGridClient'),
 { ssr: false, loading: () => <div className="w-full h-16 animate-pulse bg-[var(--color-bg-muted)] rounded-xl" /> }
);

export const ComparisonToolClient = dynamic(
 () => import('@/components/ComparisonTool'),
 { ssr: false, loading: () => <div className="w-full h-96 animate-pulse bg-[var(--color-bg-muted)] rounded-xl" /> }
);

export const WorksheetWizardClient = dynamic(
 () => import('@/components/WorksheetWizard'),
 { ssr: false, loading: () => <div className="w-full min-h-screen animate-pulse bg-[var(--color-bg-subtle)] rounded-2xl" /> }
);

export const NavbarClient = dynamic(
 () => import('@/components/Navbar'),
 { ssr: true }
);

export const FooterClient = dynamic(
 () => import('@/components/Footer'),
 { ssr: true }
);

export const CookieBannerClient = dynamic(
 () => import('@/components/CookieBanner'),
 { ssr: false }
);
