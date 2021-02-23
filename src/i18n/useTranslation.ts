import { useRouter } from 'next/dist/client/router';
import { read, useSSRBuffer } from './storage';

export const useTranslation = (namespace: string) => {
  const locale = useRouter().locale || 'ru';
  useSSRBuffer(locale, namespace);

  const strings = read(locale, namespace);

  return (str: string) => strings[str] || str;
};
