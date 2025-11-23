// src/lib/constants.ts

// Environment helpers
export const isDev = process.env.NODE_ENV === 'development';
export const isStg = process.env.NODE_ENV === 'staging';
export const isProd = process.env.NODE_ENV === 'production';

// Environment-specific URLs
export const setSiteUrl = {
  SITE_URL: {
    DEV: 'https://dev.galitianu.com/',
    STG: 'https://staging.galitianu.com/',
    PROD: 'https://galitianu.com/',
  },
  BASE_URL: {
    STATUS: false,
    DEV: '/',
    STG: '/',
    PROD: '/',
  },
  ASSETS_URL: {
    STATUS: false,
    DEV: 'https://assets-dev.galitianu.com/',
    STG: 'https://assets-staging.galitianu.com/',
    PROD: 'https://assets.galitianu.com/',
  },
};

// Map NODE_ENV values to internal keys
export const getCurrentEnv = (): 'DEV' | 'STG' | 'PROD' => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return 'DEV';
    case 'staging':
      return 'STG';
    case 'production':
      return 'PROD';
    default:
      return 'DEV';
  }
};

// URL shortcuts
export const SITE_URL = {
  DEV: setSiteUrl.SITE_URL.DEV,
  STG: setSiteUrl.SITE_URL.STG,
  PROD: setSiteUrl.SITE_URL.PROD,
} as const;

export const BASE_URL = {
  STATUS: setSiteUrl.BASE_URL.STATUS,
  DEV: setSiteUrl.BASE_URL.DEV,
  STG: setSiteUrl.BASE_URL.STG,
  PROD: setSiteUrl.BASE_URL.PROD,
} as const;

export const ASSETS_URL = {
  STATUS: setSiteUrl.ASSETS_URL.STATUS,
  DEV: setSiteUrl.ASSETS_URL.DEV,
  STG: setSiteUrl.ASSETS_URL.STG,
  PROD: setSiteUrl.ASSETS_URL.PROD,
} as const;

// Helpers for the active environment
export const getCurrentSiteUrl = () => SITE_URL[getCurrentEnv()];
export const getCurrentBaseUrl = () => {
  // Special handling for GitHub Pages deployments
  if (process.env.PUBLIC_BASE_URL) {
    return process.env.PUBLIC_BASE_URL;
  }
  return BASE_URL.STATUS ? BASE_URL[getCurrentEnv()] : '/';
};
export const getCurrentAssetsUrl = () => (ASSETS_URL.STATUS ? ASSETS_URL[getCurrentEnv()] : '');

// Global site metadata
export const SITE_CONFIG = {
  name: 'Andrei Galitianu',
  title: 'Andrei Galitianu — Software Engineer',
  description: 'Personal portfolio of Andrei Galitianu, a Software Engineer based in Europe.',
  url: getCurrentSiteUrl(),
  author: 'Andrei Galitianu',
  locale: 'en_US',
  defaultLocale: 'en',
} as const;

// SEO defaults
export const SEO_DEFAULTS = {
  ogType: 'website',
} as const;

// Asset paths that respect the configured base URL
export const PATHS = {
  images: {
    favicon: `${getCurrentAssetsUrl()}assets/common/images/favicon.ico`,
  },
} as const;

// Shared types
export interface PageMeta {
  title?: string;
  description?: string;
  ogType?: 'website' | 'article' | 'profile';
  ogImage?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

// Site-wide default meta tags
export const DEFAULT_PAGE_META: PageMeta = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  ogType: SEO_DEFAULTS.ogType,
};

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/galitianu',
  github: 'https://github.com/galitianu',
  linkedin: 'https://linkedin.com/in/galitianu',
} as const;

export const THEME_CONFIG = {
  defaultTheme: 'dark',
  themeStorageKey: 'theme-preference',
} as const;
