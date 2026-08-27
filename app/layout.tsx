import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:4173'),
  title: 'Счётчики СЖ-ППО — СервисПромМаш',
  description: 'Каталог счётчиков жидкости СЖ-ППО-25 и СЖ-ППО-40 для учёта нефтепродуктов.',
  icons: {
    icon: '/logo-spm-black.png',
    apple: '/logo-spm-black.png',
  },
  openGraph: {
    title: 'Счётчики ППО-25 и ППО-40',
    description: 'Поставка, сервис и поверка счётчиков для учёта нефтепродуктов.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Счётчики ППО-25 и ППО-40' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Счётчики ППО-25 и ППО-40',
    description: 'Поставка, сервис и поверка счётчиков для учёта нефтепродуктов.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
