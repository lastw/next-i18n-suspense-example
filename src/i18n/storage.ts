import { createContext, useContext } from 'react';
import { loadNamespace } from './config';

let storage: any = {};

if (typeof window !== 'undefined') {
  storage = (window as any).__i18n_strings || {};
}

export const read = (locale: string, namespace: string) => {
  if (!storage[locale] || !storage[locale][namespace]) {
    if (typeof window !== 'undefined') {
      throw load(locale, namespace);
    }

    return {};
  }

  return storage[locale][namespace];
};

export const load = async (locale: string, namespace: string) => {
  const strings = await loadNamespace(locale, namespace);

  storage[locale] = storage[locale] || {};
  storage[locale][namespace] = strings;
};

export const I18nSSRBufferContext = createContext<Set<string>>(new Set());

export const useSSRBuffer = (locale: string, namespace: string) => {
  const buffer = useContext(I18nSSRBufferContext);
  buffer.add(`${locale}:${namespace}`);
};

export const dehydrate = (buffer: Set<string>) => {
  const result: any = {};

  buffer.forEach((x) => {
    const [locale, namespace] = x.split(':');

    result[locale] = result[locale] || {};
    result[locale][namespace] = storage[locale][namespace];
  });

  return JSON.stringify(result);
};
