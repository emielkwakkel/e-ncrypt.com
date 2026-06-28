export const SITE_URL = 'https://e-ncrypt.com';
export const SITE_NAME = 'E-ncrypt';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/encryption-banner.jpeg`;

export type JsonLdType = 'WebApplication' | 'WebPage';

export interface SeoData {
  title: string;
  description: string;
  path: string;
  canonicalPath?: string;
  image?: string;
  jsonLdType?: JsonLdType;
}

export const ROUTE_SEO = {
  encrypt: {
    title: 'Encrypt & decrypt online — E-ncrypt',
    description:
      'Client-side AES/TripleDES/Rabbit encryption and decryption in your browser.',
    path: '/encrypt',
    jsonLdType: 'WebApplication',
  },
  hash: {
    title: 'Hash generator — E-ncrypt',
    description:
      'Generate MD5, SHA, SHA3, and RIPEMD hashes locally — nothing is sent to a server.',
    path: '/hash',
    jsonLdType: 'WebApplication',
  },
  settings: {
    title: 'Settings — E-ncrypt',
    description:
      'Configure encryption and hashing algorithms, rounds, and appearance.',
    path: '/settings',
    jsonLdType: 'WebPage',
  },
  about: {
    title: 'About — E-ncrypt',
    description:
      'Open-source client-side encryption tool by Emiel Kwakkel.',
    path: '/settings/about',
    jsonLdType: 'WebPage',
  },
} as const satisfies Record<string, SeoData>;

export const DEFAULT_SEO: SeoData = ROUTE_SEO.encrypt;
