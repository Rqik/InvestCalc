import React from 'react';
import type { AppPage } from '../types/navigation';

type AppMetaProps = {
  page: AppPage;
  theme: 'dark' | 'light';
};

type MetaContent = {
  title: string;
  description: string;
};

const META_BY_PAGE: Record<AppPage, MetaContent> = {
  calculator: {
    title: 'InvestCalc — Калькулятор накоплений и доходности',
    description:
      'Финансовый калькулятор для целей, накоплений, инфляции и сценариев. Считайте капитал, график роста и план по годам.',
  },
  retirement: {
    title: 'InvestCalc — Пенсионный план и ориентиры',
    description:
      'Мягкий пенсионный планировщик: оценка нужного капитала, комфортного дохода на пенсии и понятных шагов накопления.',
  },
};

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
}

function upsertLink(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLLinkElement>(selector);

  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
}

export function AppMeta({ page, theme }: AppMetaProps) {
  React.useEffect(() => {
    const meta = META_BY_PAGE[page];
    const pageUrl = `${window.location.origin}${window.location.pathname}${window.location.search}${window.location.hash}`;
    const themeColor = theme === 'dark' ? '#111827' : '#ffffff';
    const faviconUrl = `${import.meta.env.BASE_URL}brand-mark.svg`;

    document.title = meta.title;
    document.documentElement.lang = 'ru';

    upsertMeta('meta[name="description"]', { name: 'description', content: meta.description });
    upsertMeta('meta[name="application-name"]', { name: 'application-name', content: 'InvestCalc' });
    upsertMeta('meta[name="theme-color"]', { name: 'theme-color', content: themeColor });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: meta.title });
    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: meta.description,
    });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'ru_RU' });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: 'InvestCalc' });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: pageUrl });
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: meta.title });
    upsertMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: meta.description,
    });
    upsertLink('link[rel="canonical"]', { rel: 'canonical', href: pageUrl });
    upsertLink('link[rel="icon"]', { rel: 'icon', type: 'image/svg+xml', href: faviconUrl });

    return undefined;
  }, [page, theme]);

  return null;
}
