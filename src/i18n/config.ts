export const locales = ['en', 'ru'];

export const namespaces = ['first', 'second'];

export const loadNamespace = (locale: string, namespace: string) =>
  import(`./strings/${locale}/${namespace}.json`).then((m) => m.default);
