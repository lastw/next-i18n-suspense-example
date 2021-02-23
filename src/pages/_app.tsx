import '../global.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { Suspense } from 'react';

const fallback = <div>Loading (suspense)...</div>;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Next.js i18n with suspense</title>
      </Head>
      <Suspense fallback={fallback}>
        <Component {...pageProps} />
      </Suspense>
    </>
  );
}
