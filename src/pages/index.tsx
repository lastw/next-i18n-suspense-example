import Link from 'next/link';
import { useTranslation } from 'i18n/useTranslation';

const IndexPage = () => {
  const t = useTranslation('first');

  return (
    <main>
      <h1>{t('first-page-title')}</h1>
      <p>{t('hello-world')}</p>
      <Link href="/second">{t('second-page-link')}</Link>
      <footer>
        <Link href="/" locale="en">
          <a>EN</a>
        </Link>
        <Link href="/" locale="ru">
          <a>RU</a>
        </Link>
      </footer>
    </main>
  );
};

export default IndexPage;
